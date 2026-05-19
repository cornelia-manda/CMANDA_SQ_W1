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

  // Tower configuration
  let towerLayers = 10;
  let blocksPerLayer = 3;
  let bWidth = 55;
  let bHeight = 170;
  let gap = 3;

  // Positioning the tower within the "white" workspace of your screenshot
  let centerX = width * 0.38;
  let centerY = height * 0.75;

  // Initialize the block data
  for (let i = 0; i < towerLayers; i++) {
    let layerY = centerY - i * 33;

    if (i % 2 === 0) {
      blocks.push({
        x: centerX - bHeight / 2,
        y: layerY,
        w: bHeight,
        h: 30,
        message: random(messages),
      });
    } else {
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
  // REQUIREMENT: Sketch must include a background command
  // This clears the canvas every frame to prevent "ghosting"
  background(30);

  // REQUIREMENT: Include an image (Drawing the Lightroom UI)
  image(bgImg, 0, 0, width, height);

  // Draw each block in the tower
  for (let b of blocks) {
    drawBlock(b);
  }
}

function drawBlock(b) {
  push();

  // Clipping the wood texture to the block shape
  drawingContext.save();

  // REQUIREMENT: Include at least one shape (the rect creates the block)
  noFill();
  rect(b.x, b.y, b.w, b.h, 2);
  drawingContext.clip();

  // Apply the texture image
  image(woodImg, b.x, b.y, b.w, b.h);
  drawingContext.restore();

  // Draw an outline for the block shape
  stroke(150, 80, 90, 150);
  noFill();
  rect(b.x, b.y, b.w, b.h, 2);

  // REQUIREMENT: Include at least one text element
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  textFont("Georgia");
  text(b.message, b.x + b.w / 2, b.y + b.h / 2);
  pop();
}

function mousePressed() {
  // Interactive click to change the text message
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
