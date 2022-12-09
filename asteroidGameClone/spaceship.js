class Spaceship {
  constructor() {
    this.velocity = new createVector(0, 0)
    this.location = new createVector(width / 2, height / 2)
    this.acceleration = new createVector(0, 0)
    this.maxVelocity = 5
    this.bulletSys = new BulletSystem()
    this.size = 50
    this.gravity = new createVector(0, 0.05)
    this.friction = new createVector(0, 0)
  }

  run() {
    this.bulletSys.run()
    this.draw()
    this.move()
    this.edges()
    this.interaction()
  }

  draw() {
    // rocket thrusters
    fill(255, 165, 0)
    // left and right thrusters
    if (Math.sign(this.acceleration.x) === -1) {
      ellipse(
        this.location.x - 13,
        this.location.y,
        this.acceleration.x * 200,
        6
      )
    } else {
      ellipse(
        this.location.x + 13,
        this.location.y,
        this.acceleration.x * 200,
        6
      )
    }

    // top and bottom thrusters
    if (Math.sign(this.acceleration.y) === -1) {
      ellipse(
        this.location.x - 7,
        this.location.y + 25,
        6,
        this.acceleration.y * 200
      )
      ellipse(
        this.location.x + 7,
        this.location.y + 25,
        6,
        this.acceleration.y * 200
      )
    } else {
      ellipse(
        this.location.x + 7,
        this.location.y - 16,
        6,
        this.acceleration.y * 200
      )
      ellipse(
        this.location.x - 7,
        this.location.y - 16,
        6,
        this.acceleration.y * 200
      )
    }

    // rocket body
    fill(125)
    triangle(
      this.location.x - this.size / 2,
      this.location.y + this.size / 2,
      this.location.x + this.size / 2,
      this.location.y + this.size / 2,
      this.location.x,
      this.location.y - this.size / 2
    )
  }

  move() {
    // YOUR CODE HERE (4 lines)
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.maxVelocity)
    this.location.add(this.velocity)
    this.acceleration.mult(0)
  }

  applyForce(f) {
    this.acceleration.add(f)
  }

  // Moving the spaceship with the arrow keys
  interaction() {
    if (keyIsDown(LEFT_ARROW)) {
      this.applyForce(createVector(-0.1, 0))
    }
    if (keyIsDown(RIGHT_ARROW)) {
      // YOUR CODE HERE (1 line)
      this.applyForce(createVector(0.1, 0))
    }
    if (keyIsDown(UP_ARROW)) {
      // YOUR CODE HERE (1 line)
      this.applyForce(createVector(0, -0.1))
    }
    if (keyIsDown(DOWN_ARROW)) {
      // YOUR CODE HERE (1 line)
      this.applyForce(createVector(0, 0.1))
    }
  }

  fire() {
    this.bulletSys.fire(this.location.x, this.location.y)
  }

  edges() {
    if (this.location.x < 0) this.location.x = width
    else if (this.location.x > width) this.location.x = 0
    else if (this.location.y < 0) this.location.y = height
    else if (this.location.y > height) this.location.y = 0
  }

  setNearEarth() {
    //YOUR CODE HERE (6 lines approx)
    this.friction.add(this.velocity).mult(-1 / 30)
    this.applyForce(this.friction)
    this.applyForce(this.gravity)
  }
}
