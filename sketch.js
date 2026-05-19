let bgImg;
let woodImg;
let blocks = []; // We need an array to keep track of each block for clicking

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
  bgImg = loadImage("assets/images/lightroom-workplace.png");
  woodImg = loadImage("assets/images/pink-wood.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Initialize Tower
  let towerLayers = 10;
  let blocksPerLayer = 3;
  let bWidth = 55;
  let bHeight = 170;
  let gap = 3;

  // Calculate the "Visual Center" of the white workspace in your screenshot
  // We shift it left (-width * 0.12) so it isn't in the middle of the toolbars
  let centerX = width * 0.38;
  let centerY = height * 0.75;

  for (let i = 0; i < towerLayers; i++) {
    let layerY = centerY - i * 33;

    if (i % 2 === 0) {
      // Side-view block (Horizontal)
      blocks.push({
        x: centerX - bHeight / 2,
        y: layerY,
        w: bHeight,
        h: 30,
        message: random(messages),
      });
    } else {
      // Front-view blocks (Vertical)
      let totalWidth = blocksPerLayer * bWidth + (blocksPerLayer - 1) * gap;
      let startX = centerX - totalWidth / 2;
      for (let j = 0; j < blocksPerLayer; j++) {
        blocks.push({
          x: startX + j * (bWidth + gap),
          y: layerY,
          w: bWidth,
          h: 30,
          message: random(messages),
        });
      }
    }
  }
}

function draw() {
  // 1. Draw the Background to fit the screen perfectly
  image(bgImg, 0, 0, width, height);

  // 2. Draw all blocks from the array
  for (let b of blocks) {
    drawBlock(b);
  }
}

function drawBlock(b) {
  push();
  // Texture clipping
  drawingContext.save();
  noFill();
  rect(b.x, b.y, b.w, b.h, 2);
  drawingContext.clip();
  image(woodImg, b.x, b.y, b.w, b.h);
  drawingContext.restore();

  // Definition Outline
  stroke(150, 80, 90, 120);
  noFill();
  rect(b.x, b.y, b.w, b.h, 2);

  // Text Styling
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  textFont("Georgia");
  text(b.message, b.x + b.w / 2, b.y + b.h / 2);
  pop();
}

// 3. Interaction Logic
function mousePressed() {
  for (let b of blocks) {
    // Check if mouse is within block boundaries
    if (
      mouseX > b.x &&
      mouseX < b.x + b.w &&
      mouseY > b.y &&
      mouseY < b.y + b.h
    ) {
      let newMsg = random(messages);
      // Don't repeat the same message
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
