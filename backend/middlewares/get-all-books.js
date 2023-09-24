const getState = require('../helpers/get-state');
const getFilteredParam = require('../helpers/get-filtered-param');
const filterByKeyword = require('../helpers/filter-by-keyword');
const sortItems = require('../helpers/sort-items');
const getPaginatedResult = require('../helpers/get-paginated-result');

module.exports = (req, res) => {
  let books = getState().books.map((book) => {
    let { description, ...rest } = book;
    return rest;
  });

  // get query params and set default values for missing required params
  let keyword = getFilteredParam(req.query.keyword);
  let sortProperty = getFilteredParam(req.query.active) || 'title';
  let sortDirection = getFilteredParam(req.query.direction) || 'asc';
  let page = Number(getFilteredParam(req.query.page)) || 1;
  let limit = Number(getFilteredParam(req.query.limit)) || 5;

  // filter `title` or `author` by `keyword`
  books = filterByKeyword(books, keyword);

  // sort by `title` or `author` in selected direction
  books = sortItems(books, sortProperty, sortDirection);

  // from the filtered and sorted list of books, get the items for current page
  res.json(getPaginatedResult(books, page, limit));
};
