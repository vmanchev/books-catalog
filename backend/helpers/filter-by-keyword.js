module.exports = (books, keyword) => {
  if (!keyword) {
    return books;
  }

  keyword = keyword.toLowerCase();

  return books.filter(
    (book) =>
      book.title.toLowerCase().includes(keyword) ||
      book.author.toLowerCase().includes(keyword)
  );
};
