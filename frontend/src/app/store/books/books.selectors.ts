import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBooks from './books.reducer';
import { BooksSearchRequest } from '@models/books-search-request.type';

export const selectBooksState = createFeatureSelector<fromBooks.State>(
  fromBooks.booksFeatureKey
);

export const selectSearchParams = createSelector(
  selectBooksState,
  (state) =>
    ({
      keyword: state.keyword,
      sorting: state.sorting,
      pagination: state.pagination,
    } as BooksSearchRequest)
);

export const selectPagination = createSelector(
  selectBooksState,
  (state) => state.pagination
);

export const selectSorting = createSelector(
  selectBooksState,
  (state) => state.sorting
);

export const selectBooks = createSelector(
  selectBooksState,
  (state) => state.items
);

export const selectIsLoading = createSelector(
  selectBooksState,
  (state) => state.isLoading
);
