let bgImg;
let woodImg;
let blocks = [];

// The original list of encouraging messages
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

// New categorized lists for text fitting
let longMessages = [];
let shortMessages = [];

function preload() {
  // Path for background UI screenshot
  bgImg = loadImage("assets/images/lightroom-workplace.png");
  // Citation: This woodImg was sourced from Adobe Stock (Lara, 2026).
  woodImg = loadImage("assets/images/pink-wood.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Categorize messages: Long messages for side view, Short for front view.
  // We define a character count threshold (e.g., > 10 is long)
  for (let msg of messages) {
    if (msg.length > 10) {
      longMessages.push(msg);
    } else {
      shortMessages.push(msg);
    }
  }

  // Check if categorized lists are empty to avoid errors
  if (longMessages.length === 0)
    longMessages = ["STAY STEADY", "KEEP BUILDING"];
  if (shortMessages.length === 0)
    shortMessages = ["FOCUS", "BREATHE", "GROWTH"];

  // Tower configuration with even bigger dimensions
  let towerLayers = 10;
  let blocksPerLayer = 3;
  let bWidth = 80; // Bigger front blocks
  let bHeight = 250; // Wider side block
  let bThickness = 48; // Much thicker blocks
  let gap = 5;

  // New positioning logic: Center the tower visually within the white box.
  // The stretched Lightroom image maps the editing area to roughly 0 to 0.75 of the width.
  // Centering within that gives a ratio closer to 0.38, but visually, we want more right.
  // Setting width * 0.48 helps center it in the editing box visually.
  let centerX = width * 0.48;
  let centerY = height * 0.85; // Lowered slightly to accommodate taller tower and bigger blocks

  // Initialize the block data
  for (let i = 0; i < towerLayers; i++) {
    // Increased the Y-offset (48) so layers don't overlap with bigger blocks
    let layerY = centerY - i * (bThickness + 3);

    if (i % 2 === 0) {
      // Horizontal/Side view (one wide block) - USE LONG MESSAGES
      blocks.push({
        x: centerX - bHeight / 2,
        y: layerY,
        w: bHeight,
        h: bThickness,
        message: random(longMessages),
        isLong: true, // Flag for matching in mousePressed
      });
    } else {
      // Vertical/Front view (three narrower blocks) - USE SHORT MESSAGES
      let totalWidth = blocksPerLayer * bWidth + (blocksPerLayer - 1) * gap;
      let startX = centerX - totalWidth / 2;
      for (let j = 0; j < blocksPerLayer; j++) {
        blocks.push({
          x: startX + j * (bWidth + gap),
          y: layerY,
          w: bWidth,
          h: bThickness,
          message: random(shortMessages),
          isLong: false, // Flag for matching in mousePressed
        });
      }
    }
  }
}

function draw() {
  // REQUIREMENT: Background command (keeps scene clean)
  background(30);

  // REQUIREMENT: Image element (The Lightroom UI)
  // Scale image to cover screen, adhering to your simplification of simple image mapping
  image(bgImg, 0, 0, width, height);

  // Draw all blocks from the array
  for (let b of blocks) {
    drawBlock(b);
  }
}

function drawBlock(b) {
  push();
  // Clipping the wood texture to the block shape
  drawingContext.save();

  // REQUIREMENT: Shape element (The rectangle creating the block)
  noFill();
  rect(b.x, b.y, b.w, b.h, 4); // Slightly more rounded corners for bigger blocks
  drawingContext.clip();

  // REQUIREMENT: Image element (Apply texture)
  image(woodImg, b.x, b.y, b.w, b.h);
  drawingContext.restore();

  // Draw an outline for block definition
  stroke(150, 80, 90, 180);
  strokeWeight(1.5);
  noFill();
  rect(b.x, b.y, b.w, b.h, 4);

  // REQUIREMENT: Text element
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16); // Increased font size to fit bigger blocks
  textFont("Georgia");
  text(b.message, b.x + b.w / 2, b.y + b.h / 2);
  pop();
}

function mousePressed() {
  // Interactive click to change the text message while maintaining list constraints
  for (let b of blocks) {
    // Check if mouse is within block boundaries
    if (
      mouseX > b.x &&
      mouseX < b.x + b.w &&
      mouseY > b.y &&
      mouseY < b.y + b.h
    ) {
      // Determine the correct list based on block type
      let listToUse = b.isLong ? longMessages : shortMessages;
      let newMsg = random(listToUse);

      // Select a new random message, ensuring it does not repeat
      while (newMsg === b.message) {
        newMsg = random(listToUse);
      }
      b.message = newMsg;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
