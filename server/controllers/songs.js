const Song = require('../../database/index');

module.exports.getSong = (req, res) => {
  console.log("cheese", req.params.id);
  Song.findById(req.params.id)
    .then((song) => {
      res.send(song);
    })
    .catch((error) => {
      res.status(404).send('song not found');
    });
};

module.exports.getSongs = (req, res) => {
  Song.find()
    .then((songs) => {
      res.send(songs);
    })
    .catch((error) => {
      res.status(404).send('songs not found');
    });
};
