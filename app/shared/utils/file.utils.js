const multer = require('multer');
const {v4: uuid4} = require('uuid');

const constants = require('../constants/constants');

const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    cb(null, uuid4());
  },
});

const Filter = (req, file, cb) => {
  if (
    file.mimetype === constants.IMAGE_PNG ||
    file.mimetype === constants.IMAGE_JPG ||
    file.mimetype === constants.IMAGE_JPEG
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = {Storage, Filter};
