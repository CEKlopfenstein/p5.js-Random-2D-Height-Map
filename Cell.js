function Cell(xCord, yCord, xDem, yDem){
  //Variables
  this.x = xCord;
  this.y = yCord;
  this.width = xDem;
  this.height = yDem;
  this.xTrue = xCord*xDem;
  this.yTrue = yCord*yDem;
  this.neighbors = [];

  //Initialization

  //Functions
  this.show = function(col) {
    fill(color(col));
    stroke(0);
    strokeWeight(0.5);
    rect(this.xTrue, this.yTrue, this.width, this.height);
  }

  this.addNeighbors = function(world){

  }

}
