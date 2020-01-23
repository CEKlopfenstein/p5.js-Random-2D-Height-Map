//Settings
var canvasSize = [640,480];
var mapSize = [10,10];

//Global variables
var mapArray = [];
var cellDem = [canvasSize[0]/mapSize[0],canvasSize[1]/mapSize[1]];

function setup() {
  //Canvas set up
  createCanvas(canvasSize[0],canvasSize[1]);

  //setMap
  mapSet();
}

function draw() {
  //Temp noLoop()
  noLoop();

}
