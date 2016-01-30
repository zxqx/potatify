var gm = require('gm');

gm('./bval.jpg').resize(150).resize(300).quality(7).write('./bval-potatified.jpg', function() {});
