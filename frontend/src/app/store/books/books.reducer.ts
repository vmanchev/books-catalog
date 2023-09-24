import { Action, createReducer, on } from '@ngrx/store';
import * as BooksActions from './books.actions';
import { Book } from '@models/book.type';
import { Pagination } from '@models/pagination.type';
import { Sorting } from '@models/sorting.type';

export const booksFeatureKey = 'books';

export interface State {
  items: Book[] | null;
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  sorting: Sorting;
  keyword: string | null;
  isLoading: boolean;
}

export const initialState: State = {
  items: null,
  page: 1,
  limit: 5,
  totalCount: null,
  totalPages: null,
  sorting: {
    active: 'title',
    direction: 'asc',
  },
  keyword: null,
  isLoading: null,
};

export const reducer = createReducer(
  initialState,

  on(BooksActions.setBooksInStore, (state, action) => ({
    ...state,
    items: action.books,
  })),
  on(BooksActions.updatePagination, (state, action) => ({
    ...state,
    ...action.pagination,
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
  }))
);
