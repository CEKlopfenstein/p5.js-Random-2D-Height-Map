function colorTest() {
  for(var c = 0; c < 256; c++){
    stroke(color(0,c,0));
    fill(color(0,c,0));
    rect(c*(canvasSize[0]/255),0,(canvasSize[0]/255),20);

    stroke(color(0,c,0));
    fill(color(0,c,0));
    rect(c*(canvasSize[0]/255),40,(canvasSize[0]/255),20);
    stroke(color(0,c,c));
    fill(color(0,c,c));
    rect(c*(canvasSize[0]/255),60,(canvasSize[0]/255),20);
    stroke(color(0,0,c));
    fill(color(0,0,c));
    rect(c*(canvasSize[0]/255),80,(canvasSize[0]/255),20);

    stroke(color(0,c,0));
    fill(color(0,c,0));
    rect(c*(canvasSize[0]/255),120,(canvasSize[0]/255),20);
    stroke(color(c,c,0));
    fill(color(c,c,0));
    rect(c*(canvasSize[0]/255),140,(canvasSize[0]/255),20);
    stroke(color(c,0,0));
    fill(color(c,0,0));
    rect(c*(canvasSize[0]/255),160,(canvasSize[0]/255),20);

    stroke(color(0,255-c,c));
    fill(color(0,255-c,c));
    rect(c*(canvasSize[0]/255),200,(canvasSize[0]/255),20);
  }
}

//To save maps to a file
function saveToFile(theMap) {
  var textOut = (theMap.length)+"\n"+(theMap[0].length)+"\n";
  for(var x = 0; x < theMap.length; x++){
    for(var y = 0; y < theMap[0].length; y++){
      textOut += theMap[x][y].z+",";
    }
  }

  let out = createWriter("map.txt");
  out.write(textOut);
  out.close();
}

//To load from a file
function loadFromFile(textInput) {
  //Hold for map
  var holder = [];

  //Get mapSize data
  mapSize = [textInput[0],textInput[1]];
  cellDem = [canvasSize[0]/mapSize[0],canvasSize[1]/mapSize[1]];
  offSets = [mapSize[0]*100,mapSize[1]*100];

  //Make grid
  for(var x = 0; x < mapSize[0]; x++){
    holder.push([]);
    for(var y = 0; y < mapSize[1]; y++){
      holder[x].push(new Cell(x,y,cellDem[0],cellDem[1]));
    }
  }

  //Read details
  var data = textInput[2].split(",");

  //Write data to map
  for(var c = 0; c < mapSize[0]*mapSize[1]; c++){
    holder[(c%mapSize[0])][floor(c/mapSize[0])].z = parseInt(data[c]);
  }

  //addNeighbors
  for(var x = 0; x < mapSize[0]; x++){
    for(var y = 0; y < mapSize[1]; y++){
      holder[x][y].addNeighbors(holder);
    }
  }

  //Force draw
  genComplete = true;

  //Return the loaded map
  return holder;

}

//Find the highestPoint on the map
function highPointFind(theMap) {
  var temp = [];
  var temp2 = 0;
  for(x in theMap){
    for(y in theMap[0]){
      temp.push(theMap[x][y].z);
    }
  }

  for(c in temp){
    if(temp[c] > temp2){
      temp2 = temp[c];
    }
  }

  return temp2;
}

//Find the lowestPoint on the map
function lowPointFind(theMap) {
  var temp = [];
  var temp2 = 256;
  for(x in theMap){
    for(y in theMap[0]){
      temp.push(theMap[x][y].z);
    }
  }

  for(c in temp){
    if(temp[c] < temp2){
      temp2 = temp[c];
    }
  }

  return temp2;
}
