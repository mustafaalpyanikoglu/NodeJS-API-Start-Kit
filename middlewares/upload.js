const multer = require('multer');
const {fileHelper, constants} = require('.././utils');

const upload = multer({
  storage: fileHelper.storage,
  fileFilter: fileHelper.filter,
}).single(constants.IMAGE);

module.exports = upload;
