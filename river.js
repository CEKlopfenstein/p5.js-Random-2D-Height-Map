function River(startX, startY){
  this.x = startX;
  this.y = startY;
  this.riverPath = [[mapArray[this.x][this.y]]];

  this.generateMainFlow = function() {
    var c1 = this.riverPath[0].length-1;
    while(c1 < this.riverPath[0].length && this.riverPath[0][c1].z > 127){
      //Find lowestPoint to go to next
      var low = 0;
      for(var n = 0; n < this.riverPath[0][c1].neighbors.length; n++){
        if(this.riverPath[0][c1].neighbors[n].z < this.riverPath[0][c1].neighbors[low].z){
          low = n;
        }
      }
      if(this.riverPath[0][c1].z >= this.riverPath[0][c1].neighbors[low].z){
        this.riverPath[0].push(this.riverPath[0][c1].neighbors[low]);
      }
      c1++;
    }
  }

  this.branchOff = function(){
    var count = 0;
    var tempBranch = [];
    var goodBranch = false;
    console.log("New");

    for(var c = 0; c < this.riverPath[0].length - 1; c++){
      if(abs(this.riverPath[0][c].z - this.riverPath[0][c+1].z) <= riverSplit){
        //Set flag
        goodBranch = true;
        console.log("Branch");

        //Set test start
        tempBranch = [this.riverPath[0][c]];

        //Start looping test
        for(var c1 = 0; c1 < 3; c1++){
          //Find lowest that is not
          var low = 0;
          for(var n = 0; n < tempBranch[c1].neighbors.length; n++){
            if(tempBranch[c1].neighbors[n] !== this.riverPath[0][c+1] && tempBranch[c1].neighbors[n].z <= tempBranch[c1].z && tempBranch[c1].neighbors[n].z < tempBranch[c1].neighbors[low].z){
              low = n;
            }
          }
          console.log("\tLow: "+low);

          //Make sure the next point is lower or equal. if not fail.
          if(tempBranch[c1].neighbors[low].z <= tempBranch[c1].z && tempBranch[c1].neighbors[low] !== this.riverPath[0][c+1]){
            tempBranch.push(tempBranch[c1].neighbors[low]);
          }else{
            console.log("\tStop");
            goodBranch = false;
            break;
          }
        }

        //If first number of points are good test again
        if(goodBranch){
          for(var main = 0; main < this.riverPath[0].length && goodBranch; main++){
            for(var test = 1; test < tempBranch.length && goodBranch; test++){
              if(this.riverPath[0][main] === tempBranch[test]){
                goodBranch = false;
              }
            }
          }
        }

        //If still good then complete generation
        if(goodBranch){
          console.log("Yes");
        }else {
          console.log("No");
        }

      }
    }
    if(count>0){
      console.log("Length: "+this.riverPath[0].length+" Break Count: "+count);
    }
  }

  this.show = function(){
    stroke(color("blue"));
    fill(color("blue"));
    circle(this.riverPath[0][0].xTrue+this.riverPath[0][0].width/2,this.riverPath[0][0].yTrue+this.riverPath[0][0].height/2,(this.riverPath[0][0].height+this.riverPath[0][0].width)/4);
    strokeWeight(1.5);
    noFill();
    for(var t = 0; t < this.riverPath.length; t++){
      if(this.riverPath[t].length>1){
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
