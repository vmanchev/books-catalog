import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ENVIRONMENT } from '../tokens/environment.token';
import { Environment } from '../types/environment.type';
import { Observable } from 'rxjs';
import { BooksSearchResponse } from '../types/books-search-response.type';
import { BooksSearchRequest } from '../types/books-search-request.type';
import { CreateBook } from '../types/create-book.type';
import { BookDescription } from '../types/books-description.type';
import { Book } from '../types/book.type';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private get resourcePath() {
    return `${this.env.apiUrl}/books`;
  }

  constructor(
    @Inject(ENVIRONMENT) private env: Environment,
    private http: HttpClient
  ) {}

  search(params?: BooksSearchRequest): Observable<BooksSearchResponse> {
    const options = params
      ? { params: new HttpParams({ fromObject: params }) }
      : {};

    return this.http.get<BooksSearchResponse>(this.resourcePath, options);
  }

  find(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${this.resourcePath}/${isbn}`);
  }

  getDescription(isbn: string): Observable<BookDescription> {
    return this.http.get<BookDescription>(
      `${this.resourcePath}/${isbn}/description`
    );
  }

  create(book: CreateBook): Observable<Book> {
    return this.http.post<Book>(`${this.resourcePath}`, book);
  }
}
