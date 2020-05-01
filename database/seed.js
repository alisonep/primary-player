const dotenv = require('dotenv').config();

const DBName = process.env.DB;

if (DBName === 'MONGO') {
  const seed = require('./mongo/seed');
} else {
  const seed = require('./postgres/seed');
}

seed();
