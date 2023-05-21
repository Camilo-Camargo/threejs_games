import * as THREE from "three"

//@ts-ignore
import Stats from 'stats.js'
//@ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GUI from "lil-gui";

const stats = new Stats();
document.body.appendChild(stats.dom);

const gui = new GUI();
const props = {
  CubeSpeed: 0.01,
  TorusSpeed: 0.01,
  FogNear: 1,
  FogFar: 10,
}

gui.add(props, 'CubeSpeed', -0.2, 0.2, 0.01);
gui.add(props, 'TorusSpeed', -0.2, 0.2, 0.01);
gui.add(props, 'FogNear', -10, 10, 0.1);
gui.add(props, 'FogFar', -200, 200, 0.1);

const CANVAS_ID = "app";
let width = window.innerWidth;
let height = window.innerHeight;


// Create the scene and edit their properties
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

// Create the camera and changes their attributes
const camera = new THREE.PerspectiveCamera(
  60,
  width / height,
  0.1,
  1000
);

camera.position.set(5,5,5);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById(CANVAS_ID) as HTMLCanvasElement,
  antialias: true,
  //alpha: true
});

const textureLoader = new THREE.TextureLoader();
scene.background = null;
textureLoader.load(
  "./mount-washington-hotel.jpg",
  (loaded) => {
    scene.background = loaded;
  }
)

// Set shadows to the scene
renderer.shadowMap.enabled = true;
//renderer.shadowMap.type = THREE.VSMShadowMap;

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
const groundGeometry = new THREE.PlaneGeometry(10, 10);
const groundMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.position.set(0,-1,-3);
ground.rotation.set(Math.PI/-2, 0,0);
ground.receiveShadow = true;
scene.add(ground);

const controls = new OrbitControls(camera, renderer.domElement);



window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});


renderer.setSize(width, height);
let step = 0.04;
function gameLoop() {
  scene.fog = new THREE.Fog(0xffffff, props.FogNear, props.FogFar);
  box.rotation.x += props.CubeSpeed;
  torusKnot.rotation.x -= props.TorusSpeed;
  step += 0.04;
  box.position.x = 4*(Math.cos(step));
  box.position.y = 3*(Math.abs(Math.sin(step)));
  requestAnimationFrame(gameLoop);
  stats.update();
  controls.update();
  renderer.render(scene, camera)
  renderer.setClearColor(0xffffff);
}
gameLoop();

