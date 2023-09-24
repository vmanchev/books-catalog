import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  concatMap,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { EMPTY, from } from 'rxjs';
import * as BooksActions from './books.actions';
import * as BooksSelectors from './books.selectors';
import { BooksService } from '@services/books.service';
import { Action, Store } from '@ngrx/store';
import { BooksSearchRequest } from '@models/books-search-request.type';
import { Router } from '@angular/router';

@Injectable()
export class BooksEffects {
  searchBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.searchBooks),
      withLatestFrom(this.store.select(BooksSelectors.selectSearchParams)),
      switchMap(([__, params]: [Action, BooksSearchRequest]) =>
        this.booksService.search(params).pipe(
          concatMap((result) =>
            from([
              BooksActions.setBooksInStore({ books: result.books }),
              BooksActions.updatePagination({
                pagination: result.pagination,
              }),
              BooksActions.setIsLoading({ isLoading: false }),
            ])
          )
        )
      )
    )
  );

  getDescription$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.getDescription),
      switchMap((action) =>
        this.booksService.getDescription(action.isbn).pipe(
          concatMap((result) =>
            from([
              BooksActions.setDescription({
                params: {
                  ...result,
                  description: result.description ? result.description : '',
                },
              }),
            ])
          )
        )
      )
    )
  );

  submitNewBook$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BooksActions.submitNewBook),
        switchMap((action) =>
          this.booksService.create(action.book).pipe(
            catchError((errorResponse) => {
              this.store.dispatch(
                BooksActions.setError({ error: errorResponse.error.error })
              );

              return EMPTY;
            }),
            tap(() => this.router.navigate(['/']))
          )
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private booksService: BooksService,
    private store: Store,
    private router: Router
  ) {}
}
