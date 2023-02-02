var imgs = []
var avgImg
var numOfImages = 30
var randomNum = 0
var randomImgColor
var avgImgColor

//////////////////////////////////////////////////////////
function preload() {
  // preload() runs once
  for (var i = 0; i < numOfImages; i++) {
    let filename = 'assets/' + i + '.jpg'
    let img = loadImage(filename)
    imgs.push(img)
  }
}
//////////////////////////////////////////////////////////
function setup() {
  frameRate(5)
  colorMode(RGB)
  randomImgColor = color(255, 0, 0)
  avgImgColor = color(255, 255, 0)

  createCanvas(imgs[0].width * 2, imgs[0].height)
  pixelDensity(1)
  avgImg = createGraphics(imgs[0].width, imgs[0].height)
  avgImg.loadPixels()

  imgs.forEach((img) => {
    img.loadPixels()
  })
}
//////////////////////////////////////////////////////////
function draw() {
  background(125)
  image(imgs[randomNum], 0, 0)
  averageFace()

  fill(lerpColor(randomImgColor, avgImgColor, 0.5))
  circle(mouseX + 20, mouseY, 20)
  noLoop()
}

function averageFace() {
  for (var i = 0; i < imgs[0].height; i++) {
    for (var j = 0; j < imgs[0].width; j++) {
      let sumR = 0
      let sumG = 0
      let sumB = 0
      let index = (imgs[0].width * i + j) * 4

      imgs.forEach((img) => {
        sumR += img.pixels[index + 0]
        sumG += img.pixels[index + 1]
        sumB += img.pixels[index + 2]
      })
      avgImg.pixels[index + 0] = sumR / imgs.length
      avgImg.pixels[index + 1] = sumG / imgs.length
      avgImg.pixels[index + 2] = sumB / imgs.length
      avgImg.pixels[index + 3] = 255
    }
  }

  avgImg.updatePixels()
  image(avgImg, avgImg.width, 0)
}

function keyPressed() {
  randomNum = int(random(0, numOfImages))
  console.log(randomNum)
  loop()
}

function mouseMoved() {
  if (mouseX <= width && mouseY <= height) {
    if (mouseX <= width / 2) {
      randomImgColor = color(...get(mouseX, mouseY))

      avgImgColor = color(...get(mouseX + width / 2, mouseY))
    } else {
      randomImgColor = color(...get(mouseX - width / 2, mouseY))
      avgImgColor = color(...get(mouseX, mouseY))
    }
    loop()
  }
}
