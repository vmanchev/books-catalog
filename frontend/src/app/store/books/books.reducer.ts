import { Action, createReducer, on } from '@ngrx/store';
import * as BooksActions from './books.actions';
import { Book } from '@models/book.type';
import { Pagination } from '@models/pagination.type';
import { Sorting } from '@models/sorting.type';

export const booksFeatureKey = 'books';

export interface State {
  items: Book[] | null;
  pagination: Pagination | null;
  currentPage: number;
  sorting: Sorting | null;
  keyword: string | null;
  isLoading: boolean;
}

export const initialState: State = {
  items: null,
  pagination: null,
  currentPage: null,
  sorting: null,
  keyword: null,
  isLoading: null,
};

export const reducer = createReducer(
  initialState,

  on(BooksActions.setBooksInStore, (state, action) => ({
    ...state,
    items: action.books,
  })),
  on(BooksActions.setPagination, (state, action) => ({
    ...state,
    pagination: action.pagination,
  })),
  on(BooksActions.setSorting, (state, action) => ({
    ...state,
    sorting: action.sorting,
  })),
  on(BooksActions.setKeyword, (state, action) => ({
    ...state,
    keyword: action.keyword,
  })),
  on(BooksActions.setIsLoading, (state, action) => ({
    ...state,
    isLoading: action.isLoading,
  })),
  on(BooksActions.setCurrentPage, (state, action) => ({
    ...state,
    currentPage: action.currentPage,
  })),
  on(BooksActions.resetState, () => ({
    ...initialState,
  }))
);
