import * as THREE from "three";

//Cursor

const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height) - 0.5;
});

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xffdd00 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 1140,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height);
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
//   -1.333 * aspectRatio,
//   1.333 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100,
// );

// camera.position.x = 2;
// camera.position.z = 0.01;
camera.position.z = 2;
camera.lookAt(mesh.position);
scene.add(camera);

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
  camera.position.x = cursor.x * 3;
  //camera.position.y = cursor.y;
  camera.lookAt(mesh.position);

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
