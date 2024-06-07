// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// Import the OFFLoader class
import { OFFLoader } from './OFFLoader.js';
// Import the ApiClient class
import { ApiClient } from './ApiClient.js';

// Create an instance of the ApiClient with the base URL
const apiClient = new ApiClient('https://35.198.233.36:8090/api/smartrpd');
(async () => {
const data = {
  machine_id: '3a0df9c37b50873c63cebecd7bed73152a5ef616',
  uuid: 'm+Cakg1hzVqCwVeJfNGRpSyvRXv4',
  caseIntID: '797'
};
let off;
let responseData;
  try {
    // Call the post method and wait for the response
    responseData = await apiClient.post('/stl/get', [data]);
    console.log('Success:', responseData);
  } catch (error) {
    console.error('Error:', error);
  }

console.log(responseData);
off = atob(responseData[0].data);



















// Create a Three.JS Scene
const scene = new THREE.Scene();
// Create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Keep track of the mouse position, so we can make the eye move
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

// Keep the 3D object on a global variable so we can access it later
let object;

// OrbitControls allow the camera to move around the scene
let controls;

// Set which object to render
let objToRender = 'dino';

// Create a material
const material = new THREE.MeshPhongMaterial({ color: 0x555555, specular: 0x111111, shininess: 200 });

// Instantiate the OFFLoader
const loader = new OFFLoader(material);

// Load the OFF file
loader.load(`models/${objToRender}/scene.off`, function (obj) {
  object = obj;
  scene.add(object);
  console.log(object);
});

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
camera.position.z = objToRender === "dino" ? 25 : 500;

// Add lights to the scene, so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
topLight.position.set(500, 500, 500); // top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "dino" ? 5 : 1);
scene.add(ambientLight);

// Additional lights for better illumination
const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(hemisphereLight);

const leftLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
leftLight.position.set(-500, -500, 500); // top-left-ish
leftLight.castShadow = true;
scene.add(leftLight);

// This adds controls to the camera, so we can rotate / zoom it with the mouse
if (objToRender === "dino") {
  controls = new OrbitControls(camera, renderer.domElement);
}

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  // Here we could add some code to update the scene, adding some automatic movement

  // Make the eye move
  if (object && objToRender === "eye") {
    // I've played with the constants here until it looked good 
    object.rotation.y = -3 + mouseX / window.innerWidth * 3;
    object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
  }
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

// Start the 3D rendering
animate();
})();