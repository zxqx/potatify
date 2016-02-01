var path = require('path');
var express = require('express');
var multer = require('multer');
var mkdirp = require('mkdirp');
var potatify = require('./lib/potatify.js');
var constants = require('./lib/constants.js');

mkdirp(constants.UPLOAD_DIR);
mkdirp(constants.OUTPUT_DIR);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, constants.UPLOAD_DIR)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });
var port = process.env.PORT || 8080;
var app = express();

app.use(express.static(path.join(__dirname, '/static')));

app.post('/potato', upload.single('file'), function(req, res) {
  potatify(req.file.path)
    .then(function(potatoPath) {
      res.sendFile(path.join(__dirname , potatoPath));
    });
});

app.listen(port);
