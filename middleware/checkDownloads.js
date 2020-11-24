const storage = require('node-persist');

let views = 0;

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

module.exports = (req, res, next) => {
  // eslint-disable-next-line no-plusplus
  views++;
  storage.setItem('views', views);
  return next();
};
