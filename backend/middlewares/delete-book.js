const fs = require('fs');
const getApiBaseUrl = require('../helpers/get-api-base-url');
const getState = require('../helpers/get-state');
const saveState = require('../helpers/save-state');

module.exports = (req, res) => {
  const state = getState();

  // find the book to delete as we need to delete the cover image as well
  const selectedBook = state.books.find(
    (book) => book.isbn === req.params.isbn
  );

  if (!selectedBook) {
    res.sendStatus(200);
  } else {
    const coverImageUrl = selectedBook.cover;

    state.books = state.books.filter((book) => book.isbn !== req.params.isbn);

    saveState(state);

    // delete the cover image, in case it was stored locally
    if (coverImageUrl.includes(getApiBaseUrl(req))) {
      const coverImagePath = coverImageUrl.replace(
        getApiBaseUrl(req),
        './public'
      );
      fs.unlinkSync(coverImagePath);
    }
    res.sendStatus(200);
  }
};
