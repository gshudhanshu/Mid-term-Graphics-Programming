//////////////////////////////////
// COURSERA GRAPHICS PROGRAMMING
//////////////////////////////////
// Adapted from https://github.com/nature-of-code/
// released under MIT license

var balls = []
///////////////////////////////////////////////
function setup() {
  createCanvas(900, 600)
  for (var i = 0; i < 100; i++) {
    balls.push(new Ball())
  }
  background(0)
}
////////////////////////////////////////////////
function draw() {
  balls.forEach(function (ball) {
    ball.run()
  }, this)
}
///////////////////////////////////////////////
class Ball {
  constructor() {
    var randomX = width / 2 + random(-100, 100)
    var randomY = height / 2 + random(-100, 100)
    this.prevLocation = new createVector(randomX, randomY)
    this.velocity = new createVector(0, 0)
    this.location = new createVector(randomX, randomY)
    this.acceleration = new createVector(0, 0)
    this.maxVelocity = 10
  }

  run() {
    this.draw()
    this.move()
  }

  draw() {
    strokeWeight(1)
    stroke(255)
    line(
      this.prevLocation.x,
      this.prevLocation.y,
      this.location.x,
      this.location.y
    )
    this.prevLocation = this.location.copy()
  }

  move() {
    var mouse = createVector(mouseX, mouseY)
    var dir = p5.Vector.sub(mouse, this.location)
    dir.normalize()
    dir.mult(0.3)
    this.acceleration = dir
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.maxVelocity)
    this.location.add(this.velocity)
  }
}
