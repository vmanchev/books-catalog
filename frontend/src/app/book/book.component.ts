import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Book } from '@models/book.type';
import { Store } from '@ngrx/store';
import * as BooksActions from '@store/books/books.actions';
import * as BooksSelectors from '@store/books/books.selectors';
import { tap } from 'rxjs';

@Component({
  selector: 'books-catalog-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  isImageLoading = true;
  isDescriptionLoading = true;

  description$ = this.store
    .select(BooksSelectors.getDescriptionByIsbn(this.book.isbn))
    .pipe(
      tap((hasDescription) => {
        if (hasDescription) {
          this.isDescriptionLoading = false;
        }
      })
    );

  constructor(
    @Inject(MAT_DIALOG_DATA) public book: Book,
    private dialogRef: MatDialogRef<BookComponent>,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(BooksActions.getDescription({ isbn: this.book.isbn }));
  }

  close() {
    this.dialogRef.close();
  }
}
