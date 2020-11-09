const Layout = require('./layout');
const { FILE } = require('./constants');

const layout = new Layout();
layout.arrange(['Z', 'D', 'M', '4', 'N', 'E', 'W', 'Q']);
layout.saveAs(FILE);
