//Settings
var canvasSize = [640,480];
var mapSize = [10,10];

//Global variables
var mapArray = [];
var cellDem = [canvasSize[0]/mapSize[0],canvasSize[1]/mapSize[1]];

//Objects
function Cell(xCord, yCord, xDem, yDem){
  //Variables
  this.x = xCord;
  this.y = yCord;
  this.width = xDem;
  this.height = yDem;
  this.xTrue = xCord*xDem;
  this.yTrue = yCord*yDem;
  this.neighbors = [];

  //Initialization

  //Functions
  this.show = function(col) {
    fill(color(col));
    stroke(0);
    strokeWeight(0.5);
    rect(this.xTrue, this.yTrue, this.width, this.height);
  }

  this.addNeighbors = function(world){

  }

}

function setup() {
  //Canvas set up
  createCanvas(canvasSize[0],canvasSize[1]);

  //Fill mapArray
  for(var x = 0; x < mapSize[0]; x++){
    mapArray.push([]);
    for(var y = 0; y < mapSize[1]; y++){
      mapArray[x].push(new Cell(x,y,cellDem[0],cellDem[1]));
    }
  }

  //addNeighbors
  for(var x = 0; x < mapSize[0]; x++){
    for(var y = 0; y < mapSize[1]; y++){
      mapArray[x][y].addNeighbors(mapArray);
    }
  }
}

function draw() {
  //Temp noLoop()
  noLoop();

}
