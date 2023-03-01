var imgs = []
var avgImg
var numOfImages = 30
var randomNum = 0
var randomImgColor
var avgImgColor
var lastMouseX = 0

//////////////////////////////////////////////////////////
function preload() {
  // preload all images into imgs array
  for (var i = 0; i < numOfImages; i++) {
    let filename = 'assets/' + i + '.jpg'
    let img = loadImage(filename)
    imgs.push(img)
  }
}
//////////////////////////////////////////////////////////
function setup() {
  frameRate(30)
  colorMode(RGB)
  randomImgColor = color(255, 0, 0)
  avgImgColor = color(255, 255, 0)

  createCanvas(imgs[0].width * 2, imgs[0].height)
  pixelDensity(1)
  // create a new graphics to store the average
  avgImg = createGraphics(imgs[0].width, imgs[0].height)
  avgImg.loadPixels()

  imgs.forEach((img) => {
    img.loadPixels()
  })
  let preavgFace = averageFace()
}

//////////////////////////////////////////////////////////
function draw() {
  background(125)
  // select a random image
  image(imgs[randomNum], 0, 0)
  averageFace()
}

//////////////////////////////////////////////////////////
function averageFace() {
  for (var i = 0; i < imgs[0].height; i++) {
    for (var j = 0; j < imgs[0].width; j++) {
      let sumR = 0
      let sumG = 0
      let sumB = 0
      // calculate the index of the pixel in the array
      let index = (imgs[0].width * i + j) * 4

      // loop through all images and add the values
      imgs.forEach((img) => {
        sumR += img.pixels[index + 0]
        sumG += img.pixels[index + 1]
        sumB += img.pixels[index + 2]
      })
      // calculate the max X value based on the mouse position
      let maxX = mouseX <= width ? mouseX : width
      // calculate the average value of the pixels
      let lerpRatio = map(maxX, 0, width, 0, 1)
      avgImg.pixels[index + 0] = lerp(
        imgs[randomNum].pixels[index + 0],
        sumR / imgs.length,
        lerpRatio
      )
      avgImg.pixels[index + 1] = lerp(
        imgs[randomNum].pixels[index + 1],
        sumG / imgs.length,
        lerpRatio
      )
      avgImg.pixels[index + 2] = lerp(
        imgs[randomNum].pixels[index + 2],
        sumB / imgs.length,
        lerpRatio
      )
      avgImg.pixels[index + 3] = 255
    }
  }

  // update the pixels
  avgImg.updatePixels()
  return image(avgImg, avgImg.width, 0)
}

// When key pressed change the random image
function keyPressed() {
  randomNum = int(random(0, numOfImages))
  loop()
}
