function draw() {
  // 1. The Background Command
  // This clears the screen every frame.
  // 30 is a dark grey that blends well with Adobe's UI.
  background(30);

  // 2. Draw the Lightroom Workplace Image
  // We wrap this in push/pop so the background stays static
  // while the Jenga tower rotates independently.
  push();
  resetMatrix();
  // Move the background image back so the 3D tower sits "on top" of it
  translate(0, 0, -600);
  imageMode(CENTER);

  // High-performance scaling to ensure your UI covers the whole screen
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

  image(bgImg, 0, 0, drawW, drawH);
  pop();

  // 3. Lighting & Tower Logic (Rest of the code)
  orbitControl();
  ambientLight(180);
  specularMaterial(250);
  pointLight(255, 255, 255, 500, -500, 500);

  // Tilt and rotate the tower
  rotateX(-0.3);
  rotateY(frameCount * 0.008);

  for (let y = 0; y < towerLayers; y++) {
    push();
    translate(0, (towerLayers / 2 - y) * blockHeight, 0);
    if (y % 2 === 0) {
      drawLayer(false);
    } else {
      rotateY(HALF_PI);
      drawLayer(true);
    }
    pop();
  }
}
