module.exports = (books, page, limit) => {
  const currentPageSlice =
    page && limit ? books.slice((page - 1) * limit, page * limit) : books;

  // build pagination config
  const pagination = {
    page,
    limit,
    totalCount: books.length,
    totalPages: Math.ceil(books.length / limit),
  };

  return { books: currentPageSlice, pagination };
};
