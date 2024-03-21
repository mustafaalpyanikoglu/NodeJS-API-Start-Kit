const { expressjwt } = require("express-jwt");
const env = require("dotenv").config().parsed;
const secret = env.JWT_SECRET;
const algorithms = [env.JWT_ALGORITHM];
const shared = require('../shared/shared.index');
const { NOT_AUTHENTICATED } = shared.constants;
const { AppError } = shared.models;

const guardUser = expressjwt({
  secret,
  algorithms,
  credentialsRequired: true,
});

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
  if (!authHeader) return next(new AppError(NOT_AUTHENTICATED, 'UNAUTHORIZED', 'authentication.middleware'));
  const token = authHeader.split(' ')[1];
  try {
    decodedToken = jwt.verify(token, env.SECRET_KEY);
  } catch (err) {
    throw new AppError(NOT_AUTHENTICATED, 'INTERNAL_SERVER_ERROR', 'authentication.middleware');
  }
  if (!decodedToken) throw new AppError(NOT_AUTHENTICATED, 'UNAUTHORIZED', 'authentication.middleware');
  req.userId = decodedToken.userId;
  next();
};
