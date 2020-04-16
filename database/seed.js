const mongoseed = require('./mongo/seed');
const pgseed = require('./postgres/seed');
const dotenv = require('dotenv').config();

const DBName = process.env.DB;

const seed = DBName === 'MONGO' ? mongoseed : pgseed;

seed();
