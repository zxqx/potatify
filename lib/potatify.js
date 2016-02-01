var gm = require('gm');
var path = require('path');
var Promise = require('bluebird');
var constants = require('./constants.js');

Promise.promisifyAll(gm.prototype);

module.exports = potatify;

function potatify(filepath)
{
  var parsedFilepath = path.parse(filepath);
  var outputFilename = parsedFilepath.name + constants.OUTPUT_FILE_SUFFIX + parsedFilepath.ext;
  var outputFilepath = path.join(constants.OUTPUT_DIR, outputFilename);

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
