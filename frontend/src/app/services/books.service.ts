import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ENVIRONMENT } from '@tokens/environment.token';
import { Environment } from '@models/environment.type';
import { Observable } from 'rxjs';
import { BooksSearchResponse } from '@models/books-search-response.type';
import { BooksSearchRequest } from '@models/books-search-request.type';
import { CreateBook } from '@models/create-book.type';
import { BookDescription } from '@models/book-description.type';
import { Book } from '@models/book.type';

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
      ? {
          params: new HttpParams({
            fromObject: this.getSearchParamsObject(params),
          }),
        }
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
    const formData = new FormData();

    formData.append('isbn', book.isbn);
    formData.append('title', book.title);
    formData.append('author', book.author);
    formData.append('cover', book.cover);

    if (book.description?.length) {
      formData.append('description', book.description);
    }

    return this.http.post<Book>(`${this.resourcePath}`, formData);
  }

  private getSearchParamsObject(params: BooksSearchRequest) {
    let searchParams = {
      ...params.sorting,
    } as any;

    if (params.pagination) {
      searchParams = {
        ...searchParams,
        page: params.pagination.page,
        limit: params.pagination.limit,
      };
    }

    if (params.keyword?.length) {
      searchParams = {
        ...searchParams,
        keyword: params.keyword,
      };
    }

    return searchParams;
  }
}
