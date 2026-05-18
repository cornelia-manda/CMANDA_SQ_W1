let bgImg;
let woodImg;
let towerLayers = 10; // Added a few more layers for a taller composition
let blocksPerLayer = 3;
let blockWidth = 150;
let blockHeight = 30;
let blockDepth = 50;

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

let blockTextures = [];

function preload() {
  bgImg = loadImage("lightroom-workplace.jpg");
  woodImg = loadImage("pink-wood.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  // Generate static textures
  for (let i = 0; i < messages.length; i++) {
    let pg = createGraphics(300, 100);
    pg.image(woodImg, 0, 0, 300, 100);
    pg.fill(255);
    pg.textAlign(CENTER, CENTER);
    pg.textSize(28); // Slightly larger for better readability
    pg.textFont("Georgia");
    pg.text(messages[i], pg.width / 2, pg.height / 2);
    blockTextures.push(pg);
  }

  // We only need to draw this once since it's static
  noLoop();
}

function draw() {
  // 1. Background clear
  background(25);

  // 2. Draw static Lightroom Background
  push();
  resetMatrix();
  translate(0, 0, -600);
  imageMode(CENTER);
  let scale = max(width / bgImg.width, height / bgImg.height);
  image(bgImg, 0, 0, bgImg.width * scale, bgImg.height * scale);
  pop();

  // 3. Lighting (Fixed "Studio" Setup)
  ambientLight(120);
  pointLight(255, 255, 255, 400, -500, 400); // Key light from the top-right
  pointLight(150, 150, 200, -400, 200, 200); // Subtle blue fill light

  // 4. Fixed Perspective
  rotateX(-0.4); // Tilt down to see the top of the blocks
  rotateY(0.5); // Fixed angle to show the dimension of the tower

  for (let y = 0; y < towerLayers; y++) {
    push();
    translate(0, (towerLayers / 2 - y) * blockHeight, 0);

    if (y % 2 === 0) {
      drawLayer(y);
    } else {
      rotateY(HALF_PI);
      drawLayer(y);
    }
    pop();
  }
}

function drawLayer(layerIndex) {
  for (let i = 0; i < blocksPerLayer; i++) {
    push();
    let xOffset = (i - 1) * (blockDepth + 3); // 3px gap for realism
    translate(xOffset, 0, 0);

    // Pick a message based on the block's position so it stays consistent
    let texIndex = (layerIndex + i) % blockTextures.length;
    texture(blockTextures[texIndex]);

    noStroke();
    box(blockDepth, blockHeight, blockWidth);
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw(); // Re-render once when the window changes
}
