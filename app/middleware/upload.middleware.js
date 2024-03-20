const multer = require('multer');
const {fileHelper, constants} = require('../shared/shared.index');

const uploadMiddleware = multer({
  storage: fileHelper.storage,
  fileFilter: fileHelper.filter,
}).single(constants.IMAGE);

/** Upload middleware */
const uploadMiddlewareHandler = {
  /** Configures upload to the app */
  useUpload: (app) => app.use(uploadMiddleware),
};

module.exports = uploadMiddlewareHandler;