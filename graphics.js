//First thing to be drawn.
function initDraw() {
  noFill();
  stroke(0);
  strokeWeight(1);
  rect(canvasSize[0]/2-50,canvasSize[1]/2-5,100,10);
}

//This is the function that colors the map
function graphic(xOffset,yOffset) {
  for(var x = 0; x < mapArray.length; x++){
    for(var y = 0; y < mapArray[0].length; y++){
      if(xOffset > 0 && yOffset > 0){
        mapArray[x][y].offset(abs((x+xOffset)%mapArray.length),abs((y+yOffset)%mapArray[0].length));
      }
      generic(mapArray[x][y]);
    }
  }
}

function generic(point) {
  if(point.z>(highestPoint-10)){
    for(c in point.neighbors){
      if(point.neighbors[c].z > (highestPoint-10)){
        point.show("grey");
        break;
      }
    }
  }else if(point.z > 127){
    var beach = false;
    for(c in point.neighbors){
      for(c1 in point.neighbors[c].neighbors){
        if(point.neighbors[c].neighbors[c1].z <= 127){
          point.show("#fad355");
          beach = true;
          break;
        }
      }
    }
    if(!beach){
      point.show("green");
    }
  }else if(point.z <= 85){
    point.show("#0056b8");
  }else if(point.z <= 127){
    point.show("#287ee0");
  }
}
function show3d() {
  //Settings
  camera(canvasSize[0]/2, -300, (height/2) / tan(PI*30.0 / 180.0)+200, canvasSize[0]/2, canvasSize[1]/2, highestPoint/2, 0, -1, 0);
  var ocean = true;
  stroke(0);
  fill(155);

  clear();
  background(color("springgreen"));
  for(var xP = 0; xP < mapArray.length-1; xP++){
    beginShape(TRIANGLE_STRIP);
    for(var yP = 0; yP < mapArray[0].length-1; yP++){
      for(var x = 0; x < 2; x++){
        for(var y = 0; y < 2; y++){
          vertex(mapArray[xP+x][yP+y].xTrue,mapArray[xP+x][yP+y].yTrue,mapArray[xP+x][yP+y].z);
        }
      }
    }
    endShape();
  }

  if(ocean){
    fill(color("blue"));
    stroke(color("blue"));
    for(var xP = 0; xP < mapArray.length-1; xP++){
      beginShape(TRIANGLE_STRIP);
      for(var yP = 0; yP < mapArray[0].length-1; yP++){
        for(var x = 0; x < 2; x++){
          for(var y = 0; y < 2; y++){
            vertex(mapArray[xP+x][yP+y].xTrue,mapArray[xP+x][yP+y].yTrue,127);
          }
        }
      }
      endShape();
    }
  }
}

function show3dColor() {
  //Settings
  camera(canvasSize[0]/2, -300, (height/2) / tan(PI*30.0 / 180.0)+200, canvasSize[0]/2, canvasSize[1]/2, highestPoint/2, 0, -1, 0);
  stroke(0);
  fill(155);
  clear();
  background(255);

  //Draw the Main mesh.
  for(var xP = 0; xP < mapArray.length-1; xP++){
    beginShape(TRIANGLE_STRIP);
    for(var yP = 0; yP < mapArray[0].length-1; yP++){
      for(var x = 0; x < 2; x++){
        for(var y = 0; y < 2; y++){
          pickColor(mapArray[xP+x][yP+y]);
          if(mapArray[xP+x][yP+y].z > 127){
            vertex(mapArray[xP+x][yP+y].xTrue,mapArray[xP+x][yP+y].yTrue,mapArray[xP+x][yP+y].z);
          }else{
            vertex(mapArray[xP+x][yP+y].xTrue,mapArray[xP+x][yP+y].yTrue,127);
          }
        }
      }
    }
    endShape();
  }

  //Draw the Border Mesh
  fill(0);
  beginShape();
  vertex(mapArray[0][0].xTrue,mapArray[0][0].yTrue,0);
  for(var c = 0; c < mapArray.length; c++ ){
    if(mapArray[c][0].z > 127){
      vertex(mapArray[c][0].xTrue,mapArray[c][0].yTrue,mapArray[c][0].z);
    }else{
      vertex(mapArray[c][0].xTrue,mapArray[c][0].yTrue,127);
    }
  }
  vertex(mapArray[mapArray.length-1][0].xTrue,mapArray[mapArray.length-1][0].yTrue,0);
  endShape(CLOSE);
}

function pickColor(point) {
  noStroke();
  if(point.z>(highestPoint-10)){
    for(c in point.neighbors){
      if(point.neighbors[c].z > (highestPoint-10)){
        fill(color("grey"));
        break;
      }
    }
  }else if(point.z > 127){
    var beach = false;
    for(c in point.neighbors){
      for(c1 in point.neighbors[c].neighbors){
        if(point.neighbors[c].neighbors[c1].z <= 127){
          fill(color("#fad355"));
          beach = true;
          break;
        }
      }
    }
    if(!beach){
      fill(color("green"));
    }
  }else if(point.z <= 85){
    fill(color("#0056b8"));
  }else if(point.z <= 127){
    fill(color("#287ee0"));
  }
}
