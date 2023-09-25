import { reducer, initialState, State } from './books.reducer';
import * as BooksActions from './books.actions';
import { SortingDirection } from '@app/types/sorting-direction.enum';

describe('Books Reducer', () => {
  const booksMock = [
    {
      isbn: '978-1-6520-5597-6',
      author: 'Clark Fisher',
      title: 'Fantastic Frozen Shirt',
      cover: 'https://loremflickr.com/250/375/book?lock=6276319232917504',
    },
    {
      isbn: '978-1-131-14710-9',
      author: 'Dr. Shannon Graham',
      title: 'Unbranded Plastic Chair',
      cover: 'https://loremflickr.com/250/375/book?lock=8517043173195776',
    },
  ];

  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('setBooksInStore', () => {
    it('should set new value for `items`', () => {
      // ARRANGE
      const action = BooksActions.setBooksInStore({
        books: booksMock,
      });

      const expectedState = {
        ...initialState,
        items: booksMock,
      } as State;

      // ACT
      const result = reducer(initialState, action);

      // ASSERT
      expect(result).toEqual(expectedState);
    });
  });

  describe('updatePagination', () => {
    it('should set new partial values for pagintion-related properties', () => {
      // ARRANGE
      const action = BooksActions.updatePagination({
        pagination: {
          limit: 15,
          page: 2,
        },
      });

      const expectedState = {
        ...initialState,
        limit: 15,
        page: 2,
      } as State;

      // ACT
      const result = reducer(initialState, action);

      // ASSERT
      expect(result).toEqual(expectedState);
    });
  });

  describe('setSorting', () => {
    it('should set new value for sorting property', () => {
      // ARRANGE
      const action = BooksActions.setSorting({
        sorting: {
          active: 'author',
          direction: SortingDirection.DESC,
        },
      });

      const expectedState = {
        ...initialState,
        sorting: {
          active: 'author',
          direction: SortingDirection.DESC,
        },
      } as State;

      // ACT
      const result = reducer(initialState, action);

      // ASSERT
      expect(result).toEqual(expectedState);
    });
  });

  describe('setKeyword', () => {
    it('should set new value for keyword', () => {
      // ARRANGE
      const action = BooksActions.setKeyword({ keyword: 'test4' });

      const expectedState = {
        ...initialState,
        keyword: 'test4',
      };

      // ACT
      const result = reducer(initialState, action);

      // ASSERT
      expect(result).toEqual(expectedState);
    });
  });

  describe('setIsLoading', () => {
    it('should set new value for isLoading', () => {
      // ARRANGE
      const action = BooksActions.setIsLoading({ isLoading: true });

      const expectedState = {
        ...initialState,
        isLoading: true,
      };

      // ACT
      const result = reducer(initialState, action);

      // ASSERT
      expect(result).toEqual(expectedState);
    });
  });

  describe('setError', () => {
    it('should set new value for error', () => {
      // ARRANGE
      const action = BooksActions.setError({ error: 'some error' });

      const expectedState = {
        ...initialState,
        error: 'some error',
      };

      // ACT
      const result = reducer(initialState, action);

      // ASSERT
      expect(result).toEqual(expectedState);
    });
  });

  describe('resetError', () => {
    it('should reset the error value', () => {
      // ARRANGE
      const action = BooksActions.resetError();

      // ACT
      const result = reducer(
        {
          ...initialState,
          error: 'some error',
        },
        action
      );

      // ASSERT
      expect(result).toEqual(initialState);
    });
  });

  describe('resetState', () => {
    it('should reset the the entire slice state', () => {
      // ARRANGE
      const action = BooksActions.resetState();

      // ACT
      const result = reducer(
        {
          items: booksMock,
          page: 2,
          limit: 15,
          totalCount: 60,
          totalPages: 4,
          sorting: {
            active: 'author',
            direction: SortingDirection.DESC,
          },
          keyword: 'test4',
          isLoading: true,
          error: 'some error',
        },
        action
      );

      // ASSERT
      expect(result).toEqual(initialState);
    });
  });

  describe('setDescription', () => {
    it('should set description for book by ISBN', () => {
      // ARRANGE
      const action = BooksActions.setDescription({
        params: {
          isbn: '978-1-131-14710-9',
          description: 'book description',
        },
      });

      // ACT
      const result = reducer(
        {
          ...initialState,
          items: booksMock,
        },
        action
      );

      // ASSERT
      expect(
        result.items.find((item) => item.isbn === '978-1-131-14710-9')
          .description
      ).toBe('book description');
    });
  });
});
