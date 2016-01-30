var gm = require('gm');
var filename = process.argv[2];
var filenameParts = filename.split('.');
var filenameWithoutExtension = filenameParts[0];
var filenameExtension = filenameParts[1];
var output = filenameWithoutExtension + '-potatified.' + filenameExtension;

gm(filename).size(function(err, size) {
  var width = size.width;
  gm(filename).resize(width/2).resize(width).quality(7).write(output, function() {});
});
