module.exports = (books, sort, order) => {
  if (!['title', 'author'].includes(sort) || ['asc', 'desc'].includes(order)) {
    return books;
  }

  return books.sort((a, b) =>
    order === 'asc'
      ? a[sort].localeCompare(b[sort])
      : b[sort].localeCompare(a[sort])
  );
};
