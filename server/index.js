const express = require('express');

const app = express();
const port = 3004;
const path = require('path');
const songController = require('./controllers/songs');


app.use(express.static(path.join(__dirname, '../client/dist')));


// retrieve all songs
app.get('/songs', songController.getSongs);

// retrieve one song
app.get('/songs/:id', songController.getSong);


app.listen(port, () => console.log(`serving on port ${port}!`));
