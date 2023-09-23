const fs = require('fs');
var path = require('path');

module.exports = (state) =>
  fs.writeFileSync(path.join(__dirname, '../db.json'), JSON.stringify(state, null, 4));
