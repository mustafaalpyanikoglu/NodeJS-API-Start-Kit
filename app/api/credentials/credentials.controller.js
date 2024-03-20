const bcrypt = require('bcryptjs');
const {/* successResponse, errorResponse,*/
  constants, validators} = require('../app/shared/shared.index');
const jwt = require('jsonwebtoken');
const {StatusCodes} = require('http-status-codes');

const User = require('../models/user');

exports.Signup = (req, res, next) => {
  validators.validateRequest(req);

  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  bcrypt.hash(password, 12)
      .then((hashedPassword) => {
        const user = new User({
          email: email,
          password: hashedPassword,
          name: name,
        });
        return user.save();
      })
      .then((result) => {
        res.status(StatusCodes.CREATED)
            .json({
              message: constants.USER_CREATED,
              userId: result._id,
            });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        }
        next(err);
      });
};

exports.login = (req, res, next) => {
  validators.validateRequest(req);

  const email = req.body.email;
  const password = req.body.password;

  let loadedUser;

  User.findOne({email: email})
      .then((user) => {
        if (!user) {
          const error = new Error(constants.USER_NOT_FOUND);
          error.statusCode = StatusCodes.UNAUTHORIZED;
          throw error;
        }
        loadedUser = user;
        return bcrypt.compare(password, user.password);
      })
      .then((isEqual) => {
        if (!isEqual) {
          const error = new Error(constants.WRONG_PASSWORD);
          error.statusCode = StatusCodes.UNAUTHORIZED;
          throw error;
        }
        const token = jwt.sign(
            {
              email: loadedUser.email,
              userId: loadedUser._id.toString(),
            },
            process.env.SECRET_KEY,
            {expiresIn: '1h'},
        );
        console.log(token);
        res.status(StatusCodes.OK)
            .json({
              token: token,
              userId: loadedUser._id.toString(),
            });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        }
        next(err);
      });
};
