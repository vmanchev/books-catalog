const formidable = require('formidable');
const getState = require('../helpers/get-state');
const saveState = require('../helpers/save-state');
const getApiBaseUrl = require('../helpers/get-api-base-url');
const isValidIsbn = require('../helpers/is-valid-isbn');
const saveCoverImage = require('../helpers/save-cover-image');

module.exports = async (req, res) => {
  const state = getState();

  const form = new formidable.IncomingForm();

  [fields, files] = await form.parse(req);

  if (!isValidIsbn(fields.isbn[0], state)) {
    res.status(409).json({ error: 'ISBN.DUPLICATE' });
  } else {
    // upload cover image
    const newFileName = saveCoverImage(files.cover[0]);

    const book = {
      isbn: fields.isbn[0],
      author: fields.author[0],
      title: fields.title[0],
      cover: `${getApiBaseUrl(req)}/images/${newFileName}`,
      description:
        fields.description && fields.description[0]
          ? fields.description[0]
          : null,
    };

    state.books.push(book);

    saveState(state);

    const { description, ...rest } = book;

    res.json(rest);
  }
};
