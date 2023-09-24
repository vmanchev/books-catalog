import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Book } from '@models/book.type';
import { Sorting } from '@models/sorting.type';

@Component({
  selector: 'books-catalog-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent {
  @Input() books: Book[];
  @Input() isLoading: boolean;
  @Output() onSortingChange: EventEmitter<Sorting> = new EventEmitter();

  displayedColumns: string[] = ['cover', 'title', 'author', 'isbn'];

  onMatSortChange(event: Sort) {
    this.onSortingChange.emit(event as Sorting);
  }
}
