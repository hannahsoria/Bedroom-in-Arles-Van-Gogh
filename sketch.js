// ATLS 5660
// 3D
// Hannah Soria
// 10/20/25

// "Bedroom in Arles" by Vincent Van Gogh! Move around the room using the mouse and zooming in or out.

// global variable (loaded image)
let img;

// load in the image
function preload() {
  img = loadImage("vangogh.jpg");
}

// set up canvas and turn off stroke for all elements
function setup() {
  createCanvas(800, 600, WEBGL);
  noStroke();
}

// draw 3D model of Vincent Van Gogh's Bedroom in Arles
function draw() {
  background("white");

  // set the lighting and light direction
  ambientLight(200);
  directionalLight(255, 255, 255, 0, -1, -0.5);

  // be able to move around the room
  orbitControl();

  // call all of the elements to be able to draw them
  drawFloor();
  drawWalls();
  drawChair();
  drawNightstand();
  drawBed();
  drawRightSidePics();
  drawWindow();
  drawBackPics();
  drawTowels();
  drawRack();
}

// ---------- FLOOR ----------
function drawFloor() {
  push();
  translate(0, 200, 0);
  ambientMaterial("#99795d");
  rotateX(HALF_PI);
  plane(800, 800);
  pop();
}

// ---------- WALLS ----------
function drawWalls() {
  const wallColor = "#4c94b5";

  // Left wall
  push();
  ambientMaterial(wallColor);
  translate(0, -50, -400);
  plane(800, 500);
  pop();

  // Right wall
  push();
  ambientMaterial(wallColor);
  translate(400, -50, 0);
  rotateY(HALF_PI);
  plane(800, 500);
  pop();

  // Back wall
  push();
  ambientMaterial(wallColor);
  translate(-400, -50, 0);
  rotateY(HALF_PI);
  plane(800, 500);
  pop();
}

// ---------- CHAIRS ----------

const chairColor = "#c7a04e";

// Helper to draw chair leg
// takes in the coordinates for location, rotation, and size
function chairLeg(x, y, z, rotY, h) {
  push();
  ambientMaterial(chairColor);
  translate(x, y, z);
  if (rotY) rotateY(rotY);
  cylinder(7, h);
  pop();
}

// Helper to draw chair part box
// takes in the coordinates for location, rotation, and size
function chairBox(x, y, z, w, h, d, rotY) {
  push();
  ambientMaterial(chairColor);
  translate(x, y, z);
  if (rotY) rotateY(rotY);
  box(w, h, d);
  pop();
}

function drawChair() {
  // ---------- FRONT CHAIR ----------

  // call chairleg function on the information for each legs & arms
  chairLeg(-235, 120, 200, 3, 160);
  chairLeg(-175, 165, 200, 0, 70);
  chairLeg(-230, 120, 150, 3, 160);
  chairLeg(-173, 165, 150, 0, 70);

  // call charbox function on the information for each seat & support
  chairBox(-200, 130, 175, 70, 10, 60);
  chairBox(-235, 110, 175, 10, 10, 60);
  chairBox(-234, 80, 173, 10, 20, 60);

  // ---------- BACK CHAIR ----------

  // call chairleg function on the information for each legs & arms
  chairLeg(-35, 120, -300, 3, 160);
  chairLeg(25, 165, -300, 0, 70);
  chairLeg(-30, 120, -250, 3, 160);
  chairLeg(25, 165, -250, 0, 70);

  // call charbox function on the information for each seat & support
  chairBox(0, 130, -275, 70, 10, 60);
  chairBox(-35, 110, -275, 10, 10, 60);
  chairBox(-34, 80, -275, 10, 20, 60);
}

// ---------- Helper: Draw box part with rotation ----------
function drawBoxPart(x, y, z, w, h, d, rotY = 0, materialColor = "#946e38") {
  push();
  ambientMaterial(materialColor);
  translate(x, y, z);
  rotateY(rotY);
  box(w, h, d);
  pop();
}

// ---------- NIGHTSTAND ----------
function drawNightstand() {
  const standColor = "#946e38";

  // Legs
  const legs = [
    [-230, 155, -150],
    [-210, 155, -250],
    [-170, 155, -180],
    [-260, 155, -210],
  ];
  legs.forEach(([x, y, z]) => {
    push();
    ambientMaterial(standColor);
    translate(x, y, z);
    rotateY(3);
    cylinder(7, 90);
    pop();
  });

  // Top boxes
  drawBoxPart(-220, 100, -200, 80, 30, 100, 0.5, standColor);
  drawBoxPart(-220, 80, -200, 120, 10, 120, 0.5, standColor);

  // Cylinders on top
  for (let i = 0; i < 3; i++) {
    push();
    ambientMaterial("#5d8ec2");
    translate(-220 - 40 + i * 40, 50, -200);
    rotateY(0.5);
    cylinder(7, 50);
    pop();
  }
}

// ---------- BED ----------
function drawBed() {
  const bedColor = "#fac34d";

  function drawBoxPartBed(x, y, z, w, h, d, options = {}) {
    const { rotX = 0, rotY = 0, rotZ = 0, materialColor = "#fac34d" } = options;
    push();
    ambientMaterial(materialColor);
    translate(x, y, z);
    rotateX(rotX);
    rotateY(rotY);
    rotateZ(rotZ);
    box(w, h, d);
    pop();
  }

  // list of parts that make up the bed aspects
  const parts = [
    { x: 350, y: 110, z: 50, w: 10, h: 180, d: 10 },
    { x: 350, y: 110, z: -350, w: 10, h: 180, d: 10 },
    { x: 250, y: 140, z: -150, w: 200, h: 25, d: 400, rotZ: -0.01 },
    { x: 150, y: 110, z: -350, w: 10, h: 180, d: 10 },
    { x: 150, y: 110, z: 50, w: 10, h: 180, d: 10 },
    { x: 250, y: 100, z: -350, w: 10, h: 130, d: 200, rotY: HALF_PI },
    { x: 250, y: 100, z: 50, w: 10, h: 130, d: 200, rotY: HALF_PI },
    {
      x: 250,
      y: 110,
      z: -250,
      w: 200,
      h: 50,
      d: 200,
      rotZ: -0.01,
      materialColor: "white",
    },
    {
      x: 250,
      y: 110,
      z: -50,
      w: 200,
      h: 50,
      d: 200,
      rotZ: -0.01,
      materialColor: "#94311f",
    },
  ];

  // for each aspect in the array call the draw on and pass the positions so that each element is drawn
  parts.forEach((p) => drawBoxPartBed(p.x, p.y, p.z, p.w, p.h, p.d, p));
}

// ---------- RIGHT SIDE PICS ----------
function drawRightSidePics() {
  push();
  ambientMaterial("white");
  
  // create a 2 x 2 grid of frames
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      push();
      translate(399, -100 + j * 100, -200 + i * 150);
      rotateY(HALF_PI);
      
      // make the even number index brown and the odd number index white
      ambientMaterial(j % 2 === 0 ? "#997254" : "white");
      box(80, 60, 5);
      push();
      ambientMaterial("gray");
      box(60, 40, 6);
      pop();
      pop();
    }
  }
  pop();
}

// ---------- WINDOW ----------
function drawWindow() {
  push();
  ambientMaterial("#12240d");
  translate(-105, -50, -400);
  box(210, 300, 3);
  pop();

  push();
  ambientMaterial("#7bb869");
  
  // grid of 2 x 3 for the window panes
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 3; j++) {
      push();
      translate(-150 + i * 90, -140 + j * 90, -399);
      box(80, 80, 5);
      push();
      ambientMaterial("white");
      translate(30, 0, 0);
      box(10, 60, 6);
      pop();
      pop();
    }
  }
  pop();
}

// ---------- BACK PICS ----------
function drawBackPics() {
  push();
  ambientMaterial("#78a7c2");
  translate(399, 30, 200);
  box(5, 350, 200);
  pop();

  push();
  ambientMaterial("#78a7c2");
  translate(-399, 30, 0);
  box(5, 350, 200);
  pop();

  // Van Gogh picture
  push();
  ambientMaterial("#fac34d");
  translate(200, -80, -399);
  box(150, 100, 5);
  ambientMaterial("#999999");
  textureMode(IMAGE);
  texture(img);
  box(130, 70, 6);
  pop();

  // Black/blue pic frame
  push();
  ambientMaterial("black");
  translate(-300, -80, -399);
  box(50, 100, 5);
  ambientMaterial("#72c7d6");
  box(40, 90, 6);
  pop();
}

// ---------- TOWELS ----------
function drawTowels() {
  // Left towel
  push();
  ambientMaterial("#7bb869");
  rotateX(PI);
  translate(-399, 50, 200);
  cone(15, 200);
  pop();

  // Back towels
  for (let i = 0; i < 3; i++) {
    push();
    ambientMaterial("#78a7c2");
    rotateX(PI);
    translate(100 * i + 100, -75, 399);
    cone(15, 150);
    pop();
  }
}

// ---------- RACK ----------
function drawRack() {
  push();
  ambientMaterial("#997254");
  translate(200, 0, -399);
  box(250, 10, 10);
  pop();
}
