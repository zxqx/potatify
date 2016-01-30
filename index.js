var gm = require('gm');
var Promise = require('bluebird');
var filename = process.argv[2];
var filenameParts = filename.split('.');
var filenameWithoutExtension = filenameParts[0];
var filenameExtension = filenameParts[1];
var output = filenameWithoutExtension + '-potatified.' + filenameExtension;

Promise.promisifyAll(gm.prototype);

gm(filename).sizeAsync()
  .then(function(size) {
    var width = size.width;

    return gm(filename)
      .resize(width/2)
      .resize(width)
      .quality(7)
      .writeAsync(output)
  })
  .then(function() {
    console.log('potato');
  });
