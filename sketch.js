let bgImg;
let woodImg;
let blocks = [];

let messages = [
  "BREATHE",
  "STAY STEADY",
  "YOU GOT THIS",
  "KEEP BUILDING",
  "BALANCE",
  "FOCUS",
  "GROWTH",
  "RESILIENCE",
  "PROGRESS",
  "MINDSET",
  "MOMENTUM",
  "STRENGTH",
];

function preload() {
  // Citation: This woodImg was sourced from Adobe Stock (Lara, 2026).
  bgImg = loadImage("assets/images/lightroom-workplace.png");
  woodImg = loadImage("assets/images/pink-wood.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // UPDATED DIMENSIONS: Bigger blocks for better text fit
  let towerLayers = 10;
  let blocksPerLayer = 3;
  let bWidth = 80; // Was 55
  let bHeight = 250; // Was 170
  let bThickness = 45; // Was 30
  let gap = 5;

  // Positioning logic
  let centerX = width * 0.38;
  let centerY = height * 0.85; // Lowered slightly to accommodate taller tower

  for (let i = 0; i < towerLayers; i++) {
    // Increased the Y-offset (48) so layers don't overlap
    let layerY = centerY - i * (bThickness + 3);

    if (i % 2 === 0) {
      // Horizontal/Side view
      blocks.push({
        x: centerX - bHeight / 2,
        y: layerY,
        w: bHeight,
        h: bThickness,
        message: random(messages),
      });
    } else {
      // Vertical/Front view
      let totalWidth = blocksPerLayer * bWidth + (blocksPerLayer - 1) * gap;
      let startX = centerX - totalWidth / 2;
      for (let j = 0; j < blocksPerLayer; j++) {
        blocks.push({
          x: startX + j * (bWidth + gap),
          y: layerY,
          w: bWidth,
          h: bThickness,
          message: random(messages),
        });
      }
    }
  }
}

function draw() {
  // REQUIREMENT: Background command
  background(30);

  // REQUIREMENT: Image element (Background UI)
  image(bgImg, 0, 0, width, height);

  for (let b of blocks) {
    drawBlock(b);
  }
}

function drawBlock(b) {
  push();
  drawingContext.save();

  // REQUIREMENT: Shape element (The rectangle)
  noFill();
  rect(b.x, b.y, b.w, b.h, 4); // Slightly more rounded corners for the bigger scale
  drawingContext.clip();

  // REQUIREMENT: Image element (The texture)
  image(woodImg, b.x, b.y, b.w, b.h);
  drawingContext.restore();

  // Definition Outline
  stroke(150, 80, 90, 180);
  strokeWeight(1.5);
  noFill();
  rect(b.x, b.y, b.w, b.h, 4);

  // REQUIREMENT: Text element
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16); // Increased font size
  textFont("Georgia");
  text(b.message, b.x + b.w / 2, b.y + b.h / 2);
  pop();
}

function mousePressed() {
  for (let b of blocks) {
    if (
      mouseX > b.x &&
      mouseX < b.x + b.w &&
      mouseY > b.y &&
      mouseY < b.y + b.h
    ) {
      let newMsg = random(messages);
      while (newMsg === b.message) {
        newMsg = random(messages);
      }
      b.message = newMsg;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
