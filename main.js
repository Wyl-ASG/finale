// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// Import the OFFLoader class
import { OFFLoader } from './OFFLoader.js';
// Import the ApiClient class
import { ApiClient } from './ApiClient.js';

import { addVisibilityAndTransparencyControls } from './control.js';
import { addResetButton } from './resetButton.js'; // Assuming the resetButton.js file is in the same directory

// Your existing code here...

// Call the addResetButton function after your main code



window.finished = false;

// Get the current URL
const url = new URL(window.location.href);

// Get the value of a specific query parameter, e.g., "param"
const paramValue = url.searchParams.get('id');

// Create a Three.JS Scene
const scene = new THREE.Scene();
// Create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Keep track of the mouse position, so we can make the eye move
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

// Keep the 3D object on a global variable so we can access it later


// OrbitControls allow the camera to move around the scene
let controls;

// Set which object to render
let objToRender = 'dino';

// Create a material
const material = new THREE.MeshPhongMaterial({ color: 0x555555, specular: 0x111111, shininess: 0 });
const materialsurface = new THREE.MeshStandardMaterial({
  color: 0xaaaaaa, // Base color of the material
  metalness: 0.8,  // Higher value for more metallic appearance
  roughness: 0.2,  // Lower value for a shinier surface
});

// Create an instance of the ApiClient with the base URL
const apiClient = new ApiClient('https://35.198.233.36:8090/api/smartrpd');
const parentObject = new THREE.Object3D();
scene.add(parentObject);
(async () => {
const data = {
  machine_id: '3a0df9c37b50873c63cebecd7bed73152a5ef616',
  uuid: 'm+Cakg1hzVqCwVeJfNGRpSyvRXv4',
  caseIntID: paramValue
};
let positionDatas = [];
let positionData;
const loginData = {
  id: 0,
  username:"faid",
  email: "",
  password:"faid30413041D**",
  salt:"",
  create_time:0,
  is_admin:0,
  uuid:"",
  deleted:0

  
}
const urldatas = ['/user/login','/case/get/'+paramValue];
try {
  // Call the post method and wait for the response
  for(const urldata of urldatas)
    {
  
  positionData = await apiClient.post(urldata, [data,loginData]);
  console.log('Success:', positionData);
  positionDatas = positionDatas.concat(positionData);
    }
} catch (error) {
  console.error('Error:', error);
}

const time = unixToHumanReadable(positionData.creation_date);
createTextbox("Creation Date: "+ time,'bottom-left');
createTextbox("Case ID: "+positionData.case_id,'bottom-right');
let off;
const urls = ['/stl/get','/surface/getall'];
let responseDatas = [];
let responseData;
  try {
    // Call the post method and wait for the response
    for(const url of urls)
      {
    
    responseData = await apiClient.post(url, [data]);
    console.log('Success:', responseData);
    responseDatas = responseDatas.concat(responseData);
      }
  } catch (error) {
    console.error('Error:', error);
  }
let pos;
if(positionData!= null)
  {
    pos= {'lower':[positionData.lower_insertion_angle_x,positionData.lower_insertion_angle_y,positionData.lower_insertion_angle_z],
          'upper':[positionData.upper_insertion_angle_x,positionData.upper_insertion_angle_y,positionData.upper_insertion_angle_z]};
  }


let name = [];
for (const offFile of responseDatas) {
  let loader;
  name.push(offFile.filename);
  if(offFile.filename.includes('surface'))
    {
      loader = new OFFLoader(materialsurface.clone());
    }
    else{
      loader = new OFFLoader(material.clone());
    }
    
    // Fetch the OFF file data
    //const offData = await apiClient.get(offFile); // Assuming the ApiClient has a get method for fetching data
    const offdata = atob(offFile.data);
    // Load the OFF file
    const mesh = loader.parse(offdata);
    //addVisibilityControl(mesh, 'BoxMesh');
    //addTransparencyControl(material, 'BoxMesh');

    if(offFile.filename.includes('surface'))
      {
        if(offFile.filename.includes('upper'))
          {
            changeMeshRotation(mesh,pos['upper'][0],pos['upper'][1],pos['upper'][2]);
          }
          else{
            changeMeshRotation(mesh,pos['lower'][0],pos['lower'][1],pos['lower'][2]);
          }
      }
    // Add the mesh to the parent object
    console.log(pos);
    parentObject.add(mesh);

}
function changeMeshRotation(mesh, x, y, z) {
  mesh.rotation.set(THREE.MathUtils.degToRad(x), THREE.MathUtils.degToRad(y), THREE.MathUtils.degToRad(z));
}



function createTextbox(text, position) {
  const textbox = document.createElement('div');
  textbox.textContent = text;
  textbox.style.position = 'fixed';
  textbox.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
  textbox.style.padding = '10px';
  textbox.style.border = '1px solid #ccc';
  textbox.style.borderRadius = '5px';
  textbox.style.fontFamily = 'Arial, sans-serif';
  textbox.style.fontSize = '14px';
  textbox.style.color = '#333';
  textbox.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';

  if (position === 'bottom-left') {
      textbox.style.bottom = '10px';
      textbox.style.left = '10px';
  } else if (position === 'bottom-right') {
      textbox.style.bottom = '10px';
      textbox.style.right = '10px';
  }
  document.body.appendChild(textbox);
}
function unixToHumanReadable(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}














// Instantiate the OFFLoader


// Load the OFF file

finished = true;
// Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

// Add the renderer to the DOM
const container = document.getElementById("container3D");
if (container) {
  container.appendChild(renderer.domElement);
} else {
  console.error('No container element found');
}

// Set how far the camera will be from the 3D model
camera.position.z = objToRender === "dino" ? 100 : 500;

// Add lights to the scene, so we can actually see the 3D model
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Soft white light
  scene.add(ambientLight);

  // Add directional lights from different directions for even lighting
  const lights = [
    new THREE.DirectionalLight(0xffffff, 1), // Front light
    new THREE.DirectionalLight(0xffffff, 1), // Back light
    new THREE.DirectionalLight(0xffffff, 1), // Left light
    new THREE.DirectionalLight(0xffffff, 1), // Right light
  ];

  lights[0].position.set(0, 0, 1);
  lights[1].position.set(0, 0, -1);
  lights[2].position.set(-1, 0, 0);
  lights[3].position.set(1, 0, 0);

  lights.forEach(light => {
    scene.add(light);
  });


// This adds controls to the camera, so we can rotate / zoom it with the mouse
if(objToRender === 'dino'){
controls = new OrbitControls(camera, renderer.domElement);
}

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  // Here we could add some code to update the scene, adding some automatic movement

  // Make the eye move

  renderer.render(scene, camera);
}

// Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Add mouse position listener, so we can make the eye move
document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
};

const initial = camera.position.clone();
console.log(initial);
addResetButton(camera, controls,initial);

// Start the 3D rendering
animate();
addVisibilityAndTransparencyControls(parentObject,name);
})();