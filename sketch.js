//Settings
var canvasSize = [640,480];
var mapSize = [100,100];
var pointCount = 40;
var fallRate = 10;

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
      if(mapArray[x][y].z <= 85){
        mapArray[x][y].show("#0056b8");
      }else if(mapArray[x][y].z <= 127){
        mapArray[x][y].show("#287ee0");
      }else if(mapArray[x][y].z <= 137){
        mapArray[x][y].show("#fad355");
      }else if(mapArray[x][y].z <= 204){
        mapArray[x][y].show("green");
      }else{
        mapArray[x][y].show("grey");
      }
    }
  }
}

function draw() {
  //Temp noLoop()
  noLoop();

}
