import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComponent } from './create.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';
import * as BooksSelectors from '@store/books/books.selectors';
import { Book } from '@app/types/book.type';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let mockStore: MockStore;
  let dispatchSpy: jasmine.Spy;
  let selectErrorMock: MemoizedSelector<any, string>;

  const bookMock: Book = {
    title: 'book title',
    author: 'book author',
    isbn: 'book isbn',
    cover: 'https://loremflickr.com/250/375/book?lock=6276319232917504',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateComponent],
      providers: [provideMockStore()],
    })
      .overrideComponent(CreateComponent, { set: { template: '' } })
      .compileComponents();

    mockStore = TestBed.inject(MockStore);
    dispatchSpy = spyOn(mockStore, 'dispatch');
    selectErrorMock = mockStore.overrideSelector(
      BooksSelectors.selectError,
      'test4'
    );

    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('handleSubmit', () => {
    beforeEach(() => {
      // ARRANGE
      component.selectedFile = { name: 'test4' } as any;
      component.form.patchValue({
        ...bookMock,
        cover: null,
      });
      fixture.detectChanges();

      // ACT
      component.handleSubmit();
    });

    it('should dispatch resetError', () => {
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: '[Books] Reset error',
      });
    });

    it('should dispatch submitNewBook with provided value', () => {
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: '[Books] Submit to API',
        book: {
          ...bookMock,
          cover: { name: 'test4' } as any,
          description: null,
        },
      });
    });
  });

  describe('handleApiErrors', () => {
    it('should set `duplicate` error code for ISBN when error in store is ISBN.DUPLICATE', () => {
      // ARRANGE
      component.form.reset();
      selectErrorMock.setResult('ISBN.DUPLICATE');
      mockStore.refreshState();

      // ARRANGE
      expect(component.form.controls.isbn.errors['duplicate']).toBeTrue();
    });

    it('should set ISBN in error state when error in store is not ISBN.DUPLICATE', () => {
      // ARRANGE
      component.form.reset();
      selectErrorMock.setResult('SOMETHING.DUPLICATE');
      mockStore.refreshState();

      // ARRANGE
      expect(component.form.controls.isbn.errors['duplicate']).toBeUndefined();
    });
  });
});
