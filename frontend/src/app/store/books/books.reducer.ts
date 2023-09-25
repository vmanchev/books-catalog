import { createReducer, on } from '@ngrx/store';
import * as BooksActions from './books.actions';
import { Book } from '@models/book.type';
import { Sorting } from '@models/sorting.type';
import { SortingDirection } from '@app/types/sorting-direction.enum';

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
  error: string | null;
}

export const initialState: State = {
  items: null,
  page: 1,
  limit: 5,
  totalCount: null,
  totalPages: null,
  sorting: {
    active: 'title',
    direction: SortingDirection.ASC,
  },
  keyword: null,
  isLoading: null,
  error: null,
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
  })),
  on(BooksActions.setError, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(BooksActions.resetError, (state) => ({
    ...state,
    error: null,
  })),
  on(BooksActions.resetState, () => ({
    ...initialState,
  })),
  on(BooksActions.setDescription, (state, action) => {
    const items = [...state.items];

    const idx = items.findIndex((item) => item.isbn === action.params.isbn);
    items[idx] = {
      ...items[idx],
      description: action.params.description,
    };

    return {
      ...state,
      items,
    };
  })
);
