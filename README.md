# Books Catalog

Simple books catalog project, using json-server as backend and Angular as frontend.

## How to run the project

First you need to start the backend. Open a new terminal and run:

```
cd backend

// different books every time
yarn start:fresh

// or the same books every time
yarn start:static
```

Wait until:

```
Resources
http://localhost:3000/books

Home
http://localhost:3000
```
Then start the frontend. Open a second terminal and run:

```
cd frontend
yarn start
```

Wait until:

```
** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **
```

## Backend

Mock REST API, based on `json-server`. Additionally, `faker` is used to generate the books list and `formidable` is used for "Add new book" form processing and cover image upload.

### Notes

1. Items unique identifier was changed from `id` (json-server's default), to `isbn` as it is a unique value.

2. When books list is generated with `faker`, cover image urls are provided as URLs to remote images. When cover image is uploaded via "Add new book" endpoint, it is stored at `backend/public/images` and served via `http://localhost:3000/images/*`

3. When a new book is created, `isbn` value is validated against the existing books list and its value must be unique. 

4. A postman collection can be found at `backend/books-catalog-api.postman_collection.json`

## Project management

1. git repository: https://github.com/vmanchev/books-catalog
2. project board: https://github.com/users/vmanchev/projects/1