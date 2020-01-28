const faker = require('faker');
const Song = require('./index');

let createFakeSong = () => {
  return new Song({
    author: faker.name.firstName(),
    title: faker.random.word(),
    genre: faker.random.word(),
    tags: faker.random.words(),
    artwork_url: faker.system.filePath(),
    audio_file_path: faker.system.filePath(),
    like_count: faker.random.number(),
    play_count: faker.random.number(),
    repost_count: faker.random.number()
  });
}
let numberOfFakeRows = 100;
for( let i = 0; i < numberOfFakeRows; i++ ){
  // let fakeSong = createFakeSong();
  // fakeSong.save()
  // .then( (addedSong)=>{
  //   console.log(addedSong);
  // })
}