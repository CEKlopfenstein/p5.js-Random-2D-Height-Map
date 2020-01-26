//Settings
var canvasSize = [640,480];
var mapSize = [1000,1000];
var pointCount = 100;
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
var highPointCords = [];

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
    //Empty Bar
    noFill();
    stroke(0);
    strokeWeight(1);
    rect(canvasSize[0]/2-50,canvasSize[1]/2-5,100,10);
    //Fill bar
    noStroke();
    mapArray[highPointCords[points-1][0]][highPointCords[points-1][1]].flowOut();
    //Fill Bottom bar
    fill(color("green"));
    rect(canvasSize[0]/2-50,canvasSize[1]/2-5,100*(points/pointCount),10);
    //Clean Text Area
    fill(255);
    stroke(255);
    rect(canvasSize[0]/2+55,canvasSize[1]/2-5,100,10);
    //Add Text
    stroke(0);
    fill(0);
    textSize(12);
    text(floor((points/pointCount)*1000)/10+"% Complete",canvasSize[0]/2+55,canvasSize[1]/2+5);
    points++;
  }else if(!genStage2){
    smoothMap();
    genStage2 = true;
    genComplete = true;
  }
}
