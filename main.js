import './style.css'
import * as THREE from 'three';

// Scene setup
const canvas = document.querySelector('#bg-canvas');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Create an elegant Torus Knot
const geometry = new THREE.TorusKnotGeometry(10, 2.5, 200, 32, 2, 3);
const material = new THREE.MeshPhysicalMaterial({
  color: 0xd4af37, // Gold/Rose Gold
  metalness: 0.7,
  roughness: 0.2,
  clearcoat: 1.0,
  clearcoatRoughness: 0.1,
  wireframe: false,
});
const torusKnot = new THREE.Mesh(geometry, material);

// Position it to the right of the text
torusKnot.position.x = 15;
scene.add(torusKnot);

// Lighting
const pointLight = new THREE.PointLight(0xffffff, 2000, 100);
pointLight.position.set(20, 20, 20);
const pointLight2 = new THREE.PointLight(0xffaaaa, 1000, 100);
pointLight2.position.set(-20, -20, 20);
const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(pointLight, pointLight2, ambientLight);

// Mouse interaction
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX - windowHalfX);
  mouseY = (event.clientY - windowHalfY);
});

// Resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  // Adjust position for smaller screens
  if (window.innerWidth < 768) {
    torusKnot.position.x = 0;
    torusKnot.position.y = -10;
  } else {
    torusKnot.position.x = 15;
    torusKnot.position.y = 0;
  }
});

// Initial responsive check
if (window.innerWidth < 768) {
  torusKnot.position.x = 0;
  torusKnot.position.y = -10;
}

// Animation loop
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const elapsedTime = clock.getElapsedTime();

  // Gentle floating animation
  torusKnot.position.y += Math.sin(elapsedTime * 2) * 0.02;

  // Gentle rotation
  torusKnot.rotation.y += 0.005;
  torusKnot.rotation.x += 0.002;
  torusKnot.rotation.z += 0.003;

  // Mouse interactivity (smooth movement)
  targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;
  
  torusKnot.rotation.y += 0.05 * (targetX - torusKnot.rotation.y);
  torusKnot.rotation.x += 0.05 * (targetY - torusKnot.rotation.x);

  renderer.render(scene, camera);
}

animate();
