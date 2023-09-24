import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ENVIRONMENT } from '@tokens/environment.token';
import { environment } from '@env/environment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BooksEffects } from '@store/books/books.effects';
import { ListingComponent } from './listing/listing.component';
import * as fromBooks from '@store/books/books.reducer';

@NgModule({
  declarations: [AppComponent, ListingComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    StoreModule.forRoot({
      [fromBooks.booksFeatureKey]: fromBooks.reducer,
    }),
    EffectsModule.forRoot(),
    !environment.production
      ? StoreDevtoolsModule.instrument({
          maxAge: 25,
          name: 'Books Catalog Store',
        })
      : [],
    EffectsModule.forFeature([BooksEffects]),
  ],
  providers: [{ provide: ENVIRONMENT, useValue: environment }],
  bootstrap: [AppComponent],
})
export class AppModule {}
