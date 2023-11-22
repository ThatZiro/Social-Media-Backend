const { faker } = require('@faker-js/faker');

const generateRandomUser = () => ({
  username: faker.internet.userName(),
  email: faker.internet.email(),
});

const users = Array.from({length:20}, generateRandomUser);

module.exports = users;