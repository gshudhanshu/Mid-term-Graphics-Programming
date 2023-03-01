// ********************************
// BACKGROUND SUBTRACTION EXAMPLE *
// ********************************
var video
var prevImg
var diffImg
var currImg
var thresholdSlider
var grid
var gui

// JS Object to hold GUI parameters
var params = {
  threshold: 40,
  noteSize: 40,
  color1: [255, 0, 125],
  color2: [0, 128, 255],
  soundOn: false,
}

function setup() {
  createCanvas(640 * 2, 480)
  pixelDensity(1)
  // capture video from webcam
  video = createCapture(VIDEO)
  video.hide()

  grid = new Grid(640, 480)
  threshold = 25
  gui = new dat.GUI()
  setupGUI()
  // start the app without sound. User can turn it on later
  getAudioContext().suspend()
}

function draw() {
  background(0)
  image(video, 0, 0)
  currImg = createImage(video.width, video.height)

  currImg.copy(
    video,
    0,
    0,
    video.width,
    video.height,
    0,
    0,
    video.width,
    video.height
  )

  // resize and blur image to speed up processing
  currImg.resize(currImg.width / 4, currImg.height / 4)
  currImg.filter(BLUR, 3)

  // find the difference between the current and previous frame
  diffImg = createImage(video.width, video.height)
  diffImg.resize(diffImg.width / 4, diffImg.height / 4)
  diffImg.loadPixels()

  // if there is a previous frame, compare it to the current frame
  if (typeof prevImg !== 'undefined') {
    prevImg.loadPixels()
    currImg.loadPixels()
    for (var x = 0; x < currImg.width; x += 1) {
      for (var y = 0; y < currImg.height; y += 1) {
        // get the pixel index for the current pixel.
        var index = (x + y * currImg.width) * 4
        // get the red, green, and blue values from the current pixel
        var redSource = currImg.pixels[index + 0]
        var greenSource = currImg.pixels[index + 1]
        var blueSource = currImg.pixels[index + 2]
        // get the red, green, and blue values from the previous frame at the same location
        var redBack = prevImg.pixels[index + 0]
        var greenBack = prevImg.pixels[index + 1]
        var blueBack = prevImg.pixels[index + 2]

        // calculate the difference between the two pixels
        var d = dist(
          redSource,
          greenSource,
          blueSource,
          redBack,
          greenBack,
          blueBack
        )

        // if the difference is greater than the threshold, draw a white pixel
        if (d > params.threshold) {
          diffImg.pixels[index + 0] = 0
          diffImg.pixels[index + 1] = 0
          diffImg.pixels[index + 2] = 0
          diffImg.pixels[index + 3] = 255
        }
        // otherwise, draw a black pixel
        else {
          diffImg.pixels[index + 0] = 255
          diffImg.pixels[index + 1] = 255
          diffImg.pixels[index + 2] = 255
          diffImg.pixels[index + 3] = 255
        }
      }
    }
  }
  diffImg.updatePixels()
  image(diffImg, 640, 0)

  prevImg = createImage(currImg.width, currImg.height)
  prevImg.copy(
    currImg,
    0,
    0,
    currImg.width,
    currImg.height,
    0,
    0,
    currImg.width,
    currImg.height
  )

  grid.run(diffImg)
}

// faster method for calculating color similarity which does not calculate root.
// Only needed if dist() runs slow
function distSquared(x1, y1, z1, x2, y2, z2) {
  var d = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1) + (z2 - z1) * (z2 - z1)
  return d
}

// gui setup
function setupGUI() {
  var obj = {
    add: function () {
      console.log('clicked')
    },
  }
  gui.add(params, 'threshold', 0, 255)
  gui.addColor(params, 'color1')
  gui.addColor(params, 'color2')
  gui.add(params, 'soundOn', 0, 1).onChange(function (value) {
    value == 1 ? userStartAudio() : getAudioContext().suspend()
  })
}
