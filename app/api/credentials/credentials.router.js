const express = require('express');
const middleware = require('../../middleware/middleware.index');
const service = require('./credentials.service');

const {control} = middleware.controller;
const {getBody} = middleware.validations;
const {hashCredentials} = middleware.security;
const {loginValidator, registerValidator} = require('./credentials.validator');

/**
 * Defines the routes for the credentials endpoint.
 * Guards some routes requiring a user to be logged in.
 * Adds a middleware to extract args from the request.
 * Wires each route with its service function.
 */
module.exports = express
  .Router()
  .post('/register', getBody, registerValidator, hashCredentials, control(service.register))
  .post('/login', getBody, loginValidator, hashCredentials, control(service.login));
