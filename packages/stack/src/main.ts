import * as THREE from "three"

import { Game } from "./game";

//@ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const CANVAS_ID = "app";
let width = window.innerWidth;
let height = window.innerHeight;

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById(CANVAS_ID) as HTMLCanvasElement,
  antialias: true
});

// Initialize settings
const game = new Game({
  viewport: {
    width: width,
    height: height
  },
  camera: {
    near: 0.1,
    far: 1000
  }
});

const controls = new OrbitControls(game.camera, renderer.domElement);
controls.update();

window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  game.initialCamera({
    viewport: {
      width: width,
      height: height
    },
    camera: {
      near: 0.1,
      far: 1000
    }
  });
  game.camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});


renderer.setSize(width, height);
function gameLoop() {
  requestAnimationFrame(gameLoop);
  game.update();
  controls.update();
  renderer.render(game.scene, game.camera)
}
gameLoop();

