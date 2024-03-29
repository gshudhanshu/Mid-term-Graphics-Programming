// Image of Husky Creative commons from Wikipedia:
// https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg
var imgIn
var currentFilter = 1
var thresholdSlider

var matrix = [
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
]
/////////////////////////////////////////////////////////////////
function preload() {
  imgIn = loadImage('assets/husky.jpg')
}
/////////////////////////////////////////////////////////////////
function setup() {
  createCanvas(imgIn.width * 2, imgIn.height)
  // thresholdFilter slider
  thresholdSlider = createSlider(0, 255, 110)
  thresholdSlider.position(120, 75)
}
/////////////////////////////////////////////////////////////////
function draw() {
  background(125)
  image(imgIn, 0, 0)

  // instruction text
  instructions()

  thresholdSlider.hide()
  // apply filter based on key press (1-5)
  switch (currentFilter) {
    case 1:
      image(earlyBirdFilter(imgIn), imgIn.width, 0)
      break
    case 2:
      image(invertFilter(imgIn), imgIn.width, 0)
      break
    case 3:
      thresholdSlider.show()
      image(thresholdFilter(imgIn), imgIn.width, 0)
      break
    case 4:
      image(greyscaleFilter(imgIn), imgIn.width, 0)
      break
    case 5:
      image(sharpen(imgIn), imgIn.width, 0)
      break
    default:
      image(earlyBirdFilter(imgIn), imgIn.width, 0)
  }

  noLoop()
}

// Instruction text
function instructions() {
  textSize(18)
  var posX = 50
  text('Press a number to apply a filter:', 10, posX - 20)
  text(
    '1: Early Bird (Set blur center using left-click on left side image)',
    10,
    posX + 0
  )
  text('2: Invert', 10, posX + 20)
  text('3: Threshold', 10, posX + 40)
  text('4: Greyscale', 10, posX + 60)
  text('5: Sharpen', 10, posX + 80)
}

/////////////////////////////////////////////////////////////////

function keyPressed() {
  if (keyCode === 49) {
    // key 1
    currentFilter = 1
  } else if (keyCode === 50) {
    // key 2
    currentFilter = 2
  } else if (keyCode === 51) {
    // key 3
    currentFilter = 3
  } else if (keyCode === 52) {
    // key 4
    currentFilter = 4
  } else if (keyCode === 53) {
    // key 5
    currentFilter = 5
  }
  loop()
}

/////////////////////////////////////////////////////////////////
function mousePressed() {
  loop()
}
/////////////////////////////////////////////////////////////////

// Early Bird filter
// Combination of multiple filters
function earlyBirdFilter(img) {
  var resultImg = createImage(imgIn.width, imgIn.height)
  resultImg = sepiaFilter(imgIn)
  resultImg = darkCorners(resultImg)
  resultImg = radialBlurFilter(resultImg)
  resultImg = borderFilter(resultImg)
  return resultImg
}

// Sepia filter
function sepiaFilter(img) {
  var resultImg = createImage(imgIn.width, imgIn.height)
  img.loadPixels()
  resultImg.loadPixels()
  // loop through all pixels
  for (var i = 0; i < img.pixels.length; i += 4) {
    var oldRed = img.pixels[i]
    var oldGreen = img.pixels[i + 1]
    var oldBlue = img.pixels[i + 2]
    var a = img.pixels[i + 3]

    // calculate new values for sepia filter
    newRed = oldRed * 0.393 + oldGreen * 0.769 + oldBlue * 0.189
    newGreen = oldRed * 0.349 + oldGreen * 0.686 + oldBlue * 0.168
    newBlue = oldRed * 0.272 + oldGreen * 0.534 + oldBlue * 0.131

    resultImg.pixels[i] = newRed
    resultImg.pixels[i + 1] = newGreen
    resultImg.pixels[i + 2] = newBlue
    resultImg.pixels[i + 3] = a
  }
  // update pixels
  resultImg.updatePixels()
  return resultImg
}

// Dark corners filter
function darkCorners(img) {
  var resultImg = createImage(imgIn.width, imgIn.height)
  img.loadPixels()
  resultImg.loadPixels()
  for (var w = 0; w < img.width; w++) {
    for (var h = 0; h < img.height; h++) {
      //calculate index of pixel array for current pixel
      var index = (w + h * img.width) * 4
      var r = img.pixels[index]
      var g = img.pixels[index + 1]
      var b = img.pixels[index + 2]
      var a = img.pixels[index + 3]

      // calculate distance from center
      var distance = dist(w, h, resultImg.width / 2, resultImg.height / 2)
      var maxDistance = dist(0, 0, resultImg.width / 2, resultImg.height / 2)

      // calculate dynamic luminance based on distance
      var dynLum = 1
      if (distance > 300 && distance <= 450) {
        dynLum = map(distance, 300, 450, 1, 0.4)
      } else if (distance > 450) {
        dynLum = map(distance, 450, maxDistance, 0.4, 0)
      }
      dynLum = constrain(dynLum, 0, 1)

      // apply dynamic luminance
      r *= dynLum
      g *= dynLum
      b *= dynLum

      resultImg.pixels[index] = r
      resultImg.pixels[index + 1] = g
      resultImg.pixels[index + 2] = b
      resultImg.pixels[index + 3] = a
    }
  }
  resultImg.updatePixels()
  return resultImg
}

// Radial blur filter
function radialBlurFilter(img) {
  var matrixSize = matrix.length
  var resultImg = createImage(imgIn.width, imgIn.height)
  img.loadPixels()
  resultImg.loadPixels()

  for (var w = 0; w < img.width; w++) {
    for (var h = 0; h < img.height; h++) {
      //calculate index of pixel array for current pixel
      var index = (w + h * img.width) * 4
      // calculate calculate convolution
      var c = convolution(w, h, matrix, matrixSize, img)
      var dynBlur = map(dist(mouseX, mouseY, w, h), 100, 300, 0, 1)
      dynBlur = constrain(dynBlur, 0, 1)
      // get current pixel values
      var r = img.pixels[index]
      var g = img.pixels[index + 1]
      var b = img.pixels[index + 2]
      var a = img.pixels[index + 3]
      // apply dynamic blur
      r = c[0] * dynBlur + r * (1 - dynBlur)
      g = c[1] * dynBlur + g * (1 - dynBlur)
      b = c[2] * dynBlur + b * (1 - dynBlur)
      // set new pixel values
      resultImg.pixels[index] = r
      resultImg.pixels[index + 1] = g
      resultImg.pixels[index + 2] = b
      resultImg.pixels[index + 3] = a
    }
  }
  resultImg.updatePixels()
  return resultImg
}

function convolution(x, y, matrix, matrixSize, img) {
  var totalRed = 0.0
  var totalGreen = 0.0
  var totalBlue = 0.0
  var offset = floor(matrixSize / 2)

  // convolution matrix loop
  for (var i = 0; i < matrixSize; i++) {
    for (var j = 0; j < matrixSize; j++) {
      // Get pixel loc within convolution matrix
      var xloc = x + i - offset
      var yloc = y + j - offset
      var index = (xloc + img.width * yloc) * 4
      // ensure we don't address a pixel that doesn't exist
      index = constrain(index, 0, img.pixels.length - 1)

      // multiply all values with the mask and sum up
      totalRed += img.pixels[index + 0] * matrix[i][j]
      totalGreen += img.pixels[index + 1] * matrix[i][j]
      totalBlue += img.pixels[index + 2] * matrix[i][j]
    }
  }
  // return the new color
  return [totalRed, totalGreen, totalBlue]
}

// Border filter
function borderFilter(img) {
  var buffer = createGraphics(img.width, img.height)
  buffer.fill(255)
  buffer.rect(0, 0, buffer.width, buffer.height)
  buffer.image(img, 0, 0)
  buffer.noFill()
  buffer.stroke(255)
  buffer.strokeWeight(40)
  buffer.rect(0, 0, buffer.width, buffer.height, 40, 40, 40, 40)
  return buffer
}

// Invert filter
function invertFilter(img) {
  imgOut = createImage(img.width, img.height)

  imgOut.loadPixels()
  img.loadPixels()

  for (var x = 0; x < imgOut.width; x++) {
    for (var y = 0; y < imgOut.height; y++) {
      var index = (x + y * imgOut.width) * 4

      // subtracting the pixel value from 255 to inverts the color
      var r = 255 - img.pixels[index + 0]
      var g = 255 - img.pixels[index + 1]
      var b = 255 - img.pixels[index + 2]

      // set the inverted color
      imgOut.pixels[index + 0] = r
      imgOut.pixels[index + 1] = g
      imgOut.pixels[index + 2] = b
      imgOut.pixels[index + 3] = 255
    }
  }
  imgOut.updatePixels()
  return imgOut
}

// Greyscale filter
function greyscaleFilter(img) {
  var imgOut = createImage(img.width, img.height)
  imgOut.loadPixels()
  img.loadPixels()

  for (x = 0; x < imgOut.width; x++) {
    for (y = 0; y < imgOut.height; y++) {
      var index = (x + y * imgOut.width) * 4

      var r = img.pixels[index + 0]
      var g = img.pixels[index + 1]
      var b = img.pixels[index + 2]

      // calculate the average of the three colors
      // to get the greyscale value
      var gray = (r + g + b) / 3 // simple
      // var gray = r * 0.299 + g * 0.587 + b * 0.114; // LUMA ratios

      imgOut.pixels[index + 0] =
        imgOut.pixels[index + 1] =
        imgOut.pixels[index + 2] =
          gray
      imgOut.pixels[index + 3] = 255
    }
  }
  imgOut.updatePixels()
  return imgOut
}

// Threshold filter
function thresholdFilter(img) {
  var imgOut = createImage(img.width, img.height)
  imgOut.loadPixels()
  img.loadPixels()

  for (x = 0; x < imgOut.width; x++) {
    for (y = 0; y < imgOut.height; y++) {
      var index = (x + y * imgOut.width) * 4

      var r = img.pixels[index + 0]
      var g = img.pixels[index + 1]
      var b = img.pixels[index + 2]

      var bright = (r + g + b) / 3 // simple
      // var bright = 0.3 * r + 0.59 * g + 0.11 * b; // LUMA ratios

      // get the threshold value from the slider and map it to 0-255
      var threshold = thresholdSlider.value()
      // if the pixel is brighter than the threshold, set it to white
      if (bright > threshold) {
        imgOut.pixels[index + 0] = 255
        imgOut.pixels[index + 1] = 255
        imgOut.pixels[index + 2] = 255
        imgOut.pixels[index + 3] = 255
      }
      // if the pixel is darker than the threshold, set it to black
      else {
        imgOut.pixels[index + 0] = 0
        imgOut.pixels[index + 1] = 0
        imgOut.pixels[index + 2] = 0
        imgOut.pixels[index + 3] = 255
      }
    }
  }
  imgOut.updatePixels()
  return imgOut
}

// Sharpen filter
function sharpen(img) {
  var imgOut = createImage(img.width, img.height)
  // the convolution matrix for sharpening
  var matrix = [
    [-1, -1, -1],
    [-1, 9, -1],
    [-1, -1, -1],
  ]
  var matrixSize = matrix.length

  imgOut.loadPixels()
  img.loadPixels()

  // read every pixel
  for (var x = 0; x < imgOut.width; x++) {
    for (var y = 0; y < imgOut.height; y++) {
      var index = (x + y * imgOut.width) * 4
      // apply the convolution matrix
      var c = convolution(x, y, matrix, matrixSize, img)

      imgOut.pixels[index + 0] = c[0]
      imgOut.pixels[index + 1] = c[1]
      imgOut.pixels[index + 2] = c[2]
      imgOut.pixels[index + 3] = 255
    }
  }
  imgOut.updatePixels()
  return imgOut
}

// Edge detection filter
function edgeDetectionFilter(img) {
  var imgOut = createImage(img.width, img.height)
  var matrixSize = matrixX.length

  imgOut.loadPixels()
  img.loadPixels()

  // read every pixel
  for (var x = 0; x < imgOut.width; x++) {
    for (var y = 0; y < imgOut.height; y++) {
      var index = (x + y * imgOut.width) * 4
      // apply the convolution matrix for horizontal edges
      var cX = convolution(x, y, matrixX, matrixSize, img)
      // apply the convolution matrix for vertical edges
      var cY = convolution(x, y, matrixY, matrixSize, img)

      // calculate the magnitude of the edge
      cX = map(abs(cX[0]), 0, 1020, 0, 255)
      cY = map(abs(cY[0]), 0, 1020, 0, 255)
      var combo = cX + cY

      imgOut.pixels[index + 0] = combo
      imgOut.pixels[index + 1] = combo
      imgOut.pixels[index + 2] = combo
      imgOut.pixels[index + 3] = 255
    }
  }
  imgOut.updatePixels()
  return imgOut
}
