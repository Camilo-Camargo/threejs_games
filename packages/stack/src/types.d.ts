export type IViewport = {
  width: number;
  height: number;
};

export type ICamera = {
  near: number;
  far: number;
};


export type IGame = {
  viewport: IViewport;
  camera: ICamera
}


