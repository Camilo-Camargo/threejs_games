import * as THREE from "three"

//@ts-ignore
import Stats from 'stats.js'

const stats = new Stats();
document.body.appendChild(stats.dom);

const CANVAS_ID = "app";
let width = window.innerWidth;
let height = window.innerHeight;


// Create the scene and edit their properties
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
scene.fog = new THREE.Fog(0xffffff, 0.0025, 50);

// Create the camera and changes their attributes
const camera = new THREE.PerspectiveCamera(
  60,
  width / height,
  0.1,
  1000
);

camera.position.set(3,1,10);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById(CANVAS_ID) as HTMLCanvasElement,
  antialias: true
});

// Set shadows to the scene
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;

// Create ambient light that cast light to all the scene.
scene.add(new THREE.AmbientLight(0x666666));

// Create directional light that cast parallel light to an object as the sun.
const sun = new THREE.DirectionalLight(0xaaaaaa);
sun.position.set(5, 12, 8);
sun.castShadow = true;
scene.add(sun);


// Create a box with geometry and material that conform a mesh.
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x000ff });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.x = -1;
box.castShadow = true;
scene.add(box);

// Create torusKnot
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.2,100, 100);
const torusKnotMaterial = new THREE.MeshStandardMaterial({color: 0xff88, roughness: 0.1});
const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
torusKnot.castShadow = true;
torusKnot.position.x = 2;
scene.add(torusKnot);

// create a ground plane
const groundGeometry = new THREE.PlaneGeometry(10000, 10000);
const groundMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.position.set(0,-2,0);
ground.rotation.set(Math.PI/-2, 0,0);
ground.receiveShadow = true;
scene.add(ground);



window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});


renderer.setSize(width, height);
function gameLoop() {
  box.rotation.x += 0.1;
  requestAnimationFrame(gameLoop);
  stats.update();
  renderer.render(scene, camera)
  renderer.setClearColor(0xffffff);
}
gameLoop();

