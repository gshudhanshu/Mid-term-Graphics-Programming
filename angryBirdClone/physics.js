////////////////////////////////////////////////////////////////
function setupGround() {
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true,
    angle: 0,
  })
  World.add(engine.world, [ground])
}

////////////////////////////////////////////////////////////////
function drawGround() {
  push()
  fill(128)
  drawVertices(ground.vertices)
  pop()
}
////////////////////////////////////////////////////////////////
function setupPropeller() {
  // creating the propeller body inside the matter.js world
  propeller = Bodies.rectangle(150, 480, 200, 15, {
    isStatic: true,
    angle: angle,
  })
  World.add(engine.world, [propeller])
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller() {
  push()
  // setting the angle of the propeller
  Body.setAngle(propeller, angle)
  Body.setAngularVelocity(propeller, angleSpeed)
  angle += angleSpeed
  // drawing the propeller
  fill(255)
  drawVertices(propeller.vertices)
  pop()
}
////////////////////////////////////////////////////////////////
function setupBird() {
  var bird = Bodies.circle(mouseX, mouseY, 20, {
    friction: 0,
    restitution: 0.95,
  })
  Matter.Body.setMass(bird, bird.mass * 10)
  World.add(engine.world, [bird])
  birds.push(bird)
}
////////////////////////////////////////////////////////////////
function drawBirds() {
  push()
  for (let i = 0; i < birds.length; i++) {
    fill('red')
    drawVertices(birds[i].vertices)
    if (isOffScreen(birds[i])) {
      removeFromWorld(birds[i])
      birds.splice(i, 1)
      // colors.splice(i, 1)
    }
  }
  pop()
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower() {
  // creating a template box to be used in the tower
  const createBox = (x, y) => {
    const box = Bodies.rectangle(x, y, 80, 80)
    // generating random colors for the boxes
    colors.push(color(0, random(100, 255), 0))
    return box
  }
  // creating the tower of boxes using the template box
  boxes = Composites.stack(500, 100, 3, 6, 0, 0, createBox)
  World.add(engine.world, [boxes])
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower() {
  push()
  // drawing the tower of boxes
  for (var i = 0; i < boxes.bodies.length; i++) {
    fill(colors[i])
    noStroke()
    drawVertices(boxes.bodies[i].vertices)
  }
  pop()
}
////////////////////////////////////////////////////////////////
function setupSlingshot() {
  // creating the slingshot bird
  slingshotBird = Bodies.circle(150, 170, 20, {
    friction: 0,
    restitution: 0.95,
  })
  Matter.Body.setMass(slingshotBird, slingshotBird.mass * 10)

  // creating the constraint for slingshot bird
  slingshotConstraint = Constraint.create({
    pointA: { x: 150, y: 150 },
    bodyB: slingshotBird,
    pointB: { x: 0, y: 0 },
    stiffness: 0.01,
    damping: 0.0001,
  })

  World.add(engine.world, [slingshotBird, slingshotConstraint])
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot() {
  push()
  // drawing the slingshot bird
  fill(255, 200, 0)
  drawVertices(slingshotBird.vertices)
  // drawing the constraint for the slingshot bird
  drawConstraint(slingshotConstraint)

  pop()
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction() {
  var mouse = Mouse.create(canvas.elt)
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 },
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams)
  mouseConstraint.mouse.pixelRatio = pixelDensity()
  World.add(engine.world, mouseConstraint)
}
