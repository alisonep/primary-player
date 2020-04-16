const Song = require('./postgres');

module.exports.getSong = (req, res) => {
  var id = req.params.id;
  (async () => {
    try {
      await Song.findByPk(id)
        .then((song) => {
          res.send(song);
        })
        .catch((error) => {
          res.status(404).send('song not found ', error);
        });
    } catch (error) {
      res.status(404).send('song not found ', error);
    }
  })();
};

// module.exports.getSongs = (req, res) => {
//   Song.find()
//     .then((songs) => {
//       res.send(songs);
//     })
//     .catch((error) => {
//       res.status(404).send('songs not found');
//     });
// };

module.exports.addSong = (req, res) => {
  const newSong = new Song(req.body);

  var id = req.params.id;
  (async () => {
    try {
      await Song.findByPk(id)
        .then((song) => {
          res.send(song);
        })
        .catch((error) => {
          res.status(404).send('song not found ', error);
        });
    } catch (error) {
      res.status(404).send('song not found ', error);
    }
  })();
};

// module.exports.updateSong = (req, res) => {
//   var songID = req.params.id
 
//   Song.updateOne({_id: songID}, req.body, function(err, song) {
//     if (err) return console.error(err);
//     console.log('updated song: ', songID);
//     res.end();
//   });
// };

// module.exports.removeSong = (req, res) => {
//   var songID = +req.params.id
 
//   Song.deleteOne({_id: songID}, function(err, song) {
//     if (err) return console.error(err);
//     console.log(`removed ${song.deleteCount} songs: ${songID}`);
//     res.end();
//   });
// };