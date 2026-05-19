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

  // TOWER DIMENSIONS: Adjusted for "Longer" blocks and better fit
  let towerLayers = 10;
  let blocksPerLayer = 3;
  let bWidth = 90; // INCREASED: Makes front blocks wider
  let bHeight = 280; // INCREASED: Makes side blocks wider
  let bThickness = 45;
  let gap = 4;

  // POSITIONING: "More Up" and Centered in the white box
  // 0.39 aligns it with the center of the white canvas area in the screenshot
  let centerX = width * 0.39;
  let centerY = height * 0.72; // DECREASED: Moves the tower base up

  for (let i = 0; i < towerLayers; i++) {
    let layerY = centerY - i * (bThickness + 2);

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

  // REQUIREMENT: Image element (Background UI)
  image(bgImg, 0, 0, width, height);

  for (let b of blocks) {
    drawBlock(b);
  }
}

function drawBlock(b) {
  push();
  drawingContext.save();

  // REQUIREMENT: Shape element (Rect)
  noFill();
  rect(b.x, b.y, b.w, b.h, 4);
  drawingContext.clip();

  // REQUIREMENT: Image element (Texture)
  image(woodImg, b.x, b.y, b.w, b.h);
  drawingContext.restore();

  // Definition Outline
  stroke(130, 60, 70, 220);
  strokeWeight(1.2);
  noFill();
  rect(b.x, b.y, b.w, b.h, 4);

  // REQUIREMENT: Text element
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(15); // Clear, one-word sizing
  textFont("Georgia");
  text(b.message, b.x + b.w / 2, b.y + b.h / 2);
  pop();
}

function mousePressed() {
  // Interactive message swap on click
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
