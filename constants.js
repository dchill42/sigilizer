const LOG_FILE = './activity.log';
const PNG_DIR = 'sigils';
const CHARDEFS = {
  A: { points: [2, 7, 9], bends: [], arcs: [] },
  B: { points: [1, 4, 7], bends: [], arcs: [3, 8] },
  C: { points: [2, 4, 8], bends: [], arcs: [2, 4, 7] },
  D: { points: [1, 6, 7], bends: [], arcs: [5] },
  E: { points: [1, 3, 4, 5, 7, 9], bends: [], arcs: [] },
  F: { points: [1, 3, 4, 5, 7], bends: [], arcs: [] },
  G: { points: [2, 4, 8], bends: [], arcs: [2, 4, 7] },
  H: { points: [1, 3, 4, 6, 7, 9], bends: [], arcs: [] },
  I: { points: [1, 2, 3, 7, 8, 8], bends: [], arcs: [] },
  J: { points: [3, 8], bends: [], arcs: [7] },
  K: { points: [1, 3, 4, 7, 9], bends: [2, 4], arcs: [] },
  L: { points: [1, 7, 9], bends: [], arcs: [] },
  M: { points: [1, 3, 5, 7, 9], bends: [1, 2], arcs: [] },
  N: { points: [1, 3, 7, 9], bends: [1, 4], arcs: [] },
  O: { points: [2, 4, 6, 8], bends: [], arcs: [2, 4, 5, 7] },
  P: { points: [1, 2, 4, 5, 7], bends: [], arcs: [3] },
  Q: { points: [2, 4, 6, 8], bends: [4], arcs: [2, 4, 5, 7] },
  R: { points: [1, 2, 4, 5, 7, 9], bends: [4], arcs: [3] },
  S: { points: [2, 5, 8], bends: [], arcs: [2, 7] },
  T: { points: [1, 2, 3, 8], bends: [], arcs: [] },
  U: { points: [1, 3, 8], bends: [], arcs: [7] },
  V: { points: [1, 3, 8], bends: [], arcs: [] },
  W: { points: [1, 3, 5, 7, 9], bends: [3, 4], arcs: [] },
  X: { points: [1, 3, 5, 7, 9], bends: [1, 2, 3, 4], arcs: [] },
  Y: { points: [1, 3, 5, 8], bends: [1, 2], arcs: [] },
  Z: { points: [1, 3, 7, 9], bends: [2, 3], arcs: [] },
  0: { points: [2, 4, 6, 8], bends: [2, 3], arcs: [2, 4, 5, 7] },
  1: { points: [2, 7, 8, 9], bends: [], arcs: [] },
  2: { points: [2, 7, 9], bends: [3], arcs: [2] },
  3: { points: [2, 5, 8], bends: [], arcs: [2, 3, 7, 8] },
  4: { points: [3, 4, 6, 9], bends: [2], arcs: [] },
  5: { points: [1, 3, 4, 8], bends: [], arcs: [7, 8] },
  6: { points: [3, 4, 8], bends: [2], arcs: [4, 7, 8] },
  7: { points: [1, 3, 7], bends: [2, 3], arcs: [] },
  8: { points: [2, 5, 8], bends: [], arcs: [1, 3, 6, 8] },
  9: { points: [2, 5, 8], bends: [3], arcs: [1, 2, 3] }
};
const SIDES = [
  { points: [3, 6, 9], offset: 1 },   // Right
  { points: [1, 2, 3], offset: -2 },  // Top
  { points: [1, 4, 7], offset: -1 },  // Left
  { points: [7, 8, 9], offset: 2 }    // Bottom
];
const MIN_ALIGN_PTS = 3;
const SCALE_FACTOR = 3
const CELL_MAX = 3
const CELL_W = 26;
const CELL_H = 49;
const CHAR_SZ = 70;
const CANVAS_W = 200;
const CANVAS_H = 200;
const FONT = 'ShareTechMono';
const FILE = 'sigil.png';

module.exports = {
  LOG_FILE,
  PNG_DIR,
  CHARDEFS,
  SIDES,
  MIN_ALIGN_PTS,
  SCALE_FACTOR,
  CELL_MAX,
  CELL_W,
  CELL_H,
  CHAR_SZ,
  CANVAS_W,
  CANVAS_H,
  FONT,
  FILE
};
