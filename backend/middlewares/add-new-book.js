const formidable = require('formidable');
const fs = require('fs');

function generateFileName(originalFilename) {
  return (
    new Date().getTime() +
    '-' +
    originalFilename.toLowerCase().replace(/ /g, '-')
  );
}

function isValidIsbn(providedIsbn, dbState) {
  if (!dbState.books || !dbState.books.length) {
    return true;
  }

  const isbns = dbState.books.map((book) => book.isbn);

  return !isbns.includes(providedIsbn);
}

function saveCoverImage() {
  const filepath = files.cover[0].filepath;
  const newFileName = generateFileName(files.cover[0].originalFilename);
  const newpath = `./public/images/${newFileName}`;

  //Copy the uploaded file to a custom folder
  fs.copyFileSync(filepath, newpath);

  return newFileName;
}

module.exports = async (req, res, next) => {
  // add new book
  if (req.url === '/books' && req.method === 'POST') {
    // Prepare file upload
    //Create an instance of the form object
    const form = new formidable.IncomingForm();

    [fields, files] = await form.parse(req);

    // Make sure the provided `isbn` is unique
    if (!isValidIsbn(fields.isbn[0], req.app.db.getState())) {
      res.status(409).json({ error: 'ISBN.DUPLICATE' });
    } else {
      const newFileName = saveCoverImage(files.cover[0]);

      req.body.isbn = fields.isbn[0];
      req.body.author = fields.author[0];
      req.body.title = fields.title[0];
      req.body.cover = `http://localhost:3000/images/${newFileName}`;
      req.body.description =
        fields.description && fields.description[0]
          ? fields.description[0]
          : null;
      next();
    }
  } else {
    next();
  }
};
