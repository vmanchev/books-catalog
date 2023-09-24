import { Component, Input } from '@angular/core';
import { Book } from '@models/book.type';

@Component({
  selector: 'books-catalog-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent {
  @Input() books: Book[];
  @Input() isLoading: boolean;

  displayedColumns: string[] = ['cover', 'title', 'author', 'isbn'];
}
