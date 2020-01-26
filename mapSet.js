//Basic mapFilling
function mapSet(){
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
    mapArray[floor(random()*mapSize[0])][floor(random()*mapSize[1])].z = 255;
  }
}

//Smooth out the map by making the hight of each cell the average of those arround it
function smoothMap() {
  for(var t = 0; t < smoothOut; t++){
    for(var x = 0; x < 100; x++){
      for(var y = 0; y < 100; y++){
        sum = 0;
        for(var c = 0; c < mapArray[x][y].neighbors.length; c++){
          sum += mapArray[x][y].neighbors[c].z;
        }
        mapArray[x][y].z = floor(sum/4);
      }
    }
  }
}

//Color Map
function color1() {
  for(var x = 0; x < mapSize[0]; x++){
    for(var y = 0; y < mapSize[1]; y++){
      if(mapArray[x][y].z <= 85){
        mapArray[x][y].show("#0056b8");
      }else if(mapArray[x][y].z <= 127){
        mapArray[x][y].show("#287ee0");
      }else if(mapArray[x][y].z <= 137){
        mapArray[x][y].show("#fad355");
      }else if(mapArray[x][y].z <= 204){
        mapArray[x][y].show("green");
      }else{
        mapArray[x][y].show("grey");
      }
    }
  }
}

function greyScale() {
  for(var x = 0; x < mapSize[0]; x++){
    for(var y = 0; y < mapSize[1]; y++){
      mapArray[x][y].show(255-mapArray[x][y].z);
    }
  }
}
