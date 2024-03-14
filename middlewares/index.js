const corsMiddleware = require('./cors');
const errorHandlerMiddleware = require('./errorHandler');
const uploadMiddleware = require('./upload');
const staticFilesMiddleware = require('./staticFiles');


module.exports = {
  corsMiddleware,
  errorHandlerMiddleware,
  uploadMiddleware,
  staticFilesMiddleware,
};
