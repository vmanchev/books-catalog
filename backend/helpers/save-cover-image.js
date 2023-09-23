const fs = require('fs');
const generateFileName = require('./generate-file-name');

module.exports = (coverImage) => {
  const filepath = coverImage.filepath;
  const newFileName = generateFileName(coverImage.originalFilename);
  const newpath = `./public/images/${newFileName}`;

  //Copy the uploaded file to a custom folder
  fs.copyFileSync(filepath, newpath);

  return newFileName;
};
