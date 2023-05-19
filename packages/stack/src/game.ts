import * as THREE from 'three';
//@ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { IGame, IViewport } from './types';
export class Game {
  camera: THREE.OrthographicCamera;
  scene: THREE.Scene;
  viewport: IViewport;
  objects: [{
    animation: boolean;
    object: THREE.Mesh<THREE.BoxGeometry, THREE.MeshLambertMaterial>
  }?];

  constructor({ viewport, camera }: IGame) {
    this.scene = new THREE.Scene();
    this.camera = this.initialCamera({ viewport, camera });
    this.viewport = viewport;
    this.objects = [];
    this.initialize();
    this.keyboard();
  }

  initialCamera({ viewport, camera }: IGame) {
    const width = viewport.width;
    const height = viewport.height;
    const aspectRatio = 16 / 9;

    const cameraWidth = 10;
    const cameraHeight = 10;
    return new THREE.OrthographicCamera(
      cameraWidth / -2,
      cameraWidth / 2,
      cameraHeight / 2,
      cameraHeight / -2,
      1,
      1000
    );
  }

  initialize() {
    this.camera.position.set(4, 4, 4);
    this.camera.lookAt(0, 0, 0);

    const boxGeometry = new THREE.BoxGeometry(3, 1, 3);
    const boxMaterial = new THREE.MeshLambertMaterial({ color: 0xff00ff });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.set(0, 0, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(10, 20, 0);

    this.scene.add(ambientLight);
    this.scene.add(directionalLight);
    this.objects.push({
      animation: false,
      object: box
    });
    this.scene.add(box);
  }

  update() {
    const box = this.objects[this.objects.length - 1];

    if (box?.animation) {
    } else {
      const color = new THREE.Color(`hsl(${30 * this.objects.length * 2},100%,50%)`);
      console.log(color);
      const nextBox = new THREE.Mesh(box?.object.geometry, new THREE.MeshLambertMaterial({ color: color }));
      nextBox.position.set(0, box!.object.position.y+1, 0);
      this.scene.add(nextBox);
      this.objects.push({
        animation: true,
        object: nextBox
      });
    }
  }

  keyboard() {
    window.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "Space":
          this.objects[this.objects.length-1]!.animation = false;
          break;
      }
    })
  }
}
