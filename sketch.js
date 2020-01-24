//Settings
var canvasSize = [640,480];
var mapSize = [100,100];

//Global variables
var mapArray = [];
var cellDem = [canvasSize[0]/mapSize[0],canvasSize[1]/mapSize[1]];

function setup() {
  //Canvas set up
  createCanvas(canvasSize[0],canvasSize[1]);

  //setMap
  mapSet();

  for(var x = 0; x < mapSize[0]; x++){
    for(var y = 0; y < mapSize[1]; y++){
      if(mapArray[x][y].z == 255){
        console.log("Tick");
        mapArray[x][y].flowOut();
      }
    }
  }

  for(var x = 0; x < mapSize[0]; x++){
    for(var y = 0; y < mapSize[1]; y++){
      mapArray[x][y].show(255 - mapArray[x][y].z);
    }
  }
}

function draw() {
  //Temp noLoop()
  noLoop();

}
