import { BookDescription } from '@models/book-description.type';
import { Book } from '@models/book.type';
import { BooksSearchRequest } from '@models/books-search-request.type';
import { CreateBook } from '@models/create-book.type';
import { Pagination } from '@models/pagination.type';
import { Sorting } from '@models/sorting.type';
import { createAction, props } from '@ngrx/store';

export const searchBooks = createAction('[Books] Search');

export const setBooksInStore = createAction(
  '[Books] Set in store',
  props<{ books: Book[] }>()
);

export const setPagination = createAction(
  '[Books] Set pagination',
  props<{ pagination: Pagination }>()
);

export const setSorting = createAction(
  '[Books] Set sorting',
  props<{ sorting: Sorting }>()
);

export const setKeyword = createAction(
  '[Books] Set keyword',
  props<{ keyword: string }>()
);

export const setIsLoading = createAction(
  '[Books] Set isLoading',
  props<{ isLoading: boolean }>()
);

export const resetState = createAction('[Books] Reset');

export const getDescription = createAction(
  '[Books] Get description',
  props<{ isbn: string }>()
);

export const setDescription = createAction(
  '[Books] Set description',
  props<{ params: BookDescription }>()
);

export const submitNewBook = createAction(
  '[Books] Submit to API',
  props<{ book: CreateBook }>()
);
