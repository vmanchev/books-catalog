# Books Catalog API

REST API, based on Express and using static file as data source. Additionally, `faker` is used to generate the books list and `formidable` is used for "Add new book" form processing and cover image upload.

## Install

```
cd backend

npm install
```

## Scripts

| Script description | Command |
|---|---|
| Generate new seed data and override `db.json` file | `npm run seed` |
| Start the server | `npm run start` |
|||

### Notes

1. By design, `isbn` is considered to be a unique value so it is used as book identifier, instead of `id`.

2. When books list is generated with `faker`, cover image urls are provided as URLs of remote images. When cover image is uploaded via "Add new book" endpoint, it is stored at `backend/public/images` and served via `http://localhost:3000/images/*`

3. When a new book is created, `isbn` value is validated against the existing books list and its value must be unique.

4. Postman collection: [books-catalog-api.postman_collection.json](books-catalog-api.postman_collection.json)
