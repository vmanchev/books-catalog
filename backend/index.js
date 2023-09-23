const express = require('express');
const addNewBook = require('./middlewares/add-new-book');
const deleteBook = require('./middlewares/delete-book');
const getDescriptionByIsbn = require('./middlewares/get-description-by-isbn');
const getBookByIsbn = require('./middlewares/get-book-by-isbn');
const getAllBooks = require('./middlewares/get-all-books');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Find a Postman collection for this API in backend folder');
});
app.get('/books', getAllBooks);
app.get('/books/:isbn', getBookByIsbn);
app.get('/descriptions/:isbn', getDescriptionByIsbn);
app.post('/books', addNewBook);
app.delete('/books/:isbn', deleteBook);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
