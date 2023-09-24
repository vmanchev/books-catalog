import { Pagination } from './pagination.type';
import { Sorting } from './sorting.type';

export type BooksSearchRequest = {
  keyword?: string;
  sorting?: Sorting;
  pagination?: Pick<Pagination, 'page' | 'limit'>;
};
