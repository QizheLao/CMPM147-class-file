// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;
let seed = 0;
let topcolor, bottomcolor, n;
let time = 0; // time variable
let noiseScale = 0.01;
let Mstart = 300;
let Mend = 462;

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
  $("#reimagine").click(function() {seed++;});
}

// setup() function is called once when the program starts

function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  randomSeed(seed);
  noiseSeed(seed);
  // background
  topcolor = color(19, 20, 25);
  bottomcolor = color(46, 57, 79)
  for(let y = 0; y < height; y++) {
    n = map(y, 0, 250, 0, 1);
    let newcolor = lerpColor(topcolor, bottomcolor, n);
    stroke(newcolor);
    line(0, y, width, y);
  }
  
  // star
  fill(255);
  color(0);
  const Stars = 600;
  for(let i = 0; i < Stars; i++) {
    this.x = random(width);
    this.y = random(400);
    this.size = random(0.5, 3);
    ellipse(this.x, this.y, this.size);
  }
  
  // mountain
  fill(0);
  beginShape();
  for (let x = 0; x < width; x++) {
    let noiseVal = noise(x * noiseScale) * (Mend - Mstart);
    vertex(x, Mend - noiseVal);
  }
  vertex(width, Mend); 
  vertex(0, Mend); 
  endShape(CLOSE); 
  
  // Lake
  fill(7, 17, 27);
  noStroke();
  rect(0, height / 1.3, width, height + 1);
  
  // wave
  translate(0, height / 1.25) 
  // make a x and y grid of ellipses
  fill(74, 82, 113);
  noStroke();
  for (let x = 0; x <= width; x = x + 20) {
    for (let y = 0; y <= height-200; y = y + 20) {
      // starting point of each circle depends on mouse position
      const xAngle = map(mouseX, 0, width, -4 * PI, 4 * PI, true);
      const yAngle = map(mouseY, 0, height, -4 * PI, 4 * PI, true);
      // and also varies based on the particle's location
      const angle = xAngle * (x / width) + yAngle * (y / height);

      // each particle moves in a circle
      const myX = x + 10 * cos(2 * PI * time + angle);
      const myY = y + 10 * sin(2 * PI * time + angle);

      ellipse(myX, myY, 10); // draw particle
    }
  }
  time = time + 0.005; // update time
}