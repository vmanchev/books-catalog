import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookComponent } from './book.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Book } from '@app/types/book.type';
import * as BooksSelectors from '@store/books/books.selectors';
import { MemoizedSelector } from '@ngrx/store';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let mockStore: MockStore;
  let dispatchSpy: jasmine.Spy;
  let selectBooksMock: MemoizedSelector<null, Book[]>;

  let bookMock: Book = {
    title: 'book title',
    author: 'book author',
    isbn: 'book isbn',
    cover: 'https://loremflickr.com/250/375/book?lock=6276319232917504',
  };

  const MatDialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookComponent],
      providers: [
        provideMockStore(),
        { provide: MAT_DIALOG_DATA, useValue: bookMock },
        { provide: MatDialogRef, useValue: MatDialogRefMock },
      ],
    })
      .overrideComponent(BookComponent, { set: { template: '' } })
      .compileComponents();

    mockStore = TestBed.inject(MockStore);
    dispatchSpy = spyOn(mockStore, 'dispatch');

    selectBooksMock = mockStore.overrideSelector(
      BooksSelectors.selectBooks,
      []
    );
    mockStore.refreshState();

    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should dispatch getDescription with isbn when provided book does not have description', () => {
      // ARRANGE
      dispatchSpy.calls.reset();
      bookMock.description = null;

      // ACT
      component.ngOnInit();

      // ASSERT
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: '[Books] Get description',
        isbn: bookMock.isbn,
      });
    });

    it('should not dispatch getDescription with isbn when provided book does have description', () => {
      // ARRANGE
      dispatchSpy.calls.reset();
      bookMock.description = 'book description';

      // ACT
      component.ngOnInit();

      // ASSERT
      expect(dispatchSpy).not.toHaveBeenCalledWith({
        type: '[Books] Get description',
        isbn: bookMock.isbn,
      });
    });

    describe('when description is found but initial book record does not have it', () => {
      beforeEach(() => {
        // ARRANGE
        component.description = null;
        component.isDescriptionLoading = true;
        selectBooksMock.setResult([
          {
            ...bookMock,
            description: '',
          },
        ]);
        bookMock.description = null;
        fixture.detectChanges();

        // ACT
        component.ngOnInit();
      });

      it('should isDescriptionLoading to false', () => {
        expect(component.isDescriptionLoading).toBeFalse();
      });

      it('should set description to provided value', () => {
        expect(component.description).toBe('');
      });
    });
  });

  describe('close', () => {
    it('should call dialogRef.close', () => {
      // ARRANGE
      MatDialogRefMock.close.calls.reset();

      // ACT
      component.close();

      // ASSERT
      expect(MatDialogRefMock.close).toHaveBeenCalled();
    });
  });
});
