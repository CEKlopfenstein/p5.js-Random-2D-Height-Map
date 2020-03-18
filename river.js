function River(startX, startY){
  this.x = startX;
  this.y = startY;
  this.riverPath = [[mapArray[this.x][this.y]]];

  this.generateFlow = function() {
    for(var c = 0; c < this.riverPath.length; c++){
      var c1 = this.riverPath[c].length-1;
      while(c1 < this.riverPath[c].length && this.riverPath[c][c1].z > 127){
        //Find lowestPoint to go to next
        var low = 0;
        for(var n = 0; n < this.riverPath[c][c1].neighbors.length; n++){
          if(this.riverPath[c][c1].neighbors[n].z < this.riverPath[c][c1].neighbors[low].z){
            low = n;
          }
        }
        if(this.riverPath[c][c1].z >= this.riverPath[c][c1].neighbors[low].z){
          this.riverPath[c].push(this.riverPath[c][c1].neighbors[low]);
          //Check for other points equal to the lowestPoint.
         for(var n = 0; n < this.riverPath[c][c1].neighbors.length; n++){
           if(this.riverPath[c][c1].neighbors[n].z == this.riverPath[c][c1].neighbors[low].z && n != low && this.riverPath[c][c1].z > this.riverPath[c][c1].neighbors[n].z){
             this.riverPath.push([this.riverPath[c][c1],this.riverPath[c][c1].neighbors[n]]);
           }
         }
        }
        c1++;
      }
    }
  }

  this.show = function(){
    console.log(this.riverPath.length);
    stroke(color("green"));
    strokeWeight(1.5);
    noFill();
    console.log(this.riverPath);
    for(var t = 0; t < this.riverPath.length; t++){
      if(this.riverPath[t].length>1){
        fill(color("green"));
        circle(this.riverPath[t][0].xTrue+this.riverPath[t][0].width/2,this.riverPath[t][0].yTrue+this.riverPath[t][0].height/2,(this.riverPath[t][0].height+this.riverPath[t][0].width)/4);
        noFill();
        beginShape();
        for(var c = 0; c < this.riverPath[t].length; c++){
          if (c > 0 && dist(this.riverPath[t][c].x,this.riverPath[t][c].y,this.riverPath[t][c-1].x,this.riverPath[t][c-1].y)>2) {//Check if the distence between two points is greater than it should be.
            if(this.riverPath[t][c].x-this.riverPath[t][c-1].x == 0){//Determine in what direction the river makes the jump Up/Down or Left/Right
              if(this.riverPath[t][c-1].y == 0){//Determine if it is jumping Up or Down
                //Make the splice
                vertex(this.riverPath[t][c-1].xTrue+this.riverPath[t][c-1].width/2,this.riverPath[t][c-1].yTrue);
                endShape();
                beginShape();
                vertex(this.riverPath[t][c].xTrue+this.riverPath[t][c].width/2,this.riverPath[t][c].yTrue+this.riverPath[t][c].height);
              }else{
                vertex(this.riverPath[t][c-1].xTrue+this.riverPath[t][c-1].width/2,this.riverPath[t][c-1].yTrue+this.riverPath[t][c-1].height);
                endShape();
                beginShape();
                vertex(this.riverPath[t][c].xTrue+this.riverPath[t][c].width/2,this.riverPath[t][c].yTrue);
              }
            }else{
              if(this.riverPath[t][c-1].x == 0){//Determine if its jumping Left or Right
                vertex(this.riverPath[t][c-1].xTrue,this.riverPath[t][c-1].yTrue+this.riverPath[t][c-1].height/2);
                endShape();
                beginShape();
                vertex(this.riverPath[t][c].xTrue+this.riverPath[t][c].width,this.riverPath[t][c].yTrue+this.riverPath[t][c].height/2);
              }else{
                vertex(this.riverPath[t][c-1].xTrue+this.riverPath[t][c-1].width,this.riverPath[t][c-1].yTrue+this.riverPath[t][c-1].height/2);
                endShape();
                beginShape();
                vertex(this.riverPath[t][c].xTrue,this.riverPath[t][c].yTrue+this.riverPath[t][c].height/2);
              }
            }
          }
          vertex(this.riverPath[t][c].xTrue+this.riverPath[t][c].width/2,this.riverPath[t][c].yTrue+this.riverPath[t][c].height/2);
        }
        endShape();
      }
    }
  }
}
