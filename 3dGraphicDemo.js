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
  fill(200);
  //Front and Back
  for(var c = 0; c < mapArray.length-1; c++ ){
    beginShape();
    if(mapArray[c][0].z > 127){
      vertex(mapArray[c][0].xTrue,mapArray[c][0].yTrue,0);
      vertex(mapArray[c][0].xTrue,mapArray[c][0].yTrue,mapArray[c][0].z);
      vertex(mapArray[c+1][0].xTrue,mapArray[c+1][0].yTrue,mapArray[c+1][0].z);
      vertex(mapArray[c+1][0].xTrue,mapArray[c+1][0].yTrue,0);
    }else{
      vertex(mapArray[c][0].xTrue,mapArray[c][0].yTrue,0);
      vertex(mapArray[c][0].xTrue,mapArray[c][0].yTrue,127);
      vertex(mapArray[c+1][0].xTrue,mapArray[c+1][0].yTrue,127);
      vertex(mapArray[c+1][0].xTrue,mapArray[c+1][0].yTrue,0);
    }
    endShape(CLOSE);
    beginShape();
    if(mapArray[c][mapArray[0].length-1].z > 127){
      vertex(mapArray[c][mapArray[0].length-1].xTrue,mapArray[c][mapArray[0].length-1].yTrue,0);
      vertex(mapArray[c][mapArray[0].length-1].xTrue,mapArray[c][mapArray[0].length-1].yTrue,mapArray[c][mapArray[0].length-1].z);
      vertex(mapArray[c+1][mapArray[0].length-1].xTrue,mapArray[c+1][mapArray[0].length-1].yTrue,mapArray[c+1][mapArray[0].length-1].z);
      vertex(mapArray[c+1][mapArray[0].length-1].xTrue,mapArray[c+1][mapArray[0].length-1].yTrue,0);
    }else{
      vertex(mapArray[c][mapArray[0].length-1].xTrue,mapArray[c][mapArray[0].length-1].yTrue,0);
      vertex(mapArray[c][mapArray[0].length-1].xTrue,mapArray[c][mapArray[0].length-1].yTrue,127);
      vertex(mapArray[c+1][mapArray[0].length-1].xTrue,mapArray[c+1][mapArray[0].length-1].yTrue,127);
      vertex(mapArray[c+1][mapArray[0].length-1].xTrue,mapArray[c+1][mapArray[0].length-1].yTrue,0);
    }
    endShape(CLOSE);
  }
  //Sides
  for(var c = 0; c < mapArray[0].length-1; c++){
    beginShape();
    if(mapArray[0][c].z > 127){
      vertex(mapArray[0][c].xTrue,mapArray[0][c].yTrue,0);
      vertex(mapArray[0][c].xTrue,mapArray[0][c].yTrue,mapArray[0][c].z);
      vertex(mapArray[0][c+1].xTrue,mapArray[0][c+1].yTrue,mapArray[0][c+1].z);
      vertex(mapArray[0][c+1].xTrue,mapArray[0][c+1].yTrue,0);
    }else{
      vertex(mapArray[0][c].xTrue,mapArray[0][c].yTrue,0);
      vertex(mapArray[0][c].xTrue,mapArray[0][c].yTrue,127);
      vertex(mapArray[0][c+1].xTrue,mapArray[0][c+1].yTrue,127);
      vertex(mapArray[0][c+1].xTrue,mapArray[0][c+1].yTrue,0);
    }
    endShape(CLOSE);
    beginShape();
    if(mapArray[c][mapArray[0].length-1].z > 127){
      vertex(mapArray[mapArray[0].length-1][c].xTrue,mapArray[mapArray[0].length-1][c].yTrue,0);
      vertex(mapArray[mapArray[0].length-1][c].xTrue,mapArray[mapArray[0].length-1][c].yTrue,mapArray[mapArray[0].length-1][c].z);
      vertex(mapArray[mapArray[0].length-1][c+1].xTrue,mapArray[mapArray[0].length-1][c+1].yTrue,mapArray[mapArray[0].length-1][c+1].z);
      vertex(mapArray[mapArray[0].length-1][c+1].xTrue,mapArray[mapArray[0].length-1][c+1].yTrue,0);
    }else{
      vertex(mapArray[mapArray[0].length-1][c].xTrue,mapArray[mapArray[0].length-1][c].yTrue,0);
      vertex(mapArray[mapArray[0].length-1][c].xTrue,mapArray[mapArray[0].length-1][c].yTrue,127);
      vertex(mapArray[mapArray[0].length-1][c+1].xTrue,mapArray[mapArray[0].length-1][c+1].yTrue,127);
      vertex(mapArray[mapArray[0].length-1][c+1].xTrue,mapArray[mapArray[0].length-1][c+1].yTrue,0);
    }
    endShape(CLOSE);
  }
  //Bottom
  beginShape();
  vertex(mapArray[0][0].xTrue,mapArray[0][0].yTrue,0);
  vertex(mapArray[mapArray.length-1][0].xTrue,mapArray[mapArray.length-1][0].yTrue,0);
  vertex(mapArray[mapArray.length-1][mapArray[0].length-1].xTrue,mapArray[mapArray.length-1][mapArray[0].length-1].yTrue,0);
  vertex(mapArray[0][mapArray[0].length-1].xTrue,mapArray[0][mapArray[0].length-1].yTrue,0);
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
      fill(color(20,150+(point.z-127)*(100/(highestPoint-127)),20));
    }
  }else if(point.z <= 85){
    fill(color("#0056b8"));
  }else if(point.z <= 127){
    fill(color("#287ee0"));
  }
}
function plainColor(point) {
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
function randomGreen(point) {
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
      fill(color(20,150+random(10)*10,20));
    }
  }else if(point.z <= 85){
    fill(color("#0056b8"));
  }else if(point.z <= 127){
    fill(color("#287ee0"));
  }
}
function greenGrad(point) {
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
      fill(color(20,150+(point.z-127)*(100/(highestPoint-127)),20));
    }
  }else if(point.z <= 85){
    fill(color("#0056b8"));
  }else if(point.z <= 127){
    fill(color("#287ee0"));
  }
}
function topCamera() {
  camera(canvasSize[0]/2, -300, (height/2) / tan(PI*30.0 / 180.0)+200, canvasSize[0]/2, canvasSize[1]/2, highestPoint/2, 0, -1, 0);
}
function testCamera() {
  camera(canvasSize[0]*1.3, -canvasSize[1]*0.3, 370, canvasSize[0]/2, canvasSize[1]/2, highestPoint/2, 0, 0, -1);
}
function bottomRightPointCam() {
  camera(canvasSize[0]*1.3, canvasSize[1]*1.3, 370, canvasSize[0]/2, canvasSize[1]/2, highestPoint/2, 0, 0, -1);
}
function topLeftPointCam() {
  camera(-canvasSize[0]*0.3, -canvasSize[1]*0.3, 370, canvasSize[0]/2, canvasSize[1]/2, highestPoint/2, 0, 0, -1);
}
function bottomLeftPointCam() {
  camera(-canvasSize[0]*0.3, canvasSize[1]*1.3, 370, canvasSize[0]/2, canvasSize[1]/2, highestPoint/2, 0, 0, -1);
}
function topRightPointCam() {
  camera(canvasSize[0]*1.3, -canvasSize[1]*0.3, 370, canvasSize[0]/2, canvasSize[1]/2, highestPoint/2, 0, 0, -1);
}
