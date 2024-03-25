const express = require('express');
const middleware = require('../../middleware/middleware.index');
const service = require('./users.service');

const {control} = middleware.controller;
const {getId, getBody, getUserId} = middleware.validations;

/**
 * Defines the routes for the feed endpoint.
 * Guards some routes requiring a user to be logged in.
 * Adds a middleware to extract args from the request.
 * Wires each route with its service function.
 */
module.exports = express
  .Router()
  .put('/user/:id', getId, getBody, getUserId, control(service.updateStatus));
