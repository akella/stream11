import dat from 'dat-gui';

let cfg = {
  friction: 0.7,
  springFactor: 0.1
};
let gui = new dat.GUI();
gui.add(cfg, 'friction', 0,1);
gui.add(cfg, 'springFactor', 0,0.5);

export default cfg;
