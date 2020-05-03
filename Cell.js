function Cell(xCord, yCord, xDem, yDem){
  //Variables
  this.x = xCord;
  this.y = yCord;
  this.z = 0;
  this.width = xDem;
  this.height = yDem;
  this.xTrue = xCord*xDem;
  this.yTrue = yCord*yDem;
  this.neighbors = [];
  this.zChange = 0;
  this.biome = -1;

  //Initialization

  //Functions
  this.show = function(col) {
    fill(color(col));
    stroke(color(col));
    strokeWeight(0.5);
    rect(this.xTrue, this.yTrue, this.width, this.height);
  }

  this.grid = function(col) {
    fill(color(col));
    stroke(0);
    strokeWeight(0.5);
    rect(this.xTrue, this.yTrue, this.width, this.height);
  }

  this.addNeighbors = function(world){
    //Left
    if(this.x != 0){
      this.neighbors.push(world[this.x-1][this.y]);
    }else{
      this.neighbors.push(world[world.length-1][this.y]);
    }

    //Top
    if(this.y != 0){
      this.neighbors.push(world[this.x][this.y-1]);
    }else{
      this.neighbors.push(world[this.x][world[0].length-1]);
    }

    //Bottom
    if(this.y != world[0].length-1){
      this.neighbors.push(world[this.x][this.y+1]);
    }else{
      this.neighbors.push(world[this.x][0]);
    }

    //Right
    if(this.x != world.length-1){
      this.neighbors.push(world[this.x+1][this.y]);
    }else{
      this.neighbors.push(world[0][this.y]);
    }
  }

  this.flowOut = function(){
    for(var c = 0; c < this.neighbors.length; c++){
      if(this.neighbors[c].z < this.z && this.z - fallRate > 0){
        this.neighbors[c].z = this.z - fallRate;
        this.neighbors[c].flowOut();
      }
    }
  }

  this.offset = function(xCord,yCord) {
    this.x = xCord;
    this.y = yCord;
    this.xTrue = xCord*xDem;
    this.yTrue = yCord*yDem;
  }

  this.findZChange = function(){
    var sum = 0;
    for(x in this.neighbors){
      sum += abs(this.neighbors[x].z - this.z);
    }
    this.zChange = sum / 4;
  }

  this.biomeGen = function(){
    if(this.z > 127){
      var beach = false;
      for(c in this.neighbors){
        for(c1 in this.neighbors[c].neighbors){
          if(this.neighbors[c].neighbors[c1].z <= 127){
            this.biome = 2;
            beach = true;
            break;
          }
        }
      }
      if(!beach){
        this.biome = 3;
      }
    }else if(mapArray[x][y].z <= 85){
      this.biome = 0;
    }else if(mapArray[x][y].z <= 127){
      this.biome = 1;
    }
  }

}
