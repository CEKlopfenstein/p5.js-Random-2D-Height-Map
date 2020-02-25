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
  for(var x = 0; x < mapArray.length; x++){
    for(var y = 0; y < mapArray[0].length; y++){
      generic(mapArray[x][y]);
    }
  }
}
