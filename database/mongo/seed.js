const faker = require('faker');
const Song = require('./mongodb');

function runSeed() {
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

  const createFakeSong = (j) => new Song({
    author: faker.name.findName(),
    title: faker.random.word(),
    genre: faker.random.word(),
    tags: faker.random.words(),
    artwork_url: 'https://d1vgv8e3fkby3.cloudfront.net/img/artwork' + randomBetween(1,22) + '.jpeg',
    audio_file_path: songUrls[j],
    like_count: faker.random.number(),
    play_count: faker.random.number(),
    repost_count: faker.random.number(),
  });
  const numberOfFakeRows = 6;
  for (let i = 0; i < numberOfFakeRows; i++) {
    for (let j = 0; j < songUrls.length; j++) {
      const fakeSong = createFakeSong(j);
      fakeSong.save()
        .then((addedSong) => {
          console.log('added Song: ', addedSong);
        });
    }
  }
}

module.exports = runSeed;