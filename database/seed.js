const faker = require('faker');
const Song = require('./index');

let songUrls = [
  'https://d1pzidawlf0u5w.cloudfront.net/BunkerSIM.mp3',
  'https://d1pzidawlf0u5w.cloudfront.net/Chronicles+of+Fate.mp3',
  'https://d1pzidawlf0u5w.cloudfront.net/Dragomon+Hunters+Release+Trailer.mp3',
  'https://d1pzidawlf0u5w.cloudfront.net/Electro+City.mp3',
  'https://d1pzidawlf0u5w.cloudfront.net/Gem+Hunters+Boss.mp3',
  'https://d1pzidawlf0u5w.cloudfront.net/Gem+Hunters+Overworld.mp3',
  'https://d1pzidawlf0u5w.cloudfront.net/Heroes-+Assault.mp3',
  'https://d1pzidawlf0u5w.cloudfront.net/Heroes-+Base.mp3',
  'https://d1pzidawlf0u5w.cloudfront.net/Invasion.mp3',
  'https://d1pzidawlf0u5w.cloudfront.net/Nauticrawl+Theme.mp3',
  'https://d1pzidawlf0u5w.cloudfront.net/Revelations+Trailer+Full.mp3',
  'https://d1pzidawlf0u5w.cloudfront.net/SodaDunegeon4.mp3',
  'https://d1pzidawlf0u5w.cloudfront.net/SodaDungen.mp3',
  'https://d1pzidawlf0u5w.cloudfront.net/SodaDungeon2.mp3',
  'https://d1pzidawlf0u5w.cloudfront.net/SodaDungeon3.mp3',
  'https://d1pzidawlf0u5w.cloudfront.net/Warlords+Cinematic+Trailer.mp3',
  'https://d1pzidawlf0u5w.cloudfront.net/Wild+Battle.mp3'
];

function randomBetween(min, max) {
  return Math.floor( min + Math.random() * max );
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
  for ( let j = 0; j < songUrls.length; j++ ) {
    const fakeSong = createFakeSong(j);
    fakeSong.save()
      .then((addedSong) => {
        console.log(addedSong);
      });
  }
}
