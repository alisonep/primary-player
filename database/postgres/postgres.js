const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const dotenv = require('dotenv').config();

const password = process.env.POSTGRESKEY;
const environment = process.env.NODE_ENV;

const host = process.env.HOST;

const sequelize = new Sequelize('soundcloud', 'postgres', password, {
  host: host,
  dialect: 'postgres',
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

const song = sequelize.define('Song', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  author: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
  },
  genre: {
    type: DataTypes.STRING,
  },
  tags: {
    type: DataTypes.STRING,
  },
  artwork_url: {
    type: DataTypes.STRING,
  },
  audio_file_path: {
    type: DataTypes.STRING,
  },
  like_count: {
    type: DataTypes.STRING,
  },
  play_count: {
    type: DataTypes.INTEGER,
  },
  repost_count: {
    type: DataTypes.INTEGER,
  },
}, {
  timestamps: true,
});

module.exports = song;
