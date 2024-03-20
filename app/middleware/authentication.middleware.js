const { expressjwt } = require("express-jwt");
const env = require("dotenv").config().parsed;
const secret = env.JWT_SECRET;
const algorithms = [env.JWT_ALGORITHM];

const guardUser = expressjwt({
  secret,
  algorithms,
  credentialsRequired: true,
});

const constants = require('../shared/constants/constants');
const httpStatusCode = require('http-status-codes');

/**
 * Security related middleware functions.
 * @description Configures JWT for user identification and API Key guards.
 */
module.exports = authentication = {
  /**
   * Guard routes that require a valid JWT.
   * @description The User ID is available in req.user.sub
   * @throws {UnauthorizedError} If the JWT is not valid
   */
  guardUser,
};

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error(constants.NOT_AUTHENTICATED);
    err.statusCode = httpStatusCode.StatusCodes.UNAUTHORIZED;
    throw error;
  }
  const token = authHeader.split(' ')[1];
  try {
    decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    err.statusCode = httpStatusCode.StatusCodes.INTERNAL_SERVER_ERROR;
    throw error;
  }
  if (!decodedToken) {
    const error = new Error(constants.NOT_AUTHENTICATED);
    error.statusCode = httpStatusCode.StatusCodes.UNAUTHORIZED;
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};
