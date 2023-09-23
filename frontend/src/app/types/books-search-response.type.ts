import { Book } from './book.type';

export interface BooksSearchResponse {
  books: Book[];
  pagination: {
    limit: number;
    page: number;
    totalCount: number;
    totalPages: number;
  };
}
