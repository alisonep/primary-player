var exec = require('child_process').exec;
var cmd = 'mongoimport -d soundcloud -c songs --type csv --file bulkdata.csv --headerline';

const Song = require('./mongodb').song;

Song.deleteMany({}, function(err,) {
  console.log('deleted all existing records');
  exec(cmd, function(error, stdout, stderr) {
    if (error) console.log(error);
    console.log('added csv records')
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    process.exit(0);
  });
});

