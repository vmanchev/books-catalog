import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBooks from './books.reducer';
import { BooksSearchRequest } from '@models/books-search-request.type';

export const selectBooksState = createFeatureSelector<fromBooks.State>(
  fromBooks.booksFeatureKey
);

export const selectKeyword = createSelector(
  selectBooksState,
  (state) => state.keyword
);

export const selectPagination = createSelector(selectBooksState, (state) => ({
  page: state.page,
  limit: state.limit,
  totalCount: state.totalCount,
  totalPages: state.totalPages,
}));

export const selectSorting = createSelector(
  selectBooksState,
  (state) => state.sorting
);

export const selectSearchParams = createSelector(
  selectKeyword,
  selectSorting,
  selectPagination,
  (keyword, sorting, pagination) =>
    ({
      keyword: keyword,
      sorting: sorting,
      pagination: pagination,
    } as BooksSearchRequest)
);

export const selectBooks = createSelector(
  selectBooksState,
  (state) => state.items
);

export const selectIsLoading = createSelector(
  selectBooksState,
  (state) => state.isLoading
);

export const selectLimit = createSelector(
  selectBooksState,
  (state) => state?.limit ?? null
);

export const selectPage = createSelector(
  selectBooksState,
  (state) => state?.page ?? null
);

export const selectPageAndLimit = createSelector(selectBooksState, (state) => ({
  page: state?.page ?? null,
  limit: state?.limit ?? null,
}));

export const getDescriptionByIsbn = (isbn: string) =>
  createSelector(
    selectBooks,
    (books) => books.find((book) => book.isbn === isbn)?.description
  );

export const selectError = createSelector(
  selectBooksState,
  (state) => state?.error
);
