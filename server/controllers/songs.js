const dotenv = require('dotenv').config();
const DBName = process.env.DB;

const methods = DBName === 'MONGO' ? require('../../database/mongo/controllers') : require('../../database/postgres/controllers');

module.exports = methods;
