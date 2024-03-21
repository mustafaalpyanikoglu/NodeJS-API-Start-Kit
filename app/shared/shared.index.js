/**
 * Shared models, constants and utilities.
 */
module.exports = {
  /** Function to connect to the database */
  // connectDB: require('../middleware/database'),
  /** Models shared by the whole app */
  models: require('./errors/models.index'),
  /** Shared utility functions */
  utils: require('./utils/utils.index'),
  /** Handles response for HTTP requests */
  responseHandler: require('./utils/response.utils'),

  /** Constant values used across the application */
  constants: require('./constants/constants'),
};
