//First thing to be drawn.
function initDraw() {
  noFill();
  stroke(0);
  strokeWeight(1);
  rect(canvasSize[0]/2-50,canvasSize[1]/2-5,100,10);
  textSize(24);
  fill(0);
  text("Terrain Generation Starting",canvasSize[0]/2-140,canvasSize[1]/2-10);
  textSize(12);
  text("0% Complete",canvasSize[0]/2+55,canvasSize[1]/2+5);
}

//This is the function that colors the map
function graphic(theMap) {
  for(var x = 0; x < theMap.length; x++){
    for(var y = 0; y < theMap[0].length; y++){
      generic(theMap[x][y]);
    }
  }
}

function testGraphic(theMap) {
  for(var x = 0; x < theMap.length; x++){
    for(var y = 0; y < theMap[0].length; y++){
      if(x < floor(theMap.length/2)){
        generic(theMap[x][y]);
      }else{
        testColor2(theMap[x][y]);
      }
    }
  }
}

//Basic coloring of hightmap that gives a look of terrain
function generic(point) {
  if(point.z <= 85){
    point.show("#0056b8");
  }else if(point.z <= 127){
    point.show("#287ee0");
  }else if(point.z <= 137){
    point.show("#fad355");
  }else if(point.z <= 204){
    point.show("green");
  }else{
    mapArray[x][y].show("grey");
  }
}

//Greyscale of the z cord
function greyScale(point) {
  point.show(255-point.z);
}

//The idea here is to make it a transition from blue to green
function testColor1(point) {
  point.show([10,point.z,255-point.z]);
  /*
  Conclusion While it works it does not have a good look. It becomes blobs of green in blue.
  */
}

//Near clone of testColor1 just with lines
function testColor1i1(point) {
  point.grid([10,point.z,255-point.z]);
}

function testColor2(point) {
  if(point.z > 127){
    for(var c = 0; c < 4; c++){
      console.log(point.neighbors[c]);
    }
    point.show("black");
  }
}
