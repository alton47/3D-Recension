import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 1140,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 2;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();

// Animate
const tick = () => {
  //CLock
  const elapseedTime = clock.getElapsedTime();

  //Animation
  //mesh.rotation.y = elapseedTime * Math.PI * 2; // +1 Rotation per Second
  //mesh.rotation.y = Math.sin(elapseedTime); // Sinus Animation
  mesh.position.y = Math.sin(elapseedTime); // Sinus starts at 0 then up then Zero
  mesh.position.x = Math.cos(elapseedTime); // Cosine starts at 1

  //Renderer
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
