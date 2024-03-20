/**
 * Shared models and utilities.
 */
module.exports = {
  /** Models shared by the whole app */
  models: require("./models/models.index"),
  /** Shared utility functions */
  utils: require("./utils/utils.index"),
  responseHandler: require('./response/response-handler'),
  fileHelper: require('./fileHelper/file-helper'),
  connectDB: require('./db/database'),
  constants: require('./constants/constants'),
  successResponse: require('./response/response-handler').successResponse,
  errorResponse: require('./response/response-handler').errorResponse,
}
