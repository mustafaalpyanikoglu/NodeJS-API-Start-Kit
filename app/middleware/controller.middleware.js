const {validationResult} = require('express-validator');
const shared = require('../shared/shared.index');
const {ValidationError} = shared.models;

/**
 * A function to control the flow of the request and ensure response content or error.
 * @param {*} serviceFn The service function to call.
 * @return Responds with the result of the service function and the appropriate status code.
 * @throws An error to the next middleware when the service function fails.
 */
const control = (serviceFn) => {
  return async (req, res, next) => {
    try {
      await validateRequest(req);
      const body = req.args ? await serviceFn(...req.args) : await serviceFn();
      const statusCode = getStatusCode(req.method, body);
      res.status(statusCode).json(body);
    } catch (error) {
      next(error);
    }
  };
};

const getStatusCode = (method, body) => {
  if (method === 'POST' || method === 'PUT') return 201;
  if (method === 'DELETE') return 204;
  if (isEmpty(body)) return 204;
  return 200;
};

const isEmpty = (value) => {
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return value === '';
};

const validateRequest = async (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const validationErrors = errors
      .array()
      .map(({location, msg, value, path}) => ({location, message: msg, value, path}));
    throw new ValidationError('Validation Error', 'UNPROCESSABLE_ENTITY', 'express-validator', validationErrors);
  }
};

/**
 * Functions to control the flow of the request and ensure coherent response.
 * @description Handles errors and security identification
 */
module.exports = controller = {
  control,
};
