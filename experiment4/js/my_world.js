"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/
let grass;
let dirt;
let water;
let rock;
let owl;
let fox;
let cat;

function p3_preload() {
  grass = loadImage('https://cdn.glitch.global/f96dba6e-4b86-45bf-ae82-9f75e660c38e/tile_023.png?v=1714298113163');
  dirt = loadImage('https://cdn.glitch.global/f96dba6e-4b86-45bf-ae82-9f75e660c38e/tile_007.png?v=1714298102578');
  water = loadImage('https://cdn.glitch.global/f96dba6e-4b86-45bf-ae82-9f75e660c38e/tile_104.png?v=1714298073176');
  rock = loadImage('https://cdn.glitch.global/f96dba6e-4b86-45bf-ae82-9f75e660c38e/tile_061.png?v=1714460883915');
  owl = loadImage('https://cdn.glitch.global/f96dba6e-4b86-45bf-ae82-9f75e660c38e/tumblr_mjok0p1gm81rfjowdo1_500.gif?v=1714463341516')
  fox = loadImage('https://cdn.glitch.global/f96dba6e-4b86-45bf-ae82-9f75e660c38e/b78d1d16bd7f67ecda071808e51b4b97.gif?v=1714463710604')
  cat = loadImage('https://cdn.glitch.global/f96dba6e-4b86-45bf-ae82-9f75e660c38e/tumblr_mb7agi8YQU1rfjowdo1_500.gif?v=1714463718083')
}

function p3_setup() {
  noiseDetail(9, 0.3);
}

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_tileWidth() {
  return 32;
}
function p3_tileHeight() {
  return 16;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

function p3_tileClicked(i, j) {
  let key = i + "," + j; 
  if (!clicks[key]) {
    clicks[key] = { count: 0, imageType: null };
  }
  
  clicks[key].count += 1;
  
  if (clicks[key].count % 2 == 1) {  // Only choose an image on the first odd click
    clicks[key].imageType = floor(random(3)); 
  } else {
    // Reset image type to null when clicks are even
    clicks[key].imageType = null;
  }
}

function p3_drawBefore() {}

let frameIndex = 0;

function p3_drawTile(i, j) {
  noStroke();
  push();

  let nValue = noise(i * 0.1, j * 0.1);  // control biome

  if (nValue < 0.3) {
    image(water, -tw / 2, -th, tw * 2, th * 4);
  } else if (nValue < 0.33) {
    image(rock, -tw / 2, -th, tw * 2, th * 4);
  } else if (nValue < 0.45) {
    image(dirt, -tw / 2, -th, tw * 2, th * 4);
  } else {
    image(grass, -tw / 2, -th, tw * 2, th * 4);
  }

  let key = i + "," + j;
  if (clicks[key] && clicks[key].imageType !== null) {
    translate(0, -10);
    drawAnimal(clicks[key].imageType, -tw, -th * 3, tw * 3, th * 5);
  }

  pop();
}

function drawAnimal(imageType, x, y, w, h) {
  switch (imageType) {
  case 0:
    image(owl, x, y, w, h);
    break;
  case 1:
    image(fox, x, y, w, h);
    break;
  case 2:
    image(cat, x, y, w, h);
    break;
  }
}

function p3_drawSelectedTile(i, j) {
  noFill();
  stroke(0, 255, 0, 128);

  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  noStroke();
  fill(0);
  text("tile " + [i, j], 0, 0);
}

function p3_drawAfter() {}
