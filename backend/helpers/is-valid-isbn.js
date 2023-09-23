module.exports = (providedIsbn, dbState) => {
  if (!dbState.books || !dbState.books.length) {
    return true;
  }

  const isbns = dbState.books.map((book) => book.isbn);

  return !isbns.includes(providedIsbn);
};
