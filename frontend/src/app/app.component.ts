import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Book } from '@models/book.type';
import { Pagination } from '@models/pagination.type';
import { Sorting } from '@models/sorting.type';
import { Store } from '@ngrx/store';
import * as BooksActions from '@store/books/books.actions';
import * as BooksSelectors from '@store/books/books.selectors';
import {
  Observable,
  Subject,
  combineLatest,
  distinctUntilChanged,
  of,
  takeUntil,
} from 'rxjs';
import { BookComponent } from './book/book.component';
@Component({
  selector: 'books-catalog-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  books$: Observable<Book[]>;
  isLoading$: Observable<boolean> = of(true);
  paginaton$: Observable<Pagination> = of({} as Pagination);

  private destroy$ = new Subject();

  constructor(private store: Store, public dialog: MatDialog) {}

  ngAfterViewInit(): void {
    this.books$ = this.store.select(BooksSelectors.selectBooks);
    this.isLoading$ = this.store.select(BooksSelectors.selectIsLoading);
    this.paginaton$ = this.store.select(BooksSelectors.selectPagination);
    this.triggerSearchOnParamsChange();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  filterChangeHandler(keyword: string) {
    this.store.dispatch(
      BooksActions.updatePagination({ pagination: { page: 1 } })
    );
    this.store.dispatch(
      BooksActions.setKeyword({ keyword: keyword?.length ? keyword : null })
    );
  }

  paginationChangeHandler(pagination: Pick<Pagination, 'page' | 'limit'>) {
    this.store.dispatch(BooksActions.updatePagination({ pagination }));
  }

  sortingChangeHandler(sorting: Sorting) {
    this.store.dispatch(BooksActions.setSorting({ sorting }));
  }

  bookSelectedHandler(book: Book) {
    this.dialog.open(BookComponent, {
      data: { ...book },
      panelClass: 'book__dialog',
    });
  }

  private triggerSearchOnParamsChange() {
    combineLatest([
      this.store.select(BooksSelectors.selectPageAndLimit),
      this.store.select(BooksSelectors.selectKeyword),
      this.store.select(BooksSelectors.selectSorting),
    ])
      .pipe(
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.store.dispatch(BooksActions.setIsLoading({ isLoading: true }));
        this.store.dispatch(BooksActions.searchBooks());
      });
  }
}
