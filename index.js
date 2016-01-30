var gm = require('gm');
var path = require('path');
var Promise = require('bluebird');

var filepath = process.argv[2];
var parsedFilepath = path.parse(filepath);
var outputFilename = parsedFilepath.name + '-potatified' + parsedFilepath.ext;
var outputFilepath = path.join(parsedFilepath.dir, outputFilename);

Promise.promisifyAll(gm.prototype);

gm(filepath).sizeAsync()
  .then(function(size) {
    var width = size.width;

    return gm(filepath)
      .resize(width/2)
      .resize(width)
      .quality(7)
      .writeAsync(outputFilepath);
  })
  .then(function() {
    console.log('potato: ' + outputFilepath);
  });
