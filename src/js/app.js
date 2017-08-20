import Dot from './ball';
import 'pixi.js';
import Delaunator from 'delaunator';

const DOTS_NUMBER = 100;
var app = new PIXI.Application(800, 600, { transparent: true });
document.body.appendChild(app.view);
app.stage.interactive = true;

var container = new PIXI.Container();

app.stage.addChild(container);

var imageSprite = PIXI.Texture.fromImage('img/2.jpg');

var texture = new PIXI.Sprite(imageSprite);
texture.width = 800;
texture.height = 600;
app.stage.addChild(texture);
var graphics = new PIXI.Graphics();
var tri = new PIXI.Graphics();
graphics.beginFill(0xFF6600, 1);

var vertice = [[0,0],[800,0],[800,600],[0,600]];
for (var i = DOTS_NUMBER; i >= 0; i--) {
  vertice.push(
    [800*Math.random(),600*Math.random()]
  );
}
// vertice.forEach( function(el, index) {
//   graphics.drawRect(el[0], el[1], 20, 20);
// });
console.log(vertice);

var delaunay = new Delaunator(vertice);
console.log(delaunay.triangles);
var mesh = delaunay.triangles;

let containers = [];
let dots = [];
let textures = [];
let triangles = [];
let j = 0,x,y;



for (var i = 0; i <mesh.length; i = i+3) {

  containers[j] = new PIXI.Container();
  triangles[j] = new PIXI.Graphics();


  x = (vertice[mesh[i]][0] + vertice[mesh[i+1]][0] + vertice[mesh[i+2]][0])/3;
  y = (vertice[mesh[i]][1] + vertice[mesh[i+1]][1] + vertice[mesh[i+2]][1])/3;

  dots.push(
    new Dot(x,y)
  );

  triangles[j].beginFill(0x007700, 0.5);
  triangles[j].lineStyle(1);
  triangles[j].moveTo(vertice[mesh[i]][0],vertice[mesh[i]][1]);
  triangles[j].lineTo(vertice[mesh[i+1]][0],vertice[mesh[i+1]][1]);
  triangles[j].lineTo(vertice[mesh[i+2]][0],vertice[mesh[i+2]][1]);
  triangles[j].endFill();
  triangles[j].closePath();

  textures[j] = new PIXI.Sprite(imageSprite);
  textures[j].width = 800;
  textures[j].height = 600;
  containers[j].addChild(textures[j]);


  containers[j].addChild(triangles[j]);
  containers[j].mask = triangles[j];
  app.stage.addChild(containers[j]);

  j++;
}




app.stage.addChild(graphics);
app.stage.addChild(tri);


app.ticker.add(function() {
  var mousePosition = app.renderer.plugins.interaction.mouse.global;
  dots.forEach((jelly,j) => {
    jelly.think(mousePosition);

    containers[j].position.x = jelly.diffX;
    containers[j].position.y = jelly.diffY;
  });
  // count += 0.01;
});
