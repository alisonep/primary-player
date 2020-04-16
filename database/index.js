const MongoSong = require('./mongo/mongodb');
const PgSong = require('./postgres/postgres');
const dotenv = require('dotenv').config();

const DBName = process.env.DB;

module.exports = DBName === 'MONGO' ? Song : PgSong;
