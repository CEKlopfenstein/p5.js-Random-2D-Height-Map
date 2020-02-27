function topCamera() {
  camera(canvasSize[0]/2, -300, (height/2) / tan(PI*30.0 / 180.0)+200, canvasSize[0]/2, canvasSize[1]/2, highestPoint/2, 0, -1, 0);
}
function testCamera() {
  camera(canvasSize[0]*1.3, -canvasSize[1]*0.3, 370, canvasSize[0]/2, canvasSize[1]/2, highestPoint/2, 0, 0, -1);
}
function bottomRightPointCam() {
  camera(canvasSize[0]*1.3, canvasSize[1]*1.3, 370, canvasSize[0]/2, canvasSize[1]/2, highestPoint/2, 0, 0, -1);
}
function topLeftPointCam() {
  camera(-canvasSize[0]*0.3, -canvasSize[1]*0.3, 370, canvasSize[0]/2, canvasSize[1]/2, highestPoint/2, 0, 0, -1);
}
function bottomLeftPointCam() {
  camera(-canvasSize[0]*0.3, canvasSize[1]*1.3, 370, canvasSize[0]/2, canvasSize[1]/2, highestPoint/2, 0, 0, -1);
}
function topRightPointCam() {
  camera(canvasSize[0]*1.3, -canvasSize[1]*0.3, 370, canvasSize[0]/2, canvasSize[1]/2, highestPoint/2, 0, 0, -1);
}
