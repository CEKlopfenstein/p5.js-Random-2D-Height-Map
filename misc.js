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

function riverSave() {
  var saveString = "";
  for(var riv = 0; riv < riversArray.length; riv++){
    for(var bran = 0; bran < riversArray[riv].riverPath.length; bran++){
      for(var c = 0; c < riversArray[riv].riverPath[bran].length; c++){
        saveString += riversArray[riv].riverPath[bran][c].x+","+riversArray[riv].riverPath[bran][c].y;
        if(c != riversArray[riv].riverPath[bran].length - 1){
          saveString += ":";
        }
      }
      if(bran != riversArray[riv].riverPath.length - 1){
        saveString += ";";
      }
    }
    if(riv != riversArray.length - 1){
      saveString += "|";
    }
  }
  console.log(saveString);
  loadRiver(saveString);
}

function loadRiver(saveString) {
  saveString = "43,22:42,22:41,22:40,22:39,22:38,22:37,22:36,22|47,98:46,98:45,98:44,98:43,98:42,98|89,43:90,43:91,43:92,43:93,43:94,43:95,43:96,43:97,43:98,43:99,43|6,45:5,45:5,46|24,28:24,27:24,26:24,25|90,79:90,80:90,81:90,82|70,20:70,19:70,18:70,17|30,8:30,9:30,10:30,11|31,32:32,32:33,32:34,32:35,32|84,21:83,21:82,21:81,21:80,21:79,21:78,21:77,21:76,21:75,21:74,21:73,21:73,20:72,20:72,19:71,19:71,18:70,18:70,17";
  var rivs1 = saveString.split("|");
  var rivs2 = [];
  var rivs3 = [];
  for(var riv = 0; riv < rivs1.length; riv++){
    rivs2.push(rivs1[riv].split(";"));
  }
  for(var riv = 0; riv < rivs1.length; riv++){
    for(var bran = 0; bran < rivs2[riv].length; bran++){
      if(bran == 0){
        rivs3.push([rivs2[riv][bran].split(":")]);
      }else{
        rivs3[riv].push(rivs2[riv][bran].split(":"));
      }
    }
  }
  console.log(rivs3[0][0][0].split(","));

  riversArray = [];
  for(var riv = 0; riv < rivs1.length; riv++){
    riversArray.push(new River(parseInt(rivs3[riv][0][0].split(",")[0]),parseInt(rivs3[riv][0][0].split(",")[1])));
    riversArray[riv].riverPath = [];
    for(var bran = 0; bran < rivs2[riv].length; bran++){
      riversArray[riv].riverPath.push([]);
      for(var c = 0; c < rivs3[riv][bran].length; c++){
        riversArray[riv].riverPath[bran].push(mapArray[parseInt(rivs3[riv][bran][c].split(",")[0])][parseInt(rivs3[riv][bran][c].split(",")[1])]);
      }
    }
  }
  console.log(rivs1,rivs2,rivs3);
  console.log("\n\n",riversArray);
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
