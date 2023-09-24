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

export const selectPagination = createSelector(
  selectBooksState,
  (state) => state.pagination
);

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

export const selectCurrentPage = createSelector(
  selectBooksState,
  (state) => state.currentPage
);

export const selectLimit = createSelector(
  selectPagination,
  (state) => state?.limit ?? null
);

export const selectPage = createSelector(
  selectPagination,
  (state) => state?.page ?? null
);
