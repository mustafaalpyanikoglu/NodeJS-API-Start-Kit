const {validationResult} = require('express-validator');

const validateRequest = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation Failed.');
    error.statusCode = 422;
    throw error;
  }
};

module.exports = {
  validateRequest,
};
