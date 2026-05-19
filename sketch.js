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

  // TOWER DIMENSIONS: Scaled down for a "Mini" desktop feel
  let towerLayers = 10;
  let blocksPerLayer = 3;

  // REDUCED: Significant decrease to keep the tower inside the white canvas
  let bWidth = 65;
  let bThickness = 26;
  let gap = 2;

  // Total width of the 3-block layer
  let bHeight = bWidth * blocksPerLayer + gap * (blocksPerLayer - 1);

  // POSITIONING: Moving the tower "High and Center"
  // 0.385 centers it within the white editing area
  let centerX = width * 0.385;
  // 0.08 starts the tower right at the top of the white box
  let centerY = height * 0.08;

  for (let i = 0; i < towerLayers; i++) {
    // Build the stack from top to bottom
    let layerY = centerY + i * (bThickness + 2);

    if (i % 2 === 0) {
      // Horizontal/Side view (One long block)
      blocks.push({
        x: centerX - bHeight / 2,
        y: layerY,
        w: bHeight,
        h: bThickness,
        message: random(messages),
      });
    } else {
      // Vertical/Front view (Three individual blocks)
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

  // REQUIREMENT: Image element (Lightroom Background)
  image(bgImg, 0, 0, width, height);

  for (let b of blocks) {
    drawBlock(b);
  }
}

function drawBlock(b) {
  push();
  drawingContext.save();

  // REQUIREMENT: Shape element (The rect defining the block)
  noFill();
  rect(b.x, b.y, b.w, b.h, 3);
  drawingContext.clip();

  // REQUIREMENT: Image element (The wood texture)
  image(woodImg, b.x, b.y, b.w, b.h);
  drawingContext.restore();

  // Block Outline
  stroke(100, 40, 50, 150);
  strokeWeight(1);
  noFill();
  rect(b.x, b.y, b.w, b.h, 3);

  // REQUIREMENT: Text element
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  // Smaller font for the mini blocks
  textSize(10);
  textFont("Georgia");
  text(b.message, b.x + b.w / 2, b.y + b.h / 2);
  pop();
}

function mousePressed() {
  // Interaction check
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
