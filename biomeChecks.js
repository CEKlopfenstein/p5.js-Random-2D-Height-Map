/*
This file is to contain functions that take a point as input and then determine the correct biome.
*/
function beachCheck(point, percentLevel) {
  if(percentLevel < 0.1){
    for(var c = 0; c < point.neighbors.length;c++){
      if(point.neighbors[c].z<127) {
        return true;
      }
    }
    return false;
  }else{
    return false;
  }
}
