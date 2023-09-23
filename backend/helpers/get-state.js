const fs = require('fs');
var path = require('path');

module.exports = () => {
  let rawdata = fs.readFileSync(path.join(__dirname, '../db.json'));
  return JSON.parse(rawdata);
};
