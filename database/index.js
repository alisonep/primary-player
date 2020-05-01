const dotenv = require('dotenv').config();

const DBName = process.env.DB;

const Song = DBName === 'MONGO' ? require('./mongo/mongodb') : require('./postgres/postgres');

module.exports = Song;
