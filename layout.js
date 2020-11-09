const fs = require('fs');
const { registerFont, createCanvas } = require('canvas');

const Cell = require('./cell');
const Character = require('./character');
const { SCALE_FACTOR, CHAR_SZ, CANVAS_W, CANVAS_H, FONT } = require('./constants');

module.exports = class Layout {
  constructor() {
    this.cell = 0;
    this.grid = [
      new Cell(0, 0),   // Center
      new Cell(1, 0),   // Right
      new Cell(-1, -1), // Top
      new Cell(-1, 1),  // Left
      new Cell(1, 1)    // Bottom
    ];
    this.place = this.place.bind(this);
  }

  arrange(chars) {
    chars.map(c => new Character(c)).forEach(this.place);
  }

  saveAs(path) {
    registerFont('./ShareTechMono-Regular.ttf', { family: FONT });

    const cWidth = this.grid[0].width;
    const rWidth = this.grid[1].width;
    const lWidth = this.grid[3].width;
    const cHeight = this.grid[0].height;
    const tHeight = this.grid[2].height;
    const bHeight = this.grid[4].height;
    const out = fs.createWriteStream(path);
    const canvas = createCanvas(CANVAS_W, CANVAS_H);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${CHAR_SZ}px ${FONT}`;
    ctx.fillStyle = 'black';

    const width = cWidth + rWidth + lWidth;
    const height = cHeight + tHeight + bHeight;
    let x = ((CANVAS_W - width) / 2) + lWidth;
    let y = ((CANVAS_H - height) / 2) + cHeight + tHeight;

    this.grid.forEach(cell => {
      x += cell.xOffset;
      y += cell.yOffset;
      cell.chars.forEach(c => ctx.fillText(c.chr, x, y));
    });

    canvas.createPNGStream().pipe(out)
  }

  place(co, i, arr) {
    if (this.currCell.acceptsChar(co)) return;
    if (this.cell) {
      this.cell = 0;
      if (this.currCell.acceptsChar(co)) return;
    }
    this.selectEdge(co);
    this.currCell.insert(co);
  }

  selectEdge(co) {
    const matches = this.currCell.chars[0].rankMatches(co).map(c => {
      const avail = this.grid[c.idx].available;
      c.score = avail ? (c.scale * SCALE_FACTOR) + avail : 0;
      return c;
    });
    this.cell = matches.sort((a, b) => b.score - a.score)[0].idx;
  }

  get currCell() {
    return this.grid[this.cell];
  }
};
