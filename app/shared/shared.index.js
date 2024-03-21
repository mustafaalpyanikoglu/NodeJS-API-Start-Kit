/**
 * Shared models and utilities.
 */
module.exports = {
  /** Models shared by the whole app */
  models: require("./models/models.index"),
  /** Shared utility functions */
  utils: require("./utils/utils.index"),
  /** Handles response for HTTP requests */
  responseHandler: require('./utils/response.utils'),
  /** Function to connect to the database */
  connectDB: require('./db/database'),
  /** Constant values used across the application */
  constants: require('./constants/constants'),
}
