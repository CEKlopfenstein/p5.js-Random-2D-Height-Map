//This is the function that colors the map
function graphic(theMap) {
  for(var x = 0; x < theMap.length; x++){
    for(var y = 0; y < theMap[0].length; y++){
      greyScale(theMap[x][y]);
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
