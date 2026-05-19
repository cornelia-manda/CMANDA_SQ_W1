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

  // TOWER DIMENSIONS: Scaled down to fit the white workspace
  let towerLayers = 10;
  let blocksPerLayer = 3;

  // REDUCED: Narrower and thinner blocks to ensure they stay inside the box
  let bWidth = 85;
  let bThickness = 32;
  let gap = 3;

  // Total height of the 3-block layer
  let bHeight = bWidth * blocksPerLayer + gap * (blocksPerLayer - 1);

  // POSITIONING: Moving the tower "Up" and centering it in the white area
  // 0.385 aligns it with the center of the white edit area
  let centerX = width * 0.385;
  // 0.12 starts the stack much higher up
  let centerY = height * 0.12;

  for (let i = 0; i < towerLayers; i++) {
    // Positioning layers from top to bottom
    let layerY = centerY + i * (bThickness + 2);

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

  for (let b of blocks) {
    drawBlock(b);
  }
}

function drawBlock(b) {
  push();
  drawingContext.save();

  // REQUIREMENT: Shape element (The rect defining the block)
  noFill();
  rect(b.x, b.y, b.w, b.h, 4);
  drawingContext.clip();

  // REQUIREMENT: Image element (Wood texture)
  image(woodImg, b.x, b.y, b.w, b.h);
  drawingContext.restore();

  // Outline for definition
  stroke(120, 50, 60, 180);
  strokeWeight(1);
  noFill();
  rect(b.x, b.y, b.w, b.h, 4);

  // REQUIREMENT: Text element
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  // Adjusted text size for smaller blocks
  textSize(12);
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
