const { CELL_MAX, CELL_W, CELL_H } = require('./constants');

module.exports = class Cell {
  constructor(x, y) {
    this.chars = [];
    this.offsets = { x, y };
  }

  acceptsChar(co) {
    return this.available && (this.empty || this.chars[0].alignsWith(co)) && this.insert(co);
  }

  insert(co) {
    this.chars.push(co);
    return true;
  }

  get available() {
    return CELL_MAX - this.chars.length;
  }

  get empty() {
    return this.chars.length === 0;
  }

  get width() {
    return this.empty ? 0 : CELL_W;
  }

  get height() {
    return this.empty ? 0 : CELL_H;
  }

  get xOffset() {
    return this.offsets.x * CELL_W;
  }

  get yOffset() {
    return this.offsets.y * CELL_H;
  }
};
