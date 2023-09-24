module.exports = (books, property, direction) => {
  if (
    !['title', 'author'].includes(property) ||
    !['asc', 'desc'].includes(direction)
  ) {
    return books;
  }

  return books.sort((a, b) =>
    direction === 'asc'
      ? a[property].localeCompare(b[property])
      : b[property].localeCompare(a[property])
  );
};
