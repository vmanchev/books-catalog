const getState = require('../helpers/get-state');

module.exports = (req, res) => {
  const book = getState().books.find((book) => book.isbn === req.params.isbn);

  if (!book) {
    res.sendStatus(404);
  } else {
    let { description, ...rest } = book;
    res.json({ ...rest });
  }
};
