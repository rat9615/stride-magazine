const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');
const grid = require('gridfs-stream');
const storage = require('node-persist');
const isDownloaded = require('../middleware/checkDownloads');

const db = mongoose.connection;
let Grid;

db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', () => {
  console.log('GridFS Connected Successfully');
  Grid = grid(db.db, mongoose.mongo);
});

router.get('/', async (req, res) => {
  console.log(storage.values());
  const value = await storage.getItem('views');
  res.render('index', { views: value });
});

router.get('/pdf/:id', isDownloaded, (req, res) => {
  const readstream = Grid.createReadStream({ _id: req.params.id });
  res.setHeader('Content-disposition', `filename= Stride2020.pdf`);
  res.setHeader('Content-type', 'application/pdf');
  readstream.pipe(res);
});

module.exports = router;
