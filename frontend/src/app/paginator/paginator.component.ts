import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Pagination } from '@models/pagination.type';

@Component({
  selector: 'books-catalog-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  @Input() pagination: Pagination;
  @Output() onPaginationChanged: EventEmitter<
    Pick<Pagination, 'page' | 'limit'>
  > = new EventEmitter();

  handlePageChange(event: PageEvent) {
    this.onPaginationChanged.emit({
      page: event.pageIndex + 1,
      limit: event.pageSize,
    });
  }
}
