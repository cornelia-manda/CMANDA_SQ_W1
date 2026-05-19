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

  // TOWER DIMENSIONS: Reduced width for a better fit in the white area
  let towerLayers = 10;
  let blocksPerLayer = 3;

  // REDUCED: Narrower blocks to fit inside the "editing" canvas
  let bWidth = 120;
  let bThickness = 45;
  let gap = 5;

  // Side block height matches the total width of the 3-block layer
  let bHeight = bWidth * blocksPerLayer + gap * (blocksPerLayer - 1);

  // POSITIONING: Moving the tower "Up" and further "Middle-Right"
  // 0.39 centers it horizontally within the white workspace
  let centerX = width * 0.39;
  // 0.15 starts the stack near the top of the white area
  let centerY = height * 0.15;

  for (let i = 0; i < towerLayers; i++) {
    // We build the layers downward from the top-set centerY
    let layerY = centerY + i * (bThickness + 3);

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

  // REQUIREMENT: Image element (Background Lightroom UI)
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

  // REQUIREMENT: Image element (Applied wood texture)
  image(woodImg, b.x, b.y, b.w, b.h);
  drawingContext.restore();

  // Visual Polish: Outline
  stroke(110, 50, 60, 200);
  strokeWeight(1.2);
  noFill();
  rect(b.x, b.y, b.w, b.h, 5);

  // REQUIREMENT: Text element
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  // Adjusted text size to ensure "MOMENTUM" and "STRENGTH" fit narrow blocks
  textSize(13);
  textFont("Georgia");
  text(b.message, b.x + b.w / 2, b.y + b.h / 2);
  pop();
}

function mousePressed() {
  // Click interaction to change words
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
