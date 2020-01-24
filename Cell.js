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

  //Initialization

  //Functions
  this.show = function(col) {
    fill(color(col));
    stroke(color(col));
    strokeWeight(0.5);
    rect(this.xTrue, this.yTrue, this.width, this.height);
  }

  this.addNeighbors = function(world){
    //Left
    if(this.x != 0){
      this.neighbors.push(world[this.x-1][this.y]);
    }

    //Top
    if(this.y != 0){
      this.neighbors.push(world[this.x][this.y-1]);
    }

    //Bottom
    if(this.y != world[0].length-1){
      this.neighbors.push(world[this.x][this.y+1]);
    }

    //Right
    if(this.x != world.length-1){
      this.neighbors.push(world[this.x+1][this.y]);
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

}
