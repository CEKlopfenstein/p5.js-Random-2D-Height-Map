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
var points = 1;
var xTick = 0;
var yTick = 0;
var highPointCords = [];
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
  //Canvas set up
  createCanvas(canvasSize[0],canvasSize[1]);

  //setMap
  mapSet();

  //This is to force a load
  //mapArray = loadFromFile(inputFile);
}

function draw() {
  if(genComplete){
    if(!dataSent){
      totalTime = millis() - startTime;
      var finalData = logIt();
      highestPoint = highPointFind(mapArray);
      lowestPoint = lowPointFind(mapArray);
      console.log(finalData+"\n"+highestPoint+"\n"+lowestPoint);
      trueLogger(finalData);
      //saveToFile(mapArray);
      dataSent = true;
    }
    graphic(offSets[0],offSets[1]);
    noLoop();
  }else if(!firstDraw){
    colorTest();
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
    mapArray[highPointCords[points-1][0]][highPointCords[points-1][1]].flowOut(points);
    //Fill Bottom bar
    fill(color("green"));
    rect(canvasSize[0]/2-50,canvasSize[1]/2-5,100*(points/highPointCords.length),10);
    //Clean Text Area
    fill(255);
    stroke(255);
    rect(canvasSize[0]/2+55,canvasSize[1]/2-5,100,10);
    //Add Text
    stroke(0);
    fill(0);
    textSize(12);
    text(floor((points/highPointCords.length)*1000)/10+"% Complete",canvasSize[0]/2+55,canvasSize[1]/2+5);
    points++;
    if(points > highPointCords.length){
      genStage1 = true;
    }
  }else if(!genStage2){
    smoothMap();
    genStage2 = true;
    genComplete = true;
  }
}

function keyPressed() {
  if(keyCode === LEFT_ARROW){
    offSets[0] += -1;
    clear();
    loop();
  }else if (keyCode === RIGHT_ARROW) {
    offSets[0] += 1;
    clear();
    loop();
  }else if (keyCode === UP_ARROW) {
    offSets[1] += -1;
    clear();
    loop();
  }else if (keyCode === DOWN_ARROW) {
    offSets[1] += 1;
    clear();
    loop();
  }

  //Prevent default browswer actions
  return false;
}
