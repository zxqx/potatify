var gm = require('gm');
var path = require('path');
var Promise = require('bluebird');
var express = require('express');
var multer = require('multer');
var mkdirp = require('mkdirp');
var app = express();

mkdirp('./uploads', function() {});
mkdirp('./potatoes', function() {});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

var port = process.env.PORT || 8080;
process.env.PWD = process.cwd();

app.use(express.static(process.env.PWD + '/static'));

app.post('/potatify', upload.single('file'), function(req, res) {
  potatify(req.file.path)
    .then(function(potatoPath) {
      res.sendFile(__dirname + '/' + potatoPath);
    });
});

app.listen(port);

Promise.promisifyAll(gm.prototype);

function potatify(filepath)
{
  var parsedFilepath = path.parse(filepath);
  var outputFilename = parsedFilepath.name + '-potatified' + parsedFilepath.ext;
  var outputFilepath = path.join('./potatoes', outputFilename);

  return gm(filepath).sizeAsync()
    .then(function(size) {
      var width = size.width;

      return gm(filepath)
        .resize(width/2)
        .resize(width)
        .quality(7)
        .writeAsync(outputFilepath);
    })
    .then(function() {
      return outputFilepath;
    });
}
