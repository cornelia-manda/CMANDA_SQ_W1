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

  // Tower Dimensions
  let towerLayers = 10;
  let blocksPerLayer = 3;
  let bWidth = 65;
  let bThickness = 26;
  let gap = 2;

  let bHeight = bWidth * blocksPerLayer + gap * (blocksPerLayer - 1);

  // POSITIONING: Centered in the white area
  let centerX = width * 0.385;
  let centerY = height * 0.22;

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
  background(30);

  // REQUIREMENT: Image element (Background UI)
  image(bgImg, 0, 0, width, height);

  // Draw the table (Gray, no outline, precise legs)
  drawTable();

  // Draw blocks
  for (let b of blocks) {
    drawBlock(b);
  }
}

function drawTable() {
  let bWidth = 65;
  let blocksPerLayer = 3;
  let gap = 2;
  let bHeight = bWidth * blocksPerLayer + gap * (blocksPerLayer - 1);

  let centerX = width * 0.385;
  // Dynamic calculation for the very bottom of the tower
  let towerBottom = height * 0.22 + 10 * 28;

  push();
  // 1. Surface Dimensions
  let tableW = bHeight * 1.5;
  let tableH = 10;
  let tableX = centerX - tableW / 2;
  let tableY = towerBottom;

  // 2. Leg Dimensions & Precision Limit
  let whiteLimit = height * 0.875;
  let legW = 8;
  let legH = whiteLimit - (tableY + tableH);

  // Table Styling: Light gray, NO outline
  fill(220);
  noStroke();

  // Draw Surface
  rect(tableX, tableY, tableW, tableH, 2);

  // Draw Legs (Only if height is positive)
  if (legH > 0) {
    rect(tableX + 15, tableY + tableH, legW, legH);
    rect(tableX + tableW - 15 - legW, tableY + tableH, legW, legH);
  }
  pop();
}

function drawBlock(b) {
  push();
  drawingContext.save();

  // REQUIREMENT: Shape element (The rect defining the block)
  noFill();
  rect(b.x, b.y, b.w, b.h, 3);
  drawingContext.clip();

  // REQUIREMENT: Image element (Applied wood texture)
  image(woodImg, b.x, b.y, b.w, b.h);
  drawingContext.restore();

  // Block Outline for "Shutter" definition
  stroke(100, 40, 50, 150);
  strokeWeight(1);
  noFill();
  rect(b.x, b.y, b.w, b.h, 3);

  // REQUIREMENT: Text element
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(10);
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
