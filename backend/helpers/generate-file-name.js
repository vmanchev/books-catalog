module.exports = (originalFilename) =>
  new Date().getTime() +
  '-' +
  originalFilename.toLowerCase().replace(/ /g, '-');
