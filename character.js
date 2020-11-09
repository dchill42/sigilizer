const { CHARDEFS, SIDES, MIN_ALIGN_PTS } = require('./constants');

module.exports = class Character {
  constructor(chr) {
    this.chr = chr.toUpperCase();
    this.def = CHARDEFS[this.chr];
  }

  alignsWith(other) {
    if (!other) return true;
    if (this.intersection(this.def.bends, other.def.bends).length > 0) return true;
    if (this.intersection(this.def.arcs, other.def.arcs).length > 0) return true;
    return this.intersection(this.def.points, other.def.points).length >= MIN_ALIGN_PTS;
  }

  rankMatches(other) {
    const scores = SIDES.map((tside, i, all) => {
      const oside = all[(i + 2) % 4];
      const tidx = this.edgeIndex(tside, this.def);
      const oidx = this.edgeIndex(oside, other.def);
      return { idx: i + 1, scale: this.intersection(oidx, tidx).length };
    });
    return scores;
  }

  edgeIndex(side, def) {
    return this.intersection(side.points, def.points).map(p => side.points.indexOf(p));
  }

  intersection(a, b) {
    return a.filter(c => b.includes(c));
  }
};
