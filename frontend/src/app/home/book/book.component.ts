import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Book } from '@models/book.type';
import { Store } from '@ngrx/store';
import * as BooksActions from '@store/books/books.actions';
import * as BooksSelectors from '@store/books/books.selectors';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'books-catalog-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit, OnDestroy {
  isImageLoading = true;
  isDescriptionLoading = typeof this.book.description?.length === 'string';
  hasDescription = false;
  description: string;
  private desctroy$ = new Subject();

  constructor(
    @Inject(MAT_DIALOG_DATA) public book: Book,
    private dialogRef: MatDialogRef<BookComponent>,
    private store: Store
  ) {}

  ngOnInit(): void {
    if (!this.book.description) {
      this.store.dispatch(
        BooksActions.getDescription({ isbn: this.book.isbn })
      );
    }

    this.store
      .select(BooksSelectors.getDescriptionByIsbn(this.book.isbn))
      .pipe(
        tap((description) => {
          this.hasDescription = typeof description === 'string';
          if (this.hasDescription && !this.book.description) {
            this.isDescriptionLoading = false;
            this.description = description;
          }
        }),
        takeUntil(this.desctroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.desctroy$.next(true);
    this.desctroy$.complete();
  }

  close() {
    this.dialogRef.close();
  }
}
