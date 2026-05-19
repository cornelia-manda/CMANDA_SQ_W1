let bgImg;
let woodImg;
let blocks = [];

// Updated to strictly one-word encouraging messages
let messages = [
  "BREATHE",
  "STAY",
  "STEADY",
  "BALANCE",
  "FOCUS",
  "GROWTH",
  "PROGRESS",
  "MINDSET",
  "MOMENTUM",
  "STRENGTH",
  "PEACE",
  "POWER",
];

function preload() {
  bgImg = loadImage("assets/images/lightroom-workplace.png");
  woodImg = loadImage("assets/images/pink-wood.jpg");
  // Citation: This woodImg was sourced from Adobe Stock (Lara, 2026).
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Tower configuration
  let towerLayers = 10;
  let blocksPerLayer = 3;
  let bWidth = 75; // Slightly narrower to ensure fit
  let bHeight = 240;
  let bThickness = 45;
  let gap = 4;

  // CENTERING LOGIC:
  // Based on your screenshot, we need to push the tower further right.
  // width * 0.55 should land it right in the center of the white work area.
  let centerX = width * 0.55;
  let centerY = height * 0.85;

  for (let i = 0; i < towerLayers; i++) {
    let layerY = centerY - i * (bThickness + 2);

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
  background(40);

  // REQUIREMENT: Image element
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
  rect(b.x, b.y, b.w, b.h, 3);
  drawingContext.clip();

  // REQUIREMENT: Image element (The texture)
  image(woodImg, b.x, b.y, b.w, b.h);
  drawingContext.restore();

  // Outline for definition
  stroke(140, 70, 80, 200);
  strokeWeight(1);
  noFill();
  rect(b.x, b.y, b.w, b.h, 3);

  // REQUIREMENT: Text element
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  // Adjusted size to 14px to guarantee one-word fit
  textSize(14);
  textFont("Georgia");
  text(b.message, b.x + b.w / 2, b.y + b.h / 2);
  pop();
}

function mousePressed() {
  // Clicking a block swaps the one-word message
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
