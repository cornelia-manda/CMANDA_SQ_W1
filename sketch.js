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

  // TOWER DIMENSIONS: Stretched horizontally for maximum text clearance
  let towerLayers = 10;
  let blocksPerLayer = 3;

  // INCREASED: Blocks are now nearly 200px wide for a very "wide-screen" look
  let bWidth = 195;
  let bThickness = 50;
  let gap = 8;

  // Side block length automatically matches the 3-block layer width
  let bHeight = bWidth * blocksPerLayer + gap * (blocksPerLayer - 1);

  // POSITIONING: Moving the tower "Up" and "Right" (towards the middle)
  // width * 0.41 moves it away from the left edge towards the center of the white area
  let centerX = width * 0.41;
  // height * 0.40 moves it significantly higher up the screen
  let centerY = height * 0.4;

  for (let i = 0; i < towerLayers; i++) {
    // Spacing (55) adjusted for thicker blocks
    let layerY = centerY + i * (bThickness + 5);

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

  // REQUIREMENT: Image element (Lightroom UI)
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
  rect(b.x, b.y, b.w, b.h, 6);
  drawingContext.clip();

  // REQUIREMENT: Image element (Wood texture)
  image(woodImg, b.x, b.y, b.w, b.h);
  drawingContext.restore();

  // Definition Outline
  stroke(100, 40, 50, 200);
  strokeWeight(1.5);
  noFill();
  rect(b.x, b.y, b.w, b.h, 6);

  // REQUIREMENT: Text element
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  // Slightly larger font for the now massive blocks
  textSize(18);
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
