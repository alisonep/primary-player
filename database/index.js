const Song = require('./mongodb');
const dotenv = require('dotenv').config();

const DBName = process.env.DB;

module.exports = DBName === 'MONGO' ? Song : Song;
