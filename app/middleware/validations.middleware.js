const mongoose = require('mongoose');
const shared = require('../shared/shared.index');
const { AppError } = shared.models;
const kind = 'VALIDATION';

/**
 * Middleware to extract the id from the request.
 * @description Adds the id to the args array in the request.
 * @returns The id of the request.
 * @throws An error if the id is not present or not a number.
 */
const getId = (req, res, next) => {
  const id = req.params.id;
  if (!id || !mongoose.isValidObjectId(id)) return next(new AppError('Invalid ID format', kind, 'validations.getId'));
  addArg(req, id);
  next();
};

/**
 * Middleware to extract the UserId from the request.
 * @description Adds the UserId to the args array in the request.
 * @returns The request filled with the UserId of the request.
 * @throws An error if the UserId is not present or not a number.
 */
const getUserId = (req, res, next) => {
  const userId = req.auth?.sub;
  if (!userId) return next(new AppError("UserId is required", kind, "validations.getUserId"));
  addArg(req, userId);
  next();
};

/**
 * Middleware to extract the body from the request.
 * @description Adds the body to the args array in the request.
 * @returns The body of the request.
 * @throws An error if the body is not present.
 */
const getBody = (req, res, next) => {
  const body = req.body;
  if (!body) return next(new AppError("Body is required", kind, "validations.getBody"));
  addArg(req, body);
  next();
};

/**
 * Middleware to extract the query parameters from the request.
 * @description Adds the query parameters to the args array in the request.
 * @returns The query parameters of the request.
 * @throws An error if the query parameters are not present.
 */
const getQuery = (req, res, next) => {
  const query = req.query;
  if (!query) return next(new AppError("Query parameters are required", kind, "validations.getQuery"));
  addArg(req, query);
  next();
};

/**
 * Middleware to extract the uploaded file from the request.
 * @description Adds the file to the args array in the request.
 * @returns The uploaded file.
 * @throws An error if the file is not present or not in a valid format.
 */
const uploadFileRequired = (req, res, next) => {
  const file = req.file;
  if (!file) return next(new AppError("File is required", kind, "validations.uploadFile"));
  addArg(req, file);
  next();
}

/**
 * Middleware to handle uploaded file when it's not required.
 * @description Adds the file to the args array in the request.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const uploadFileNotRequired = (req, res, next) => {
  const file = req.file;
  addArg(req, file);
  next();
}

const addArg = (req, arg) => {
  if (!req.args) req.args = [];
  req.args.push(arg);
};

/**
 * Middleware to extract arguments from the request.
 * @description Adds the data to an args array in the request.
 * @throws An error if the requested args are not present.
 */
module.exports = validations = {
  getId,
  getUserId,
  getBody,
  getQuery,
  uploadFileRequired,
  uploadFileNotRequired,
};
