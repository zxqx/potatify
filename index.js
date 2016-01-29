var fs = require('fs');
var gm = require('gm');

gm('./man.jpg').quality(5).write('./man-potatified.jpg', function() {});
