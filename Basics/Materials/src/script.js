import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import * as dat from "lil-gui";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Texture Loader
const textureLoader = new THREE.TextureLoader();

// With loadingManager
const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => {
  console.log("Loading started");
};

loadingManager.onLoad = () => {
  console.log("Loading complete");
};

loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
  console.log(
    `Loading file: ${url}. Loaded ${itemsLoaded} of ${itemsTotal} files.`,
  );
};

loadingManager.onError = (url) => {
  console.error(`There was an error loading ${url}`);
};

const metal = textureLoader.load("/textures/matcaps/3.png");
const cartoon = textureLoader.load("/textures/matcaps/6.png");
const saturn = textureLoader.load("/textures/matcaps/5.png");
const green = textureLoader.load("/textures/matcaps/7.png");
const door = textureLoader.load("/textures/door/color.jpg");

// To get real sRGB
door.colorSpace = THREE.SRGBColorSpace;
green.colorSpace = THREE.SRGBColorSpace;
saturn.colorSpace = THREE.SRGBColorSpace;
door.encoding = THREE.sRGBEncoding;

// Objects

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;

const gui = new dat.GUI();
gui.add(material, "metalness").min(0).max(1).step(0.01);
gui.add(material, "roughness").min(0).max(1).step(0.01);

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
//const sphereMaterial = new THREE.MeshBasicMaterial({ map: door });
const sphereMesh = new THREE.Mesh(sphereGeometry, material);
scene.add(sphereMesh);
sphereMesh.position.x = -2;

const sphere = new THREE.SphereGeometry(1, 32, 32);
//const sphereMaterial = new THREE.MeshBasicMaterial({ map: door });
const sphereMe = new THREE.Mesh(sphere, material);
scene.add(sphereMe);
sphereMe.position.x = 0.2;

const torusGeometry = new THREE.TorusGeometry(0.5, 0.2, 32, 64);
//const torusMaterial = new THREE.MeshBasicMaterial({ map: saturn });
const torusMesh = new THREE.Mesh(torusGeometry, material);
scene.add(torusMesh);
torusMesh.position.x = 2;

const colorTexture = textureLoader.load("/textures/leza.png");
colorTexture.magFilter = THREE.NearestFilter;
colorTexture.generateMipmaps = false;

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Enviroment map
const rgbeLoader = new RGBELoader();
rgbeLoader.load("/textures/environmentMap/2k.hdr", (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  scene.environment = texture;
});

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  sphereMesh.rotation.y = elapsedTime * 1;
  sphereMe.rotation.y = elapsedTime * 1;
  torusMesh.rotation.y = elapsedTime * 1;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
