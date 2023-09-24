import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Book } from '@models/book.type';
import { Store } from '@ngrx/store';
import * as BooksActions from '@store/books/books.actions';
import * as BooksSelectors from '@store/books/books.selectors';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'books-catalog-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit, AfterViewInit {
  books$: Observable<Book[]>;

  isLoading$ = this.store.select(BooksSelectors.selectIsLoading);

  displayedColumns: string[] = ['cover', 'title', 'author', 'isbn'];

  constructor(private store: Store) {}

  ngOnInit(): void {
    // this.store.dispatch(BooksActions.searchBooks());
  }

  ngAfterViewInit(): void {
    this.books$ = this.store.select(BooksSelectors.selectBooks).pipe(
      tap((books) => {
        if (!Array.isArray(books)) {
          this.store.dispatch(BooksActions.setIsLoading({ isLoading: true }));
          this.store.dispatch(BooksActions.searchBooks());
        }
      })
    );
  }
}
