const faker = require('faker');
const Song = require('./index');

const createFakeSong = () => new Song({
  author: faker.name.findName(),
  title: faker.random.word(),
  genre: faker.random.word(),
  tags: faker.random.words(),
  artwork_url: 'https://source.unsplash.com/350x350/?music',
  audio_file_path: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  like_count: faker.random.number(),
  play_count: faker.random.number(),
  repost_count: faker.random.number(),
});
const numberOfFakeRows = 100;
for (let i = 0; i < numberOfFakeRows; i++) {
  const fakeSong = createFakeSong();
  fakeSong.save()
    .then((addedSong) => {
      console.log(addedSong);
    });
}
