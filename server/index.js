const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const dotenv = require('dotenv').config();
const cors = require('cors');
const songController = require('./controllers/songs');

//allow * origin on all routes
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

//serve static requests from dist folder
app.use(express.static(path.join(__dirname, '../client/dist')));

// retrieve all songs
// app.get('/songs', songController.getSongs);

// retrieve one song
app.get('/songs/:id', songController.getSong);

// // add one song
// app.post('/song', songController.addSong);

// // update one song
// app.post('/song/:id', songController.updateSong);

// // delete one song
// app.post('/removeSong/:id', songController.removeSong);


app.listen(process.env.PORT, () => console.log(`serving on port ${process.env.PORT}!`));
