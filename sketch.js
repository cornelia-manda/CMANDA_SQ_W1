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
  woodImg = loadImage("assets/images/pink-wood.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // TOWER DIMENSIONS: Scaled up horizontally for text clearance
  let towerLayers = 10;
  let blocksPerLayer = 3;

  // SIGNIFICANT INCREASE: These widths ensure "MOMENTUM" fits with padding
  let bWidth = 125; // Width of individual front blocks
  let bThickness = 45; // Height of the blocks
  let gap = 5; // Gap between blocks

  // The side block height must match the total width of the 3-block layer
  let bHeight = bWidth * blocksPerLayer + gap * (blocksPerLayer - 1);

  // POSITIONING: Moving the tower "Up" and "Center-Left" in the white area
  // 0.395 aligns it with the center of the white workspace in the screenshot
  let centerX = width * 0.395;
  // 0.65 pulls the bottom of the tower up significantly
  let centerY = height * 0.65;

  for (let i = 0; i < towerLayers; i++) {
    let layerY = centerY - i * (bThickness + 3);

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
  background(35);

  // REQUIREMENT: Image element (The Background UI)
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
  rect(b.x, b.y, b.w, b.h, 5);
  drawingContext.clip();

  // REQUIREMENT: Image element (The wood texture)
  image(woodImg, b.x, b.y, b.w, b.h);
  drawingContext.restore();

  // Visual Polish: Outline for block separation
  stroke(120, 50, 60, 200);
  strokeWeight(1.5);
  noFill();
  rect(b.x, b.y, b.w, b.h, 5);

  // REQUIREMENT: Text element
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14); // Slightly smaller to ensure "MOMENTUM" has side padding
  textFont("Georgia");
  text(b.message, b.x + b.w / 2, b.y + b.h / 2);
  pop();
}

function mousePressed() {
  // Check if click is inside any block to swap text
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
