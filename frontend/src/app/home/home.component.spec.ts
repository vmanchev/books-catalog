import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { HomeComponent } from './home.component';
import { MatDialog } from '@angular/material/dialog';
import * as BooksSelectors from '@store/books/books.selectors';
import { MemoizedSelector } from '@ngrx/store';
import { Book } from '@app/types/book.type';
import { SortingDirection } from '@app/types/sorting-direction.enum';
import { BookComponent } from './book/book.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockStore: MockStore;
  let dispatchSpy: jasmine.Spy;

  const bookMock: Book = {
    title: 'book title',
    author: 'book author',
    isbn: 'book isbn',
    cover: 'https://loremflickr.com/250/375/book?lock=6276319232917504',
  };

  const MatDialogMock = jasmine.createSpyObj('MatDialog', ['open']);

  let selectBooksMock: MemoizedSelector<any, Book[]>;
  let selectIsLoadingMock: MemoizedSelector<any, boolean>;
  let selectPaginationMock: MemoizedSelector<any, any>;
  let selectPageAndLimitMock: MemoizedSelector<
    any,
    { page: number; limit: number }
  >;
  let selectKeywordMock: MemoizedSelector<any, string>;
  let selectSortingMock: MemoizedSelector<
    any,
    {
      active: string;
      direction: SortingDirection;
    }
  >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, BookComponent],
      providers: [
        provideMockStore(),
        { provide: MatDialog, useValue: MatDialogMock },
      ],
    })
      .overrideComponent(HomeComponent, { set: { template: '' } })
      .overrideComponent(BookComponent, { set: { template: '' } })
      .compileComponents();

    mockStore = TestBed.inject(MockStore);
    dispatchSpy = spyOn(mockStore, 'dispatch');

    selectBooksMock = mockStore.overrideSelector(
      BooksSelectors.selectBooks,
      null
    );
    selectIsLoadingMock = mockStore.overrideSelector(
      BooksSelectors.selectIsLoading,
      true
    );

    selectPaginationMock = mockStore.overrideSelector(
      BooksSelectors.selectPagination,
      null
    );

    selectPageAndLimitMock = mockStore.overrideSelector(
      BooksSelectors.selectPageAndLimit,
      null
    );

    selectKeywordMock = mockStore.overrideSelector(
      BooksSelectors.selectKeyword,
      null
    );

    selectSortingMock = mockStore.overrideSelector(
      BooksSelectors.selectSorting,
      null
    );

    mockStore.refreshState();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnDestroy', () => {
    it('should dispatch resetState', () => {
      // ARRANGE
      dispatchSpy.calls.reset();

      // ACT
      component.ngOnDestroy();

      // ASSERT
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: '[Books] Reset state',
      });
    });
  });

  describe('filterChangeHandler', () => {
    beforeEach(() => {
      // ARRANGE
      dispatchSpy.calls.reset();
    });

    it('should set current page in pagination config to 1', () => {
      // ACT
      component.filterChangeHandler('test');

      // ASSERT
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: '[Books] Update pagination',
        pagination: { page: 1 },
      });
    });

    it('should dispatch setKeyword with keyword value when provided', () => {
      // ACT
      component.filterChangeHandler('test2');

      // ASSERT
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: '[Books] Set keyword',
        keyword: 'test2',
      });
    });

    it('should dispatch setKeyword with null when value is empty string', () => {
      // ACT
      component.filterChangeHandler('');

      // ASSERT
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: '[Books] Set keyword',
        keyword: null,
      });
    });

    it('should dispatch setKeyword with null when value is null', () => {
      // ACT
      component.filterChangeHandler(null);

      // ASSERT
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: '[Books] Set keyword',
        keyword: null,
      });
    });
  });

  describe('paginationChangeHandler', () => {
    it('should dispatch updatePagination with provided value', () => {
      // ARRANGE
      const pagination = { page: 2, limit: 15 };
      dispatchSpy.calls.reset();

      // ACT
      component.paginationChangeHandler(pagination);

      // ASSERT
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: '[Books] Update pagination',
        pagination,
      });
    });
  });

  describe('sortingChangeHandler', () => {
    it('should dispatch setSorting with provided value', () => {
      // ARRANGE
      const sorting = { active: 'author', direction: SortingDirection.DESC };
      dispatchSpy.calls.reset();

      // ACT
      component.sortingChangeHandler(sorting);

      // ASSERT
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: '[Books] Set sorting',
        sorting,
      });
    });
  });

  describe('bookSelectedHandler', () => {
    it('should open the book info dialog with expected configuration', () => {
      // ARRANGE
      MatDialogMock.open.calls.reset();

      // ACT
      component.bookSelectedHandler(bookMock);

      // ASSERT
      expect(MatDialogMock.open).toHaveBeenCalledWith(BookComponent, {
        data: { ...bookMock },
        panelClass: 'book__dialog',
      });
    });
  });

  describe('triggerSearchOnParamsChange', () => {
    describe('when search params has changed', () => {
      beforeEach(() => {
        // ARRANGE
        dispatchSpy.calls.reset();
        selectPageAndLimitMock.setResult({ page: 1, limit: 10 });
        selectKeywordMock.setResult(null);
        selectSortingMock.setResult(null);
        mockStore.refreshState();

        // ACT
        selectPageAndLimitMock.setResult({ page: 1, limit: 10 });
        mockStore.refreshState();
      });

      it('should dispatch setIsLoading with true', () => {
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: '[Books] Set isLoading',
          isLoading: true,
        });
      });

      it('should dispatch searchBooks', () => {
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: '[Books] Search',
        });
      });
    });
  });
});
