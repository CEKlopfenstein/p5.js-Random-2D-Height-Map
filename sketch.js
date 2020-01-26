//Settings
var canvasSize = [640,480];
var mapSize = [100,100];
var pointCount = 20;
var fallRate = 10;
var smoothOut = 25;

//Global variables
var mapArray = [];
var cellDem = [canvasSize[0]/mapSize[0],canvasSize[1]/mapSize[1]];
var genComplete = false;
var genStage1 = false;
var genStage2 = false;
var points = 1;
var xTick = 0;
var yTick = 0;

function setup() {
  //Canvas set up
  createCanvas(canvasSize[0],canvasSize[1]);

  //setMap
  mapSet();

}

function draw() {
  if(genComplete){
    color1();
    noLoop();
  }else if(!genStage1){
    fill(255);
    stroke(0);
    strokeWeight(1);
    rect(canvasSize[0]/2-50,canvasSize[1]/2-20,100,10);
    rect(canvasSize[0]/2-50,canvasSize[1]/2-5,100,10);
    noFill();
    rect(canvasSize[0]/2-50,canvasSize[1]/2+10,100,10);
    noStroke();
    fill(color("red"));
    rect(canvasSize[0]/2-50,canvasSize[1]/2-20,100*(yTick/mapSize[1]),10);
    rect(canvasSize[0]/2-50,canvasSize[1]/2-5,100*(xTick/mapSize[0]),10);
    if(xTick < mapSize[0]){
      if(yTick < mapSize[1]){
        if(mapArray[xTick][yTick].z == 255){
          mapArray[xTick][yTick].flowOut();
          fill(color("green"));
          noStroke();
          rect(canvasSize[0]/2-50,canvasSize[1]/2+10,100*(points/pointCount),10);
          fill(255);
          stroke(255);
          rect(canvasSize[0]/2+55,canvasSize[1]/2+10,100,10);
          stroke(0);
          fill(0);
          textSize(12);
          text(floor((points/pointCount)*1000)/10+"% Complete",canvasSize[0]/2+55,canvasSize[1]/2+20);
          points++;
        }
        yTick++;
      }else{
        yTick = 0;
        xTick++;
      }
    }else{
      xTick = 0;
      genStage1 = true;
    }
  }else if(!genStage2){
    smoothMap();
    genStage2 = true;
    genComplete = true;
  }
}
