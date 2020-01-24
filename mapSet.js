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

  //flowOut
  var c = 1;
  for(var x = 0; x < mapSize[0]; x++){
    for(var y = 0; y < mapSize[1]; y++){
      if(mapArray[x][y].z == 255){
        mapArray[x][y].flowOut();
        console.log(floor((c/pointCount)*1000)/10+"% Complete");
        c++;
      }
    }
  }
}
