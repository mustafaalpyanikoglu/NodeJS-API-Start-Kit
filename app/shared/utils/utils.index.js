/** Shared utility functions */
module.exports = {
  /** Application Logger */
  logger: require("./logger.utils"),
  /** Utility functions for parsing a request */
  request: require("./request.utils"),
  /** Authorization shared functions. */
  authorization: require("./authorization.utils"),
  /** Utility functions for file operations */
  fileHelper: require('./file.utils'),
  /** Function to generate success response */
  successResponse: require('./response.utils').successResponse,
  /** Function to generate error response */
  errorResponse: require('./response.utils').errorResponse,
};
