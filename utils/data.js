const faker = require('faker');

const generateRandomUser = () => ({
  username: faker.internet.username(),
  email: faker.internet.email(),
});

const users = Array.from({length:20}, generateRandomUser);

module.exports = users;