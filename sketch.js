xRan = []
yRan = []

//Checks
single = [1,1,1,1,0,1,1,1,1]
up2 = [1,1,1,1,0,0,1,1,1]
side2 = [1,1,1,1,0,1,1,0,1]
spot = [1,0,1,0,1,0,1,0,1]
spot1 = [1,0,1,0,1,0,1,1,1]
spot2 = [0,1,0,1,0,1,0,1,0]
poleU = [1,0,1,1,0,1,1,0,1]
poleS = [1,1,1,0,0,0,1,1,1]
diag1 = [0,1,1,1,0,1,1,1,0]
diag2 = [1,1,0,1,0,1,0,1,1]
//Corners
doub1 = [0,1,1,1,0,1,1,1,1]
doub2 = [1,0,1,0,1,1,1,1,1]
doub3 = [1,1,1,1,0,1,0,1,1]
doub4 = [1,1,1,1,1,0,1,0,1]
doub5 = [1,1,1,1,0,1,1,1,0]
doub6 = [1,1,1,1,1,0,1,0,1]
doub7 = [1,1,0,1,0,1,1,1,1]
doub8 = [1,0,1,0,1,1,1,1,1]
tlCor = [doub1,doub2]
trCor = [doub3,doub4]
brCor = [doub5,doub6]
blCor = [doub7,doub8]
corners = [tlCor,trCor,blCor,brCor]

//Settings
size = [640,480]
mapSize = [100,100]
cellSize = [size[0]/mapSize[0],size[1]/mapSize[1]]
mountain = 10

lister = []
function setup() {
  createCanvas(size[0],size[1])
  //noLoop()
  //frameRate(30)
  lister = gen4();
  console.log("Draw");
  console.log(lister);
}
x = 0
y = 0
function draw() {
  // stroke(color('red'))
  // theFind = finding(x,y,lister)
  // sum = 0
  // for (var i = 0; i < theFind.length; i++) {
  //   if(theFind[i] == 0){
  //     sum++
  //   }
  // }
  // if(sum<3){
  //   noFill()
  //   stroke(color('red'))
  //   rect(x*cellSize[0],y*cellSize[1],cellSize[0],cellSize[1])
  // }
  //
  //
  // x++
  // if(x>mapSize[0]){
  //   x = 0
  //   y++
  // }
  // if(y>mapSize[1]){
  //   noLoop()
  // }

  for (var a = 0; a < lister.length; a++) {
    for (var x = 0; x < lister[a].length; x++) {
      for (var y = 0; y < lister[a][x].length; y++) {
        if(lister[a][x][y]<1){
          fill(lister[a][x][y]*255)
          stroke(lister[a][x][y]*255)
          rect(x*cellSize[0],y*cellSize[1],cellSize[0],cellSize[1])
        }
      }
    }

  }
}

function finding(x,y,map) {
  find = []
  for(var xD = -1; xD<=1; xD++){
    for(var yD = -1; yD<=1; yD++){
      if( xD+x<0 || xD+x>=map.length || yD+y<0 || yD+y>=map[0].length ){
        find.push(1)
      }else{
        find.push(map[xD+x][yD+y])
      }
    }
  }
  return find
}
function check(finding,test) {
  flag = true;
  for (var i = 0; i < finding.length; i++) {
    if(finding[i] != test[i]){
      flag = false;
      break;
    }
  }
  return flag;
}

function gen4() {
  path = []
  //map
  mapList = []
  //Value that must be beat for land
  chance = 0.9

  //Fill map with 0 & 1
  console.log("0");
  for (var x = 0; x<mapSize[0];x++){
    mapList.push([])
    for (var y = 0; y<mapSize[1];y++){
      if (random()>chance) {
        mapList[x].push(0);
      }else {
        mapList[x].push(1)
      }
    }
  }
  path.push(mapList)

  //Cleaning
  console.log("1");
  for(x = 0; x<mapSize[0];x++){
    for(var y = 0; y<mapSize[1];y++){
      find = finding(x,y,mapList)
      if(check(find,single)){
        mapList[x][y] = 1
      }else if (check(find,spot1)) {
        mapList[x-1][y-1] = 0
        mapList[x+1][y-1] = 0
        mapList[x][y] = 0
      }else if (check(find,spot2)) {
        mapList[x-1][y-1] = 0
        mapList[x+1][y-1] = 0
        mapList[x][y] = 0
        mapList[x-1][y+1] = 0
        mapList[x+1][y+1] = 0
      }else if (check(find,poleU)) {
        try {
          mapList[x][y-1] = 0
        }finally{
          try{
            mapList[x][y+1] = 0
          }finally{}
        }
      }else if (check(find,poleS)) {
        try {
          mapList[x-1][y] = 0
        }finally{
          try{
            mapList[x+1][y] = 0
          }finally{}
        }
      }else if (check(find,diag1)) {
        mapList[x-1][y-1] = 1
        mapList[x][y] = 1
        mapList[x+1][y+1] = 1
      }else if (check(find,diag2)) {
        mapList[x+1][y-1] = 1
        mapList[x][y] = 1
        mapList[x-1][y+1] = 1
      }else {
        cor = 0
        for (var i = 0; i < corners.length; i++) {
          for (var o = 0; o < corners[i].length; o++) {
            if(check(find,corners[i][o])){
              cor = i+1
              break
            }
          }
        }
        if(cor == 1){
          mapList[x-1][y-1] = 0
          mapList[x-1][y] = 0
          mapList[x][y] = 0
          mapList[x][y-1] = 0
        }else if (cor == 2) {
          mapList[x+1][y-1] = 0
          mapList[x][y-1] = 0
          mapList[x+1][y] = 0
          mapList[x][y] = 0
        }else if (cor == 3) {
          mapList[x-1][y+1] = 0
          mapList[x][y+1] = 0
          mapList[x-1][y] = 0
          mapList[x][y] = 0
        }else if (cor == 4) {
          mapList[x+1][y+1] = 0
          mapList[x+1][y] = 0
          mapList[x][y] = 0
          mapList[x][y+1] = 0
        }
      }
    }
  }
  path.push(mapList)

  console.log("2");
  for(var h = 0; h<mountain; h++){
    tem = mapList;
    for(x = 0; x<mapSize[0];x++){
      for(var y = 0; y<mapSize[1];y++){
        find = finding(x,y,mapList)
        sum = 0
        for (var i = 0; i < find.length; i++) {
          if(find[i] == 0){
            sum++
          }
        }
        if (sum<3) {
          tem[x][y] = 1
        }
      }
    }
    path.push(mapList)
    mapList = tem;
  }

  console.log("3");
  // for(var black = 0; black<=1 ;black = black + 0.1){
  //   console.log(black);
  //   for(x = 0; x<mapSize[0];x++){
  //     for(var y = 0; y<mapSize[1];y++){
  //       find = finding(x,y,mapList)
  //       sum = 0
  //       for (var i = 0; i < find.length; i++) {
  //         if(find[i] == 0){
  //           sum++
  //         }
  //       }
  //       if (sum>3) {
  //         mapList[x][y] = black
  //       }
  //     }
  //   }
  // }


  //Draw the 0s
  console.log("4");
  // for(var x = 0; x<mapSize[0];x++){
  //   for(var y = 0; y<mapSize[1];y++){
  //     fill(mapList[x][y]*255)
  //     stroke(mapList[x][y]*255)
  //     rect(x*cellSize[0],y*cellSize[1],cellSize[0],cellSize[1])
  //   }
  // }
  return path
}

function fullColor() {
  for (var c = 0; c<51;c++){
    stroke(c*5)
    fill(c*5)
    console.log(c*5);
    rect(12.5*c,0,12.5,480)
   }
}
function gen1(){
  for(var x = 0; x<320;x++){
    xRan.push(random(128))
  }
  for(var y = 0; y<240;y++){
    yRan.push(random(128))
  }
  for (x = 0; x < 320;x++){
    for(y = 0; y < 240; y++){
      fill(xRan[x]+yRan[y])
      square(x*2,y*2,2)
    }
  }
}
function gen2(){
  x = 0
  xRan.push(64)
  yRan.push(xRan[0])
  while (x<320){
    time = Math.floor(random(3,11))
    dir = Math.floor(random(-10,11))
    c = 0
    while (c<=time && x < 320){
      change = Math.floor(random(2,10))
      if(dir < -5){
        xRan.push(xRan[x]-change)
      }else if(dir >=-5 && dir <=5){
        xRan.push(xRan[x]+Math.floor(random(-1,2)))
      }else if(dir > 5){
        xRan.push(xRan[x]-change)
      }
      c++
      x++
    }
  }
  x = 0
  while (x<240){
    time = Math.floor(random(3,11))
    dir = Math.floor(random(-1,2))
    c = 0
    while (c<=time && x < 240){
      change = Math.floor(random(2,10))
      if(dir < -5){
        yRan.push(yRan[x]-change)
      }else if(dir >=-5 && dir <=5){
        yRan.push(yRan[x]+Math.floor(random(-1,2)))
      }else if(dir > 5){
        yRan.push(yRan[x]-change)
      }
      c++
      x++
    }
  }
  for (x = 0; x < 320;x++){
    for(y = 0; y < 240; y++){
      fill(xRan[x]+yRan[y])
      square(x*2,y*2,2)
    }
  }
}
function gen3() {
  //Generate map
  offset = 128
  xRan[0] = 0
  yRan[0] = 0
  for (var x = 1; x < mapSize[0]; x++) {
    xRan.push(xRan[x-1]+Math.floor(random(-10,11)))
    while (xRan[x]+offset<0 || xRan[x]+offset>255){
      xRan[x] = xRan[x-1]+Math.floor(random(-10,11))
    }
  }
  for (var y = 1; y<mapSize[1];y++){
    yRan.push(yRan[y-1]+Math.floor(random(-10,11)))
    while (yRan[y]+offset<0 || yRan[y]+offset>255){
      yRan[x] = yRan[y-1]+Math.floor(random(-10,11))
    }
  }


  //Drawing the map
  for(var y = 0; y<mapSize[1]; y++){
    for (var x = 0; x < mapSize[0];x++) {
      if(xRan[x]+yRan[y]+offset>offset+0.5*offset){
        fill(color('#898a8c'))
        stroke(color('#898a8c'))
      }else if(xRan[x]+yRan[y]+offset>offset){
        fill(color('#02a607'))
        stroke(color('#02a607'))
      }else if(xRan[x]+yRan[y]+offset>offset-0.5*offset) {
        fill(color('#0796f5'))
        stroke(color('#0796f5'))
      }else{
        fill(color('#0263a3'))
        stroke(color('#0263a3'))
      }
      rect(x*cellSize[0],y*cellSize[1],cellSize[0],cellSize[1]);
    }
  }
}
