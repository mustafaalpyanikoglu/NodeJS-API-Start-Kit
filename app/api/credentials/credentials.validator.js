const {body} = require('express-validator');

const {constants} = require('../../shared/shared.index');
const {VALID_EMAIL, EMAIL_EXISTS, PASSWORD_LENGTH, NAME_REQUIRED} = constants;

const User = require('../../models/user');

const emailExistsCheck = async (value, {req}) => {
  const user = await User.findOne({email: value});
  if (user) throw new Error(EMAIL_EXISTS);
};

const loginValidator = [
  body('email').isEmail().withMessage(VALID_EMAIL).normalizeEmail(),
  body('password').trim().isLength({min: 3}).withMessage(PASSWORD_LENGTH),
];

const registerValidator = [
  body('email').isEmail().withMessage(VALID_EMAIL).custom(emailExistsCheck).normalizeEmail(),
  body('password').trim().isLength({min: 5}).withMessage(PASSWORD_LENGTH),
  body('name').trim().not().isEmpty().isLength({min: 3}).withMessage(NAME_REQUIRED),
];

module.exports = {
  loginValidator,
  registerValidator,
};
