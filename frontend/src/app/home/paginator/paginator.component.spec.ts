import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;
  let onPaginationChangedEmitSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginatorComponent],
    })
      .overrideComponent(PaginatorComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;

    onPaginationChangedEmitSpy = spyOn(component.onPaginationChanged, 'emit');

    fixture.detectChanges();
  });

  describe('handlePageChange', () => {
    it('should emit page and limit', () => {
      // ARRANGE
      onPaginationChangedEmitSpy.calls.reset();
      const event = {
        pageIndex: 2,
        previousPageIndex: 1,
        pageSize: 10,
        length: 10,
      };

      // ACT
      component.handlePageChange(event);

      // ASSERT
      expect(onPaginationChangedEmitSpy).toHaveBeenCalledWith({
        page: 3,
        limit: 10,
      });
    });
  });
});
