const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv').config({
  path: path.join(__dirname, '../.env')
});
const cors = require('cors');
const songController = require('./controllers/songs');

//allow * origin on all routes
app.use(cors());

//serve static requests from dist folder
app.use(express.static(path.join(__dirname, '../client/dist')));

// retrieve all songs
app.get('/songs', songController.getSongs);

// retrieve one song
app.get('/songs/:id', songController.getSong);


app.listen(process.env.PORT, () => console.log(`serving on port ${process.env.PORT}!`));
