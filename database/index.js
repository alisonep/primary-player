const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fec-primary-player', {useNewUrlParser: true});

let song = mongoose.model('Song', {
  author:  {
    type: String,
  },
  title: {
    type: String
  },
  genre: {
    type: String
  },
  tags: {
    type: String
  },
  artwork_url: {
    type: String
  },
  audio_file_path: {
    type: String
  },
  like_count: {
    type: Number
  },
  play_count: {
    type: Number
  },
  repost_count: {
    type: Number
  },
  // timestamps: {
  //   createdAt: 'uploaded_at'
  // }
});

module.exports = song;