import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Book } from '@models/book.type';
import { Store } from '@ngrx/store';
import * as BooksActions from '@store/books/books.actions';
import * as BooksSelectors from '@store/books/books.selectors';
import {
  Observable,
  Subject,
  filter,
  of,
  takeUntil,
  withLatestFrom,
} from 'rxjs';
@Component({
  selector: 'books-catalog-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  books$: Observable<Book[]>;
  isLoading$: Observable<boolean> = of(true);

  private destroy$ = new Subject();

  constructor(private store: Store) {}

  ngAfterViewInit(): void {
    this.books$ = this.store.select(BooksSelectors.selectBooks);
    this.isLoading$ = this.store.select(BooksSelectors.selectIsLoading);
    this.triggerSearchOnParamsChange();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  filterChangeHandler(keyword: string) {
    this.store.dispatch(BooksActions.setCurrentPage({ currentPage: null }));
    this.store.dispatch(
      BooksActions.setKeyword({ keyword: keyword?.length ? keyword : null })
    );
  }

  private triggerSearchOnParamsChange() {
    this.store
      .select(BooksSelectors.selectSearchParams)
      .pipe(
        withLatestFrom(this.store.select(BooksSelectors.selectCurrentPage)),
        filter(
          ([params, currentPage]) => params.pagination?.page !== currentPage
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.store.dispatch(BooksActions.setIsLoading({ isLoading: true }));
        this.store.dispatch(BooksActions.searchBooks());
      });
  }
}
