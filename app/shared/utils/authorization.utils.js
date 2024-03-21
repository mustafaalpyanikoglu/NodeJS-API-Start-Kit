const jwt = require('jsonwebtoken');
const env = require('dotenv').config().parsed;
const {AppError} = require('../errors/models.index');
const secret = env.JWT_SECRET;
const expiration = {expiresIn: env.JWT_EXPIRES_IN};
const bcrypt = require('bcryptjs');

const signUser = (userId) => jwt.sign({sub: userId}, secret, expiration);

const extractUserId = (token) => {
  const decoded = jwt.decode(token);
  return decoded.sub;
};

const guardIsOwner = (userId, item, source) => {
  if (userId !== item.userId && userId !== item.id) {
    throw new AppError('User is not the owner', 'FORBIDDEN', source);
  }
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

/**
 * Authorization shared functions.
 * @description Generates JWT and ensures ownership.
 */
module.exports = authorization = {
  /** Checks if the user is owner of an item
   * @param {*} userId The user ID
   * @param {*} item The item to check
   * @param {*} source The caller, acting as source in case of error
   * @throws {AppError} If the user is not the owner of the item
   */
  guardIsOwner,
  /**
   * Generates a valid JWT for a user ID.
   * @param {*} userId The user ID (the token payload).
   * @returns A JWT for the user with the ID as the sub value.
   */
  signUser,
  /**
   * Extracts the user ID from a JWT.
   * @param {*} token The JWT to extract the user ID from.
   * @returns The user ID.
   */
  extractUserId,
  /**
   * Hashes the given password using bcrypt.
   * @param {string} password The password to hash.
   * @returns {Promise<string>} A promise that resolves to the hashed password.
   */
  hashPassword,
  /**
   * Compares the given password with the hashed password using bcrypt.
   * @param {string} password The password to compare.
   * @param {string} hashedPassword The hashed password to compare against.
   * @returns {Promise<boolean>} A promise that resolves to true if the passwords match, false otherwise.
   */
  comparePasswords,
};
