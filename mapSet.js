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
  highPointCords = [[33,22],[19,78],[99,41],[7,18],[41,20],[8,24],[65,99],[44,59],[65,26],[90,82],[45,97],[52,49],[58,90],[63,60],[85,49],[52,99],[86,19],[66,32],[63,88],[72,55]];
  for(var c = 0; c < pointCount; c++){
    //highPointCords.push([floor(random()*mapSize[0]),floor(random()*mapSize[1])]);
    mapArray[highPointCords[c][0]][highPointCords[c][1]].z = 255;
  }

  //Determine cell size
  var cellSide = Math.floor(255/fallRate);

  //Sort highPoints into cells
  console.log(divHighPoints.length);
  for(var x = 0; x < mapSize[0]; x += cellSide){
    for(var y = 0; y < mapSize[1]; y += cellSide){
      
    }
  }

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
