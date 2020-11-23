const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');
const grid = require('gridfs-stream');
const storage = require('node-persist');

const db = mongoose.connection;
let Grid;
let views = 0;

db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', () => {
  console.log('GridFS Connected Successfully');
  Grid = grid(db.db, mongoose.mongo);
});

storage
  .init()
  .then(() => storage.getItem('views'))
  .then((value) => {
    if (value > 0) {
      views = value;
    } else {
      views = 0;
    }
  });

router.get('/', async (req, res) => {
  // eslint-disable-next-line no-plusplus
  views++;
  storage.setItem('views', views).then(async () => {
    await res.json(views);
  });
  await res.render('index', { views });
});

router.get('/pdf/:id', (req, res) => {
  const readstream = Grid.createReadStream({ _id: req.params.id });
  res.setHeader('Content-disposition', `filename= Stride2020.pdf`);
  res.setHeader('Content-type', 'application/pdf');
  readstream.pipe(res);
});

module.exports = router;
