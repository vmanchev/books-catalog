export interface CreateBook {
  isbn: string;
  author: string;
  title: string;
  description?: string;
  cover: File;
}
