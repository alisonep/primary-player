const faker = require('faker');
const Song = require('./index');

let songUrls = [
  'https://fectracks.s3-us-west-2.amazonaws.com/BunkerSIM.mp3',
  'https://fectracks.s3-us-west-2.amazonaws.com/Chronicles+of+Fate.mp3',
  'https://fectracks.s3-us-west-2.amazonaws.com/Dragomon+Hunters+Release+Trailer.mp3',
  'https://fectracks.s3-us-west-2.amazonaws.com/Electro+City.mp3',
  'https://fectracks.s3-us-west-2.amazonaws.com/Gem+Hunters+Boss.mp3',
  'https://fectracks.s3-us-west-2.amazonaws.com/Gem+Hunters+Overworld.mp3',
  'https://fectracks.s3-us-west-2.amazonaws.com/Heroes-+Assault.mp3',
  'https://fectracks.s3-us-west-2.amazonaws.com/Heroes-+Base.mp3',
  'https://fectracks.s3-us-west-2.amazonaws.com/Invasion.mp3',
  'https://fectracks.s3-us-west-2.amazonaws.com/Nauticrawl+Theme.mp3',
  'https://fectracks.s3-us-west-2.amazonaws.com/Revelations+Trailer+Full.mp3',
  'https://fectracks.s3-us-west-2.amazonaws.com/SodaDunegeon4.mp3',
  'https://fectracks.s3-us-west-2.amazonaws.com/SodaDungen.mp3',
  'https://fectracks.s3-us-west-2.amazonaws.com/SodaDungeon2.mp3',
  'https://fectracks.s3-us-west-2.amazonaws.com/SodaDungeon3.mp3',
  'https://fectracks.s3-us-west-2.amazonaws.com/Warlords+Cinematic+Trailer.mp3',
  'https://fectracks.s3-us-west-2.amazonaws.com/Wild+Battle.mp3'
];

function randomBetween(min, max) {
  if (min < 0) {
      return min + Math.random() * (Math.abs(min)+max);
  }else {
      return min + Math.random() * max;
  }
}

const createFakeSong = (j) => new Song({
  author: faker.name.findName(),
  title: faker.random.word(),
  genre: faker.random.word(),
  tags: faker.random.words(),
  artwork_url: 'https://source.unsplash.com/350x350/?music',
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
