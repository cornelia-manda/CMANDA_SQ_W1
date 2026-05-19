let bgImg;
let woodImg;
let blocks = [];

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
  // Citation: This woodImg was sourced from Adobe Stock (Lara, 2026).
  woodImg = loadImage("assets/images/pink-wood.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // 1. DYNAMIC RE-CENTERING
  // Instead of static numbers, we use percentages to ensure it stays in the white box
  let towerLayers = 10;
  let blocksPerLayer = 3;

  // EXTREMELY SMALL: If this doesn't look smaller, the browser isn't updating!
  let bWidth = 45;
  let bThickness = 22;
  let gap = 2;

  // Math for the long side-blocks
  let bHeight = bWidth * blocksPerLayer + gap * (blocksPerLayer - 1);

  // POSITION: Much higher up (0.05) and centered in the workspace (0.38)
  let centerX = width * 0.385;
  let centerY = height * 0.08;

  for (let i = 0; i < towerLayers; i++) {
    let layerY = centerY + i * (bThickness + 2);

    if (i % 2 === 0) {
      blocks.push({
        x: centerX - bHeight / 2,
        y: layerY,
        w: bHeight,
        h: bThickness,
        message: random(messages),
      });
    } else {
      let startX = centerX - bHeight / 2;
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
  background(20);

  // REQUIREMENT: Image element
  // Ensuring the background fills the window
  image(bgImg, 0, 0, width, height);

  for (let b of blocks) {
    drawBlock(b);
  }
}

function drawBlock(b) {
  push();
  drawingContext.save();

  // REQUIREMENT: Shape element (The rect)
  noFill();
  rect(b.x, b.y, b.w, b.h, 2);
  drawingContext.clip();

  // REQUIREMENT: Image element (Wood Texture)
  image(woodImg, b.x, b.y, b.w, b.h);
  drawingContext.restore();

  // Thin outline for a "clean" edit look
  stroke(100, 40, 50, 180);
  strokeWeight(0.5);
  noFill();
  rect(b.x, b.y, b.w, b.h, 2);

  // REQUIREMENT: Text element
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(9); // Small font to match the tiny blocks
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
