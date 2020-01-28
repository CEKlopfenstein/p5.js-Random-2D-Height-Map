function initDraw() {
  noFill();
  stroke(0);
  strokeWeight(1);
  rect(canvasSize[0]/2-50,canvasSize[1]/2-5,100,10);
  textSize(24);
  fill(0);
  text("Terrain Generation Starting",canvasSize[0]/2-140,canvasSize[1]/2-10);
  textSize(12);
  text("0% Complete",canvasSize[0]/2+55,canvasSize[1]/2+5);
}
