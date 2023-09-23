export type BooksSearchRequest = {
  keyword?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
};
