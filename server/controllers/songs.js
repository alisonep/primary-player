
const dotenv = require('dotenv').config();
const DBName = process.env.DB;

const MongoMethods = require('../../database/mongo/controllers');
const PgMethods = require('../../database/postgres/controllers');

module.exports = DBName === 'MONGO' ? MongoMethods : PgMethods;
