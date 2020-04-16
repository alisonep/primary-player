const pgp = require('pg-promise')({
  capSQL: true // capitalize all generated SQL
});
const faker = require('faker');
const path = require('path');
const dotenv = require('dotenv').config();

const password = process.env.POSTGRESKEY;
const environment = process.env.NODE_ENV;

const prodhost = '';
const devhost = 'localhost';
const host = environment === 'production' ? prodhost : devhost;

let songUrls = [
  'http://d2kzfado6qqgq8.cloudfront.net/BunkerSIM.mp3',
  'http://d2kzfado6qqgq8.cloudfront.net/Chronicles+of+Fate.mp3',
  'http://d2kzfado6qqgq8.cloudfront.net/Dragomon+Hunters+Release+Trailer.mp3',
  'http://d2kzfado6qqgq8.cloudfront.net/Electro+City.mp3',
  'http://d2kzfado6qqgq8.cloudfront.net/Gem+Hunters+Boss.mp3',
  'http://d2kzfado6qqgq8.cloudfront.net/Gem+Hunters+Overworld.mp3',
  'http://d2kzfado6qqgq8.cloudfront.net/Heroes-+Assault.mp3',
  'http://d2kzfado6qqgq8.cloudfront.net/Heroes-+Base.mp3',
  'http://d2kzfado6qqgq8.cloudfront.net/Invasion.mp3',
  'http://d2kzfado6qqgq8.cloudfront.net/Nauticrawl+Theme.mp3',
  'http://d2kzfado6qqgq8.cloudfront.net/Revelations+Trailer+Full.mp3',
  'http://d2kzfado6qqgq8.cloudfront.net/SodaDunegeon4.mp3',
  'http://d2kzfado6qqgq8.cloudfront.net/SodaDungen.mp3',
  'http://d2kzfado6qqgq8.cloudfront.net/SodaDungeon2.mp3',
  'http://d2kzfado6qqgq8.cloudfront.net/SodaDungeon3.mp3',
  'http://d2kzfado6qqgq8.cloudfront.net/Warlords+Cinematic+Trailer.mp3',
  'http://d2kzfado6qqgq8.cloudfront.net/Wild+Battle.mp3'
];

function randomBetween(min, max) {
  return Math.floor(min + Math.random() * max);
}

const conString = 'postgres://postgres:'+password+'@localhost:5432/soundcloud';
const db = pgp(conString); // your database object
const cs = new pgp.helpers.ColumnSet([
  'id',
  'author',
  'title',
  'genre',
  'tags',
  'artwork_url',
  'audio_file_path',
  'like_count',
  'play_count',
  'repost_count',
  'createdAt',
  'updatedAt',
], { table: 'Songs' });

function generateData(idx) {
  if (idx >= 1000) { return null; }
  var data = [];

  for (var i = 0; i < 10000; i++) {
    data.push({
      id: idx*10000 + i,
      author: faker.name.findName(),
      title: faker.random.word(),
      genre: faker.random.word(),
      tags: faker.random.words(),
      artwork_url: 'https://d1vgv8e3fkby3.cloudfront.net/img/artwork' + randomBetween(1,22) + '.jpeg',
      audio_file_path: songUrls[randomBetween(0,16)],
      like_count: faker.random.number(),
      play_count: faker.random.number(),
      repost_count: faker.random.number(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return data;
}

//drop from table if already populated
db.none('TRUNCATE TABLE public."Songs"')
  .then(() => {
    console.log('deleted existing records');
  })
  .catch(error => {
    console.log('error when deleting records ', error);
  });

var data;
var start = Date.now();
db.tx('massive-insert', t => {
  return t.sequence(index => {
    data = generateData(index);
    if (data) {
      const insert = pgp.helpers.insert(data, cs);
      return t.none(insert); 
    }
  })
})
  .then(() => {
    // COMMIT has been executed
    console.log('Added 10M records, Duration:', (Date.now() - start) / 1000);
  })
  .catch(error => {
    console.log('error bulk inserting: ', error);
  });