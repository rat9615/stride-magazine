const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');
const grid = require('gridfs-stream');

const db = mongoose.connection;

let Grid;
db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', () => {
  console.log('GridFS Connected Successfully');
  Grid = grid(db.db, mongoose.mongo);
});

router.get('/', (req, res) => res.render('index'));

router.get('/pdf/:id', (req, res) => {
  const readstream = Grid.createReadStream({ _id: req.params.id });
  res.setHeader('Content-disposition', `filename= Stride2020.pdf`);
  res.setHeader('Content-type', 'application/pdf');
  readstream.pipe(res);
});

module.exports = router;
