var speed;

function setup() {
    createCanvas(900, 900);

    // Setting degree mode
    angleMode(DEGREES);
}

function draw() {
    background(0);
    speed = frameCount;

    push();
    translate(width/2, height/2);


    push();
    // Set seld rotation speed
    rotate(speed/3);
    celestialObj(color(255,150,0), 200); // SUN
    pop();


    push();
    // Set Orbit speed
    rotate(speed);
    // Set Orbit radius
    translate(0,300);
    push();
    // Set seld rotation speed
    rotate(speed);
    celestialObj(color(0,0,255), 80); // EARTH
    pop();


    push();
    // Set Orbit speed
    rotate(-speed*2);
    // Set Orbit radius
    translate(0,100);
    push();
    // Set seld rotation
    rotate(90);
    celestialObj(color(255,255,255), 30); // MOON


    push();
    // Set Orbit speed
    rotate(speed*2);
    // Set Orbit radius
    translate(0,40);
    push();
    // Set seld rotation
    rotate(90);
    celestialObj(color(0,255,255), 20); // MOON's Asteroid
    pop();

    
    pop();


    pop();
    
    pop();
}

function celestialObj(c, size){
    strokeWeight(5);
    fill(c);
    stroke(0);
    ellipse(0, 0, size, size);
    line(0, 0, size/2, 0);
}
