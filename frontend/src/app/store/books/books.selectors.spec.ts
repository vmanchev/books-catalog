import * as fromBooks from './books.reducer';
import { selectBooksState } from './books.selectors';

describe('Books Selectors', () => {
  it('should select the feature state', () => {
    const result = selectBooksState({
      [fromBooks.booksFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
