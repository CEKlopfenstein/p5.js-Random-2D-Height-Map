//Settings
var canvasSize = [640,480];
var mapSize = [100,100];
var pointCount = 20;
var fallRate = 10;
var smoothOut = 25;
var logFile = "Output.txt";

//Global variables
var mapArray = [];
var cellDem = [canvasSize[0]/mapSize[0],canvasSize[1]/mapSize[1]];
var genComplete = false;
var genStage1 = false;
var genStage2 = false;
var firstDraw = false;
var points = 0;
var sector = 0;
var prog = 0;
var finalprog = pointCount;
var xTick = 0;
var yTick = 0;
var highPointCords = [];
var divHighPoints = [];
var startTime;
var totalTime;
var inputFile;
var highestPoint;
var lowestPoint;
var offSets = [mapSize[0]*100,mapSize[1]*100];
var dataSent = false;
var testTick = 0;

function preload() {
  inputFile = loadStrings("mapTest.txt");
}

function setup() {
  //Temp noLoop
  //noLoop();

  //Canvas set up
  createCanvas(canvasSize[0],canvasSize[1],WEBGL);

  //Set Background
  background(color("springgreen"));

  //setMap
  mapSet();

  //This is to force a load
  mapArray = loadFromFile(inputFile);
  createElement('center', '<h1>3D Terrain Generation Demo</h1>');

}

function draw() {
  translate(-canvasSize[0]/2, -canvasSize[1]/2);

  if(genComplete){
    if(!dataSent){
      totalTime = millis() - startTime;
      var finalData = logIt();
      highestPoint = highPointFind(mapArray);
      lowestPoint = lowPointFind(mapArray);
      console.log(finalData+"\n"+highestPoint+"\n"+lowestPoint);
      //trueLogger(finalData);
      //saveToFile(mapArray);
      dataSent = true;
    }
    topCamera();
    show3dColor();
    noLoop();
  }else if(!firstDraw){
    initDraw();
    firstDraw = true;
  }else if(!genStage1){
    //Empty Bar
    noFill();
    stroke(0);
    strokeWeight(1);
    rect(canvasSize[0]/2-50,canvasSize[1]/2-5,100,10);
    //Fill bar
    noStroke();
    mapArray[divHighPoints[sector][points][0]][divHighPoints[sector][points][1]].flowOut();
    //Fill Bottom bar
    fill(color("green"));
    rect(canvasSize[0]/2-50,canvasSize[1]/2-5,100*(prog/finalprog),10);

    //Hangle counters
    prog++;
    points++;
    if(points == divHighPoints[sector].length){
      points = 0;
      sector++;
    }
    if(prog == finalprog){
      genStage1 = true;
    }
  }else if(!genStage2){
    smoothMap();
    genStage2 = true;
    genComplete = true;
  }
}

function keyPressed() {
  //Prevent default browswer actions
  return false;
}
