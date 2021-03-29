const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

const jsFiles = fs.readdirSync(root).filter((fileName) => {
  return !fileName.startsWith('.') && fileName.endsWith('.js')
});

jsFiles.forEach((fileName) => {
  const name = fileName.split('.js')[0];
  module.exports[name] = require(path.join(root, fileName)).default;
});

