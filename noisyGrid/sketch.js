var stepSize = 20

function setup() {
  createCanvas(500, 500)
}
///////////////////////////////////////////////////////////////////////
function draw() {
  background(125)
  colorGrid()
  compassGrid()
}
///////////////////////////////////////////////////////////////////////
function colorGrid() {
  var noiseVal, lerpColorVal
  // color value setup
  var fromColor = color(255, 0, 50)
  var toColor = color(100, 255, 200)
  // rectangle grid setup
  for (let i = 0; i < width; i += stepSize) {
    for (let j = 0; j < height; j += stepSize) {
      speed = 50 / mouseX
      // noise value setup for each rectangle
      noiseVal = noise(i * 0.0015, j * 0.0015, frameCount * 0.01 * speed)
      lerpColorVal = lerpColor(fromColor, toColor, noiseVal)
      fill(lerpColorVal)
      noStroke()
      rect(i, j, stepSize)
    }
  }
}
///////////////////////////////////////////////////////////////////////
function compassGrid() {
  fill(255)
  strokeWeight(3)
  var speed, angle, noiseVal, lerpColorVal, lineSize
  // color value setup
  var fromColor = color(0, 0, 50)
  var toColor = color(50, 0, 255)
  // line grid setup
  for (let i = 0; i < width; i += stepSize) {
    for (let j = 0; j < height; j += stepSize) {
      push()
      speed = 50 / mouseX
      // noise value setup for each line
      noiseVal = noise(i * 0.0015, j * 0.0015, frameCount * 0.01 * speed)
      // angle, color, and line size setup for each line
      angle = map(noiseVal, 0, 1, 0, TWO_PI * 4)
      lerpColorVal = lerpColor(fromColor, toColor, noiseVal)
      lineSize = map(noiseVal, 0, 1, 0, 20)
      stroke(lerpColorVal)

      // translating line to center of rectangle
      translate(i + stepSize / 2, j + stepSize / 2)
      rotate(angle, i, j)
      line(0, 0, lineSize, 0)
      pop()
    }
  }
}
