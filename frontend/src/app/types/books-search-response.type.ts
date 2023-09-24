import { Book } from './book.type';
import { Pagination } from './pagination.type';

export type BooksSearchResponse = {
  books: Book[];
  pagination: Pagination;
};
