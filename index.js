import path from 'path';
import express from 'express';
import multer from 'multer';
import mkdirp from 'mkdirp';
import potatify from './lib/potatify.js';
import constants from './lib/constants.js';

mkdirp(constants.UPLOAD_DIR);
mkdirp(constants.OUTPUT_DIR);

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, constants.UPLOAD_DIR),
  filename: (req, file, cb) => cb(null, file.originalname)
});

let upload = multer({ storage: storage });
let port = process.env.PORT || 8080;
let app = express();

app.use(express.static(path.join(__dirname, '/static')));

app.post('/potato', upload.single('file'), async(req, res) => {
  let potatoPath = await potatify(req.file.path);
  res.sendFile(path.join(__dirname, potatoPath));
});

app.listen(port);
