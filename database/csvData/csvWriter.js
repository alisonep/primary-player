const fs = require('fs');
const faker = require('faker');

let writeStream = fs.createWriteStream('./bulkdata.csv')
  .on('error', function (err) {
  
    console.log(err);

  });

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

var colHeaders = ['_id', 'author', 'title', 'genre', 'tags', 'artwork_url', 'audio_file_path', 'like_count', 'play_count', 'repost_count', 'createdAt', 'updatedAt']
writeStream.write(colHeaders.join(','));

function generateData(idx) {
  var data = [];

  for (var i = 1; i <= 10000; i++) {
    data.push([
      idx*10000 + i,
      faker.name.findName(),
      faker.random.word(),
      faker.random.word(),
      faker.random.words(),
      'https://d1vgv8e3fkby3.cloudfront.net/img/artwork' + randomBetween(1,22) + '.jpeg',
      songUrls[randomBetween(0,16)],
      faker.random.number(),
      faker.random.number(),
      faker.random.number(),
      new Date(),
      new Date()
    ].join(','));
  }
  return data;
}

var newLine;

(async () => {
  for (var i = 0; i < 1000; i++) {
    let lines = generateData(i);
    writeStream.write('\n' + lines.join('\n'));
  }
})();




writeStream.end();