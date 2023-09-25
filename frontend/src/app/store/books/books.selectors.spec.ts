import { SortingDirection } from '@app/types/sorting-direction.enum';
import * as fromBooks from './books.reducer';
import * as BooksSelectors from './books.selectors';

describe('Books Selectors', () => {
  it('should select the feature state', () => {
    const result = BooksSelectors.selectBooksState({
      [fromBooks.booksFeatureKey]: {
        ...fromBooks.initialState,
      },
    });

    expect(result).toEqual(fromBooks.initialState);
  });

  describe('selectKeyword', () => {
    it('should return the keyword value', () => {
      // ARRANGE
      const result = BooksSelectors.selectKeyword.projector({
        keyword: 'test4',
      });

      // ASSERT
      expect(result).toEqual('test4');
    });
  });

  describe('selectPagination', () => {
    it('should return pagination configuration', () => {
      // ARRANGE
      const result = BooksSelectors.selectPagination.projector({
        page: 2,
        limit: 10,
        totalCount: 50,
        totalPages: 5,
      });

      // ASSERT
      expect(result).toEqual({
        page: 2,
        limit: 10,
        totalCount: 50,
        totalPages: 5,
      });
    });
  });

  describe('selectSorting', () => {
    it('should return sorting configuration', () => {
      // ARRANGE
      const result = BooksSelectors.selectSorting.projector({
        sorting: {
          active: 'author',
          direction: SortingDirection.DESC,
        },
      });

      // ASSERT
      expect(result).toEqual({
        active: 'author',
        direction: SortingDirection.DESC,
      });
    });
  });

  describe('selectBooks', () => {
    it('should return items', () => {
      // ARRANGE
      const result = BooksSelectors.selectBooks.projector({
        items: [
          {
            title: 'book title',
            author: 'book author',
            isbn: 'book isbn',
            cover: 'https://loremflickr.com/250/375/book?lock=6276319232917504',
          },
        ],
      });

      // ASSERT
      expect(result).toEqual([
        {
          title: 'book title',
          author: 'book author',
          isbn: 'book isbn',
          cover: 'https://loremflickr.com/250/375/book?lock=6276319232917504',
        },
      ]);
    });
  });

  describe('selectIsLoading', () => {
    it('should return the isLoading value', () => {
      // ARRANGE
      const result = BooksSelectors.selectIsLoading.projector({
        isLoading: true,
      });

      // ASSERT
      expect(result).toEqual(true);
    });
  });

  describe('selectLimit', () => {
    it('should return the limit value', () => {
      // ARRANGE
      const result = BooksSelectors.selectLimit.projector({
        limit: 10,
      });

      // ASSERT
      expect(result).toEqual(10);
    });

    it('should return null when limit is not set', () => {
      // ARRANGE
      const result = BooksSelectors.selectLimit.projector({
        limit: null,
      });

      // ASSERT
      expect(result).toBeNull();
    });
  });

  describe('selectPage', () => {
    it('should return the page value', () => {
      // ARRANGE
      const result = BooksSelectors.selectPage.projector({
        page: 10,
      });

      // ASSERT
      expect(result).toEqual(10);
    });

    it('should return null when page is not set', () => {
      // ARRANGE
      const result = BooksSelectors.selectPage.projector({
        limit: null,
      });

      // ASSERT
      expect(result).toBeNull();
    });
  });

  describe('selectPageAndLimit', () => {
    it('should return numeric values when provided in store', () => {
      // ARRANGE
      const result = BooksSelectors.selectPageAndLimit.projector({
        page: 10,
        limit: 15,
      });

      // ASSERT
      expect(result).toEqual({
        page: 10,
        limit: 15,
      });
    });

    it('should return null values when not provided in store', () => {
      // ARRANGE
      const result = BooksSelectors.selectPageAndLimit.projector({
        page: null,
        limit: null,
      });

      // ASSERT
      expect(result).toEqual({
        page: null,
        limit: null,
      });
    });
  });

  describe('selectError', () => {
    it('should return the error value', () => {
      // ARRANGE
      const result = BooksSelectors.selectError.projector({
        error: 'some error',
      });

      // ASSERT
      expect(result).toBe('some error');
    });
  });
});
