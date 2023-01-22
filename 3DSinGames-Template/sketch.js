var boxSide = 50
var noBoxes = 16
var lengthMin = 100
var lengthMax = 300
var noConfetties = 200
var planeSize = 15
var confLocs = []
var confTheta = []
var frameCountVal = 30
var cameraSpeed = 1
var waveSpeed = 1

var boxSideSlider,
  noBoxesSlider,
  lengthMinSlider,
  lengthMaxSlider,
  noConfettiesSlider,
  planeSizeSlider,
  frameCountSlider

var cubeMaterial = 'specularMaterial'
var confettiMaterial = 'normalMaterial'

function setup() {
  createCanvas(800, 800, WEBGL)
  frameRate(frameCountVal)
  angleMode(DEGREES)

  for (var i = 0; i < noConfetties; i++) {
    let x = random(-500, 500)
    let y = random(-800, 0)
    let z = random(-500, 500)
    let angle = random(0, 360)
    newConfettiPlane = new createVector(x, y, z)
    confLocs.push(newConfettiPlane)
    confTheta.push(angle)
  }

  dat = new dat.GUI()
  dat.add(this, 'cubeMaterial', [
    'specularMaterial',
    'normalMaterial',
    'emissiveMaterial',
    'ambientMaterial',
  ])
  dat.add(this, 'confettiMaterial', [
    'specularMaterial',
    'normalMaterial',
    'emissiveMaterial',
    'ambientMaterial',
  ])

  dat.add(this, 'boxSide', 10, 100)
  dat.add(this, 'noBoxes', 1, 25)
  dat.add(this, 'lengthMin', 10, 200)
  dat.add(this, 'lengthMax', 200, 400)
  dat.add(this, 'planeSize', 1, 100)
  dat.add(this, 'cameraSpeed', 0, 10)
  dat.add(this, 'waveSpeed', 0, 10)
}

function preload() {
  font = loadFont('assets/Inconsolata.ttf')
}

function draw() {
  background(125)

  if (cubeMaterial === 'specularMaterial') {
    ambientLight(60, 125, 60)
    pointLight(255, 255, 255, mouseX - width / 2, mouseY - height / 2, 50)
    specularMaterial(250)
    shininess(50)
  } else if (cubeMaterial === 'normalMaterial') {
    normalMaterial()
  } else if (cubeMaterial === 'emissiveMaterial') {
    ambientLight(0)
    emissiveMaterial(130, 230, 0)
  } else if (cubeMaterial === 'ambientMaterial') {
    ambientLight(255, 0, 255) // magenta light
    ambientMaterial(255) // white material
  }

  var locX =
    800 * cos((frameCount / (frameCountVal / 10)) * cameraSpeed) * Math.sqrt(2)
  var locZ =
    800 * sin((frameCount / (frameCountVal / 10)) * cameraSpeed) * Math.sqrt(2)
  camera(locX, -600, locZ, 0, 0, 0, 0, 1, 0)

  stroke(2)

  boxGrid()
  confetti()
}

const boxGrid = () => {
  gridStart = (-boxSide * noBoxes) / 2
  gridEnd = (boxSide * noBoxes) / 2
  for (var j = gridStart; j <= gridEnd; j += boxSide) {
    for (var i = gridStart; i <= gridEnd; i += boxSide) {
      push()
      translate(j, 0, i)
      const distance = dist(i, j, 0, 0)
      let length = map(
        sin(distance + frameCount * waveSpeed),
        -1,
        1,
        lengthMin,
        lengthMax
      )
      box(boxSide, length, boxSide)
      pop()
    }
  }
}

function confetti() {
  noStroke()

  if (confettiMaterial === 'specularMaterial') {
    ambientLight(60, 125, 60)
    pointLight(255, 255, 255, mouseX - width / 2, mouseY - height / 2, 50)
    specularMaterial(250)
    shininess(50)
  } else if (confettiMaterial === 'normalMaterial') {
    normalMaterial()
  } else if (confettiMaterial === 'emissiveMaterial') {
    ambientLight(0)
    emissiveMaterial(130, 230, 0)
  } else if (confettiMaterial === 'ambientMaterial') {
    ambientLight(255, 0, 255) // magenta light
    ambientMaterial(255) // white material
  }

  for (var i = 0; i < confLocs.length; i++) {
    push()
    translate(confLocs[i])
    rotateX(confTheta[i])
    plane(planeSize, planeSize)
    confLocs[i].y += 1
    confTheta[i] += 10

    if (confLocs[i].y >= 0) {
      confLocs[i].y = -800
    }

    pop()
  }
}
