const { faker } = require('@faker-js/faker');

function generateBooks() {
  const items = { books: [] };

  for (let i = 0; i < 100; i++) {
    items.books.push({
      author: faker.person.fullName(),
      isbn: faker.helpers.unique(faker.commerce.isbn),
      title: faker.commerce.productName(),
      description: faker.lorem.paragraph(25),
      cover: faker.image.urlLoremFlickr({
        category: 'book',
        width: 250,
        height: 375,
      }),
    });
  }

  return items;
}

module.exports = generateBooks;
