const express = require('express');

const app = express();

require('dotenv').config();

const mongoose = require('mongoose');
const server = require('http').Server(app);

const { ATLAS_URI } = process.env;

app.use('/public', express.static('public'));
app.set('view engine', 'ejs');

mongoose.connect(ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', () => {
  console.log('StrideDB Connected Successfully');
});

app.use('/', require('./routes/index'));

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on port ${port}`));
