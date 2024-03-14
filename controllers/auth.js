const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const {successResponse, errorResponse, constants} = require('.././utils');

const User = require('../models/user');

exports.Signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(constants.VALIDATION_FAILED);
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

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
        res.status(201)
            .json({
              message: constants.USER_CREATED,
              userId: result._id,
            });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
};
