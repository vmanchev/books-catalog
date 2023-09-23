const { faker } = require('@faker-js/faker');
const saveState = require('./helpers/save-state');

const items = { books: [] };

for (let i = 0; i < 100; i++) {
  const isbn = faker.commerce.isbn();

  items.books.push({
    isbn,
    author: faker.person.fullName(),
    title: faker.commerce.productName(),
    description: faker.lorem.paragraph(25),
    cover: faker.image.urlLoremFlickr({
      category: 'book',
      width: 250,
      height: 375,
    }),
  });
}

saveState(items);
