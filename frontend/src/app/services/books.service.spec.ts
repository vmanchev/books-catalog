import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BooksService } from './books.service';
import { ENVIRONMENT } from '@app/tokens/environment.token';
import { first } from 'rxjs';
import { SortingDirection } from '@app/types/sorting-direction.enum';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ENVIRONMENT,
          useValue: {
            production: false,
            apiUrl: 'http://localhost:1234',
          },
        },
      ],
    });
    service = TestBed.inject(BooksService);
  });

  describe('find', () => {
    it('should perform a GET request with provided ISBN', () => {
      // ARRANGE
      const httpMock = TestBed.inject(HttpTestingController);
      const service = TestBed.inject(BooksService);

      // ACT
      service.find('123').pipe(first()).subscribe();

      // ASSERT
      const request = httpMock.expectOne('http://localhost:1234/books/123');
      request.flush({});

      expect(request.request.method).toBe('GET');
      httpMock.verify();
    });
  });

  describe('getDescription', () => {
    it('should perform a GET request with provided ISBN', () => {
      // ARRANGE
      const httpMock = TestBed.inject(HttpTestingController);
      const service = TestBed.inject(BooksService);

      // ACT
      service.getDescription('123').pipe(first()).subscribe();

      // ASSERT
      const request = httpMock.expectOne(
        'http://localhost:1234/books/123/description'
      );
      request.flush({});

      expect(request.request.method).toBe('GET');
      httpMock.verify();
    });
  });

  describe('create', () => {
    it('should perform post request with FormData', () => {
      // ARRANGE
      const httpMock = TestBed.inject(HttpTestingController);
      const service = TestBed.inject(BooksService);
      const bookMock = {
        title: 'title',
        author: 'author',
        isbn: 'isbn',
        description: 'description',
        cover: 'cover',
      } as any;

      const requestBody = new FormData();
      requestBody.append('isbn', 'isbn');
      requestBody.append('title', 'title');
      requestBody.append('author', 'author');
      requestBody.append('cover', 'cover');
      requestBody.append('description', 'description');

      // ACT
      service.create(bookMock).pipe(first()).subscribe();

      // ASSERT
      const request = httpMock.expectOne('http://localhost:1234/books');
      request.flush({});

      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual(requestBody);
      httpMock.verify();
    });
  });

  describe('search', () => {
    it('should perform GET request with search parameters', () => {
      // ARRANGE
      const httpMock = TestBed.inject(HttpTestingController);
      const service = TestBed.inject(BooksService);
      const params = {
        keyword: 'test4',
        sorting: {
          active: 'author',
          direction: SortingDirection.DESC,
        },
        pagination: {
          page: 2,
          limit: 15,
        },
      };
      const expectedUrl =
        'http://localhost:1234/books?active=author&direction=desc&page=2&limit=15&keyword=test4';

      // ACT
      service.search(params).pipe(first()).subscribe();

      // ASSERT
      const request = httpMock.expectOne(expectedUrl);
      request.flush({});

      expect(request.request.method).toBe('GET');
      httpMock.verify();
    });
  });
});
