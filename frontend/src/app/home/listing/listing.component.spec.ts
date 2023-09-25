import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingComponent } from './listing.component';
import { SortingDirection } from '@app/types/sorting-direction.enum';
import { Book } from '@app/types/book.type';

describe('ListingComponent', () => {
  let component: ListingComponent;
  let fixture: ComponentFixture<ListingComponent>;
  let onSortingChangeEmitSpy: jasmine.Spy;
  let onBookSelectedEmitSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListingComponent],
    })
      .overrideComponent(ListingComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(ListingComponent);
    component = fixture.componentInstance;

    onSortingChangeEmitSpy = spyOn(component.onSortingChange, 'emit');
    onBookSelectedEmitSpy = spyOn(component.onBookSelected, 'emit');

    fixture.detectChanges();
  });

  describe('onMatSortChange', () => {
    it('should emit provided value', () => {
      // ARRANGE
      onSortingChangeEmitSpy.calls.reset();
      const sorting = {
        active: 'author',
        direction: SortingDirection.DESC,
      };

      // ACT
      component.onMatSortChange(sorting);

      // ASSERT
      expect(onSortingChangeEmitSpy).toHaveBeenCalledWith(sorting);
    });
  });

  describe('onTableRowClicked', () => {
    it('should emit provided value', () => {
      // ARRANGE
      onBookSelectedEmitSpy.calls.reset();
      const bookMock: Book = {
        title: 'book title',
        author: 'book author',
        isbn: 'book isbn',
        cover: 'https://loremflickr.com/250/375/book?lock=6276319232917504',
      };

      // ACT
      component.onTableRowClicked(bookMock);

      // ASSERT
      expect(onBookSelectedEmitSpy).toHaveBeenCalledWith(bookMock);
    });
  });
});
