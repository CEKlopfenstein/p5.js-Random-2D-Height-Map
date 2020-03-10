//Basic mapFilling
function mapSet(){
  //Start Timer
  startTime = millis();

  //Fill mapArray
  for(var x = 0; x < mapSize[0]; x++){
    mapArray.push([]);
    for(var y = 0; y < mapSize[1]; y++){
      mapArray[x].push(new Cell(x,y,cellDem[0],cellDem[1]));
    }
  }

  //addNeighbors
  for(var x = 0; x < mapSize[0]; x++){
    for(var y = 0; y < mapSize[1]; y++){
      mapArray[x][y].addNeighbors(mapArray);
    }
  }

  //Make Random High Points
  for(var c = 0; c < pointCount; c++){
    highPointCords.push([floor(random()*mapSize[0]),floor(random()*mapSize[1])]);
    mapArray[highPointCords[c][0]][highPointCords[c][1]].z = 255;
  }

  //Determine cell size
  var cellSide = Math.floor(255/fallRate);

  //Sort Values
  var cellNum = [];
  var cellCount = 0;

  //Sort highPoints into cells
  for(var x = 0; x < mapSize[0]; x += cellSide){
    for(var y = 0; y < mapSize[1]; y += cellSide){
      for(c in highPointCords){
        if((highPointCords[c][0] >= x && highPointCords[c][0] < x+cellSide)&&(highPointCords[c][1] >= y && highPointCords[c][1] < y+cellSide)){
          cellNum.push(cellCount);
        }
      }
    }
    cellCount++;
  }

  //Add highPoints to there own list determined by their cellNum
  //Create lists
  for(var c = 0; c <= cellNum[cellNum.length-1]; c++){
    divHighPoints.push([]);
  }
  //Add to lists
  for(c in highPointCords){
    divHighPoints[cellNum[c]].push(highPointCords[c]);
  }

  //Sort list
  var sortedList = [];
  while(divHighPoints.length>0){
    var most = 0;
    for(c in divHighPoints){
      if(divHighPoints[c].length > divHighPoints[most].length){
        most = c;
      }
    }
    sortedList.push(divHighPoints[most]);
    divHighPoints.splice(most,1);
  }
  divHighPoints = sortedList;

}

//Smooth out the map by making the hight of each cell the average of those arround it
function smoothMap() {
  for(var t = 0; t < smoothOut; t++){
    for(var x = 0; x < mapSize[0]; x++){
      for(var y = 0; y < mapSize[1]; y++){
        sum = 0;
        for(var c = 0; c < mapArray[x][y].neighbors.length; c++){
          sum += mapArray[x][y].neighbors[c].z;
        }
        mapArray[x][y].z = floor(sum/4);
      }
    }
  }
}

//River Generation
function riverGen() {
  //Pick Starting points of rivers and add them to array
  var c = 0;
  while(c < riverStarts){
    var pickX = floor(random(mapSize[0]));
    var pickY = floor(random(mapSize[1]));
    if(mapArray[pickX][pickY].z>127){
      riversArray.push([mapArray[pickX][pickY]]);
      c++;
    }
  }

  for(var c = 0; c < riversArray.length; c++){
    var c1 = riversArray[c].length-1;
    while(c1 < riversArray[c].length && riversArray[c][c1].z > 127){
      //Find lowestPoint to go to next
      var low = 0;
      for(var n = 0; n < riversArray[c][c1].neighbors.length; n++){
        if(riversArray[c][c1].neighbors[n].z < riversArray[c][c1].neighbors[low].z){
          low = n;
        }
      }
      if(riversArray[c][c1].z >= riversArray[c][c1].neighbors[low].z){
        riversArray[c].push(riversArray[c][c1].neighbors[low]);
        //Check for other points equal to the lowestPoint.
       for(var n = 0; n < riversArray[c][c1].neighbors.length; n++){
         if(riversArray[c][c1].neighbors[n].z == riversArray[c][c1].neighbors[low].z && n != low && riversArray[c][c1].z > riversArray[c][c1].neighbors[n].z){
           riversArray.push([riversArray[c][c1],riversArray[c][c1].neighbors[n]]);
         }
       }
      }
      c1++;
    }
  }
}

function tempRiverShow() {
  console.log(riversArray.length);
  stroke(color("blue"));
  strokeWeight(1.5);
  noFill();
  console.log(riversArray);
  for(var t = 0; t < riversArray.length; t++){
    if(riversArray[t].length>1){
      fill(color("blue"));
      circle(riversArray[t][0].xTrue+riversArray[t][0].width/2,riversArray[t][0].yTrue+riversArray[t][0].height/2,(riversArray[t][0].height+riversArray[t][0].width)/4);
      noFill();
      beginShape();
      for(var c = 0; c < riversArray[t].length; c++){
        if (c > 0 && dist(riversArray[t][c].x,riversArray[t][c].y,riversArray[t][c-1].x,riversArray[t][c-1].y)>2) {//Check if the distence between two points is greater than it should be.
          if(riversArray[t][c].x-riversArray[t][c-1].x == 0){//Determine in what direction the river makes the jump Up/Down or Left/Right
            if(riversArray[t][c-1].y == 0){//Determine if it is jumping Up or Down
              //Make the splice
              vertex(riversArray[t][c-1].xTrue+riversArray[t][c-1].width/2,riversArray[t][c-1].yTrue);
              endShape();
              beginShape();
              vertex(riversArray[t][c].xTrue+riversArray[t][c].width/2,riversArray[t][c].yTrue+riversArray[t][c].height);
            }else{
              vertex(riversArray[t][c-1].xTrue+riversArray[t][c-1].width/2,riversArray[t][c-1].yTrue+riversArray[t][c-1].height);
              endShape();
              beginShape();
              vertex(riversArray[t][c].xTrue+riversArray[t][c].width/2,riversArray[t][c].yTrue);
            }
          }else{
            if(riversArray[t][c-1].x == 0){//Determine if its jumping Left or Right
              vertex(riversArray[t][c-1].xTrue,riversArray[t][c-1].yTrue+riversArray[t][c-1].height/2);
              endShape();
              beginShape();
              vertex(riversArray[t][c].xTrue+riversArray[t][c].width,riversArray[t][c].yTrue+riversArray[t][c].height/2);
            }else{
              vertex(riversArray[t][c-1].xTrue+riversArray[t][c-1].width,riversArray[t][c-1].yTrue+riversArray[t][c-1].height/2);
              endShape();
              beginShape();
              vertex(riversArray[t][c].xTrue,riversArray[t][c].yTrue+riversArray[t][c].height/2);
            }
          }
        }
        vertex(riversArray[t][c].xTrue+riversArray[t][c].width/2,riversArray[t][c].yTrue+riversArray[t][c].height/2);
      }
      endShape();
    }
  }
}
