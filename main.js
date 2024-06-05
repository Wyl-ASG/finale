// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .obj file
import { OBJLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/OBJLoader.js";
import { STLLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/STLLoader.js";

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

// Instantiate a loader for the .obj file
const loader = new OBJLoader();
const stlloader = new STLLoader();
// Create a material
const material = new THREE.MeshPhongMaterial({ color: 0x555555, specular: 0x111111, shininess: 200 });

// Load the file
loader.load(
  `models/${objToRender}/scene.obj`, // Use backticks for template literal
  function (obj) {
    // Apply material to each mesh in the loaded object
    obj.traverse(function (child) {
      if (child.isMesh) {
        child.material = material;
      }
    });

    // If the file is loaded, add it to the scene
    object = obj;
    scene.add(object);
  },
  function (xhr) {
    // While it is loading, log the progress
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    // If there is an error, log it
    console.error(error);
  }
);
loader.load(
  `models/${objToRender}/scene.obj`, // Use backticks for template literal
  function (obj) {
    // Apply material to each mesh in the loaded object
    obj.traverse(function (child) {
      if (child.isMesh) {
        child.material = material;
      }
    });

    // If the file is loaded, add it to the scene
    object = obj;
    scene.add(object);
  },
  function (xhr) {
    // While it is loading, log the progress
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    // If there is an error, log it
    console.error(error);
  }
);
stlloader.load(
  `models/${objToRender}/scene.stl`, // Use backticks for template literal
  function (geometry) {
    // If the file is loaded, create a mesh and add it to the scene
    const material = new THREE.MeshPhongMaterial({ color: 0x555555, specular: 0x111111, shininess: 200 });
    object = new THREE.Mesh(geometry, material);
    scene.add(object);
  },
  function (xhr) {
    // While it is loading, log the progress
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    // If there is an error, log it
    console.error(error);
  }
);

stlloader.load(
  `models/${objToRender}/scene.stl`, // Use backticks for template literal
  function (geometry) {
    // If the file is loaded, create a mesh and add it to the scene
    const material = new THREE.MeshPhongMaterial({ color: 0x555555, specular: 0x111111, shininess: 200 });
    object = new THREE.Mesh(geometry, material);
    scene.add(object);
  },
  function (xhr) {
    // While it is loading, log the progress
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    // If there is an error, log it
    console.error(error);
  }
);


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
/*
const pointLight1 = new THREE.PointLight(0xffffff, 1, 100);
pointLight1.position.set(50, 50, 50);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xffffff, 1, 100);
pointLight2.position.set(-50, -50, -50);
scene.add(pointLight2);
*/

const leftLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
topLight.position.set(-500,-500,500); // top-left-ish
topLight.castShadow = true;
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
