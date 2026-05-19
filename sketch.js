let bgImg;
let woodImg;

// Tower dimensions
let towerLayers = 10;
let blocksPerLayer = 3;
let blockWidth = 60;
let blockHeight = 180; // In 2D, these are "vertical" or "horizontal" rectangles
let gap = 4;

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
  // Updated paths as requested
  bgImg = loadImage("assets/images/lightroom-workplace.jpg");
  woodImg = loadImage("assets/images/pink-wood.jpg");
}

function setup() {
  // Standard 2D canvas (no WEBGL)
  createCanvas(windowWidth, windowHeight);
  noLoop(); // Keep it static
}

function draw() {
  // 1. Draw the Lightroom Background
  // This scales the image to cover your screen
  let imgAspect = bgImg.width / bgImg.height;
  let canvasAspect = width / height;
  let drawW, drawH;

  if (canvasAspect > imgAspect) {
    drawW = width;
    drawH = width / imgAspect;
  } else {
    drawH = height;
    drawW = height * imgAspect;
  }
  image(bgImg, (width - drawW) / 2, (height - drawH) / 2, drawW, drawH);

  // 2. Draw the Jenga Tower in the center
  push();
  translate(width / 2, height / 2 + towerLayers * 15); // Center the tower

  for (let i = 0; i < towerLayers; i++) {
    let layerY = -i * 35; // Stack them upwards

    // Check if layer is horizontal or vertical style
    if (i % 2 === 0) {
      drawHorizontalLayer(layerY, i);
    } else {
      drawVerticalLayer(layerY, i);
    }
  }
  pop();
}

function drawHorizontalLayer(y, layerIndex) {
  let totalWidth = blockHeight;
  let startX = -totalWidth / 2;

  // Draw one large block to represent the "side" view of the 3 blocks
  drawBlock(startX, y, blockHeight, 30, messages[layerIndex % messages.length]);
}

function drawVerticalLayer(y, layerIndex) {
  let totalWidth = blocksPerLayer * blockWidth + (blocksPerLayer - 1) * gap;
  let startX = -totalWidth / 2;

  for (let j = 0; j < blocksPerLayer; j++) {
    let x = startX + j * (blockWidth + gap);
    // Draw 3 individual "front" blocks
    drawBlock(
      x,
      y,
      blockWidth,
      30,
      messages[(layerIndex + j) % messages.length],
    );
  }
}

function drawBlock(x, y, w, h, msg) {
  push();
  // Clip the pink wood texture to the block shape
  drawingContext.save();
  noFill();
  rect(x, y, w, h, 2); // Rounded corners for a "sanded" look
  drawingContext.clip();

  // Draw the wood texture inside the clipped region
  image(woodImg, x, y, w, h);
  drawingContext.restore();

  // Block Outline for definition
  stroke(200, 100, 120, 100);
  noFill();
  rect(x, y, w, h, 2);

  // Encouraging Text
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(10);
  textFont("Georgia");
  text(msg, x + w / 2, y + h / 2);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}
