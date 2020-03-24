const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const path = require('path');
const dotenv = require('dotenv').config();

const password = process.env.MONGOKEY;

const produri = 'mongodb+srv://alison:'+ password +'@cluster0-bw2fr.mongodb.net/soundcloud?retryWrites=true&w=majority';
const devuri = 'mongodb://localhost/soundcloud';
const uri = password === undefined ? devuri : produri;

const connection = mongoose.connect(uri, { useNewUrlParser: true });


const songSchema = mongoose.Schema({
  _id: Number,
  author: {
    type: String,
  },
  title: {
    type: String,
  },
  genre: {
    type: String,
  },
  tags: {
    type: String,
  },
  artwork_url: {
    type: String,
  },
  audio_file_path: {
    type: String,
  },
  like_count: {
    type: Number,
  },
  play_count: {
    type: Number,
  },
  repost_count: {
    type: Number,
  },
}, { timestamps: true });
songSchema.plugin(AutoIncrement);
const song = mongoose.model('Song', songSchema);


module.exports = song;
