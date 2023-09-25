import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';

import { BooksEffects } from './books.effects';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { BooksService } from '@app/services/books.service';
import { MemoizedSelector } from '@ngrx/store';
import { BooksSearchRequest } from '@app/types/books-search-request.type';
import * as BooksActions from './books.actions';
import * as BooksSelectors from './books.selectors';
import { SortingDirection } from '@app/types/sorting-direction.enum';
import { cold } from 'jasmine-marbles';
import { Router } from '@angular/router';

describe('BooksEffects', () => {
  let actions$: Observable<any>;
  let effects: BooksEffects;
  let mockStore: MockStore;
  let dispatchSpy: jasmine.Spy;
  let selectSearchParamsMock: MemoizedSelector<any, BooksSearchRequest>;

  const RouterMock = jasmine.createSpyObj('Router', ['navigate']);
  RouterMock.navigate.and.returnValue(of({}));

  const searchParamsMock: BooksSearchRequest = {
    keyword: 'test4',
    sorting: {
      active: 'author',
      direction: SortingDirection.DESC,
    },
    pagination: {
      page: 2,
      limit: 10,
    },
  };

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

  const BooksServiceMock = jasmine.createSpyObj('BooksService', [
    'search',
    'create',
    'getDescription',
  ]);
  BooksServiceMock.search.and.returnValue(
    of({
      books: booksMock,
      pagination: {
        limit: 15,
        page: 2,
        totalCount: 60,
        totalPages: 4,
      },
    })
  );
  BooksServiceMock.create.and.returnValue(of({}));
  BooksServiceMock.getDescription.and.returnValue(of({}));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BooksEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        { provide: BooksService, useValue: BooksServiceMock },
        { provide: Router, useValue: RouterMock },
      ],
    });

    mockStore = TestBed.inject(MockStore);
    dispatchSpy = spyOn(mockStore, 'dispatch');
    selectSearchParamsMock = mockStore.overrideSelector(
      BooksSelectors.selectSearchParams,
      null
    );
    mockStore.refreshState();

    effects = TestBed.inject(BooksEffects);
  });

  describe('searchBooks$', () => {
    it('should call BooksService.search() with search params from store', fakeAsync(() => {
      // ARRANGE
      selectSearchParamsMock.setResult(searchParamsMock);
      mockStore.refreshState();
      BooksServiceMock.search.calls.reset();

      // ACT
      actions$ = of(BooksActions.searchBooks());
      effects.searchBooks$.subscribe();
      tick();

      expect(BooksServiceMock.search).toHaveBeenCalledWith(searchParamsMock);
    }));

    it('should return expected actions', () => {
      // ARRANGE
      selectSearchParamsMock.setResult(searchParamsMock);
      mockStore.refreshState();
      BooksServiceMock.search.calls.reset();

      // ACT && ASSERT
      actions$ = of(BooksActions.searchBooks());
      expect(effects.searchBooks$).toBeObservable(
        cold('(abc|)', {
          a: BooksActions.setBooksInStore({ books: booksMock }),
          b: BooksActions.updatePagination({
            pagination: {
              limit: 15,
              page: 2,
              totalCount: 60,
              totalPages: 4,
            },
          }),
          c: BooksActions.setIsLoading({ isLoading: false }),
        })
      );
    });
  });

  describe('getDescription$', () => {
    it('should call BooksService.getDescription() with ISBN from action payload', fakeAsync(() => {
      BooksServiceMock.getDescription.calls.reset();

      // ACT
      actions$ = of(BooksActions.getDescription({ isbn: '123' }));
      effects.getDescription$.subscribe();
      tick();

      // ASSERT
      expect(BooksServiceMock.getDescription).toHaveBeenCalledWith('123');
    }));

    it('should return BooksAction.setDescription() with description from response when description text is found', () => {
      // ARRANGE
      BooksServiceMock.getDescription.and.returnValue(
        of({
          isbn: '123',
          description: 'book description',
        })
      );
      BooksServiceMock.getDescription.calls.reset();

      // ACT && ASSERT
      actions$ = of(BooksActions.getDescription({ isbn: '123' }));
      expect(effects.getDescription$).toBeObservable(
        cold('(a|)', {
          a: BooksActions.setDescription({
            params: {
              isbn: '123',
              description: 'book description',
            },
          }),
        })
      );
    });

    it('should return BooksAction.setDescription() with description set to empty string when description text was not found', () => {
      // ARRANGE
      BooksServiceMock.getDescription.and.returnValue(
        of({
          isbn: '123',
        })
      );
      BooksServiceMock.getDescription.calls.reset();

      // ACT && ASSERT
      actions$ = of(BooksActions.getDescription({ isbn: '123' }));
      expect(effects.getDescription$).toBeObservable(
        cold('(a|)', {
          a: BooksActions.setDescription({
            params: {
              isbn: '123',
              description: '',
            },
          }),
        })
      );
    });

    it('should return BooksAction.setDescription() with description set to empty string when description text is null', () => {
      // ARRANGE
      BooksServiceMock.getDescription.and.returnValue(
        of({
          isbn: '123',
          description: null,
        })
      );
      BooksServiceMock.getDescription.calls.reset();

      // ACT && ASSERT
      actions$ = of(BooksActions.getDescription({ isbn: '123' }));
      expect(effects.getDescription$).toBeObservable(
        cold('(a|)', {
          a: BooksActions.setDescription({
            params: {
              isbn: '123',
              description: '',
            },
          }),
        })
      );
    });
  });

  describe('submitNewBook$', () => {
    describe('in case of error', () => {
      beforeEach(fakeAsync(() => {
        // ARRANGE
        BooksServiceMock.create.and.returnValue(
          throwError(() => ({ error: { error: 'error message' } }))
        );
        BooksServiceMock.create.calls.reset();
        dispatchSpy.calls.reset();
        RouterMock.navigate.calls.reset();

        // ACT
        actions$ = of(
          BooksActions.submitNewBook({ book: booksMock[0] as any })
        );
        effects.submitNewBook$.subscribe();
        tick();
      }));

      it('should call BooksService.create() with book from action payload', () => {
        expect(BooksServiceMock.create).toHaveBeenCalledWith(booksMock[0]);
      });

      it('should dispatch BooksActions.setError() with error message from API response', () => {
        expect(dispatchSpy).toHaveBeenCalledWith(
          BooksActions.setError({ error: 'error message' })
        );
      });

      it('should not try to navigate to another page', () => {
        expect(RouterMock.navigate).not.toHaveBeenCalled();
      });
    });

    describe('in case of success', () => {
      beforeEach(fakeAsync(() => {
        // ARRANGE
        BooksServiceMock.create.and.returnValue(of({}));
        BooksServiceMock.create.calls.reset();
        dispatchSpy.calls.reset();
        RouterMock.navigate.calls.reset();

        // ACT
        actions$ = of(
          BooksActions.submitNewBook({ book: booksMock[0] as any })
        );
        effects.submitNewBook$.subscribe();
        tick();
      }));

      it('should call BooksService.create() with book from action payload', () => {
        expect(BooksServiceMock.create).toHaveBeenCalledWith(booksMock[0]);
      });

      it('should not dispatch any action', () => {
        expect(dispatchSpy).not.toHaveBeenCalled();
      });

      it('should navigate to home page', () => {
        expect(RouterMock.navigate).toHaveBeenCalledWith(['/']);
      });
    });
  });
});
