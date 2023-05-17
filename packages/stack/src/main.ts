import * as THREE from "three"

//@ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const CANVAS_ID = "app";
let width = window.innerWidth;
let height = window.innerHeight;

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById(CANVAS_ID) as HTMLCanvasElement
});

renderer.shadowMap.enabled = true;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  width/height,
  0.1,
  1000
); 

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshLambertMaterial({color: 0xff00ff});
const box = new THREE.Mesh(geometry, material);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const directionalLight = new THREE.DirectionalLight(0xffffff);
scene.add(new THREE.AxesHelper(5));
scene.add(ambientLight);
scene.add(directionalLight);
scene.add(box);
camera.position.set(0,2,5);

window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
  camera.aspect = width/height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});

renderer.setSize(width, height);

let i = 0.1;
function gameLoop() { 
  i += 0.1;
  box.rotation.x= i ;
  requestAnimationFrame(gameLoop);
  renderer.render(scene, camera)
}
gameLoop();

