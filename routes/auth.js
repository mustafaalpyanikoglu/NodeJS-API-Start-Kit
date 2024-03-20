// const express = require('express');
// const {body} = require('express-validator');

// const authController = require('../controllers/auth');
// const {constants} = require('../app/shared/shared.index');

// const User = require('../models/user');

// const router = express.Router();

// // /auth/register -> PUT
// router.put('/signup',
//     [
//       body('email').isEmail().withMessage(constants.VALID_EMAIL)
//           .custom((value, {req}) => {
//             return User
//                 .findOne({email: value})
//                 .then((userDoc) => {
//                   if (userDoc) {
//                     // eslint-disable-next-line prefer-promise-reject-errors
//                     return Promise.reject(constants.EMAIL_EXISTS);
//                   }
//                 });
//           })
//           .normalizeEmail(),
//       body('password').trim().isLength({min: 5})
//           .withMessage(constants.PASSWORD_LENGTH),
//       body('name').trim().not().isEmpty()
//           .withMessage(constants.NAME_REQUIRED),
//     ],
//     authController.Signup,
// );

// // /auth/login -> POSt
// router.post('/login', authController.login);

// module.exports = router;
