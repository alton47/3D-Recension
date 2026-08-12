import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object Group (Holds all your cubes)
const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 }),
);
cube1.position.x = -2;
group.add(cube1);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
);
group.add(cube2);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff }),
);
cube3.position.x = 2;
group.add(cube3);

// Axes helper
const axesHelper = new THREE.AxesHelper(2); // Added size to make it visible
scene.add(axesHelper);

// Scale the entire group (Fixed: replaced 'mesh' with 'group')
group.scale.x = 1.5; // Changed 3 to 1.5 so it doesn't stretch off-screen

// Rotation (Fixed: replaced 'mesh' with 'group')
group.rotation.y = 0.5; // Rotated on Y axis so you can see the 3D depth

/**
 * Sizes
 */
const sizes = {
  width: 1140,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.z = 5; // Fixed: Pulled back from 3 to 5 so all cubes fit in view
scene.add(camera);

// Look at the center of the scene (Fixed: point to 0,0,0)
camera.lookAt(new THREE.Vector3(0, 0, 0));

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
