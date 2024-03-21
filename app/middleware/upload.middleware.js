const multer = require('multer');
const utils = require('../shared/utils/utils.index');
const shared = require('../shared/shared.index');
const { IMAGE } = shared.constants;
const { Storage, Filter } = utils.fileHelper;

const uploadMiddleware = multer({
  storage: Storage,
  fileFilter: Filter,
}).single(IMAGE);

/** Upload middleware */
const uploadMiddlewareHandler = {
  /** Configures upload to the app */
  useUpload: (app) => app.use(uploadMiddleware),
};

module.exports = uploadMiddlewareHandler;