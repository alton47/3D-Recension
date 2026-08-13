import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

//Cursor

const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Sizes
const sizes = {
  width: 1140,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height);
camera.position.z = 2;
scene.add(camera);

//Orbit control
const controls = new OrbitControls(camera, canvas);
controls.enablePan = true;
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animation
let time = 0;
const tick = () => {
  time += 0.01;
  //mesh.rotation.z = Math.sin(time) * 2;

  //Update the camera
  //   camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  //   camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  //   camera.position.y = cursor.y * 5;
  //   camera.lookAt(mesh.position);

  controls.update();

  renderer.render(scene, camera); /*  */
  window.requestAnimationFrame(tick);
};

tick();
