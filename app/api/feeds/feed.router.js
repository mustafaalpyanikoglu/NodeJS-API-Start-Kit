const express = require('express');
const middleware = require('../../middleware/middleware.index');
const service = require('./feed.service');

const { control } = middleware.controller;
const { getId, getQuery, getBody, uploadFileRequired, uploadFileNotRequired } = middleware.validations;
const { guardUser } = middleware.authentication;

/**
 * Defines the routes for the feed endpoint.
 * Guards some routes requiring a user to be logged in.
 * Adds a middleware to extract args from the request.
 * Wires each route with its service function.
 */
module.exports = express
  .Router()
  .get('/posts', guardUser,getQuery, control(service.getPosts))
  .post('/post', getBody, uploadFileRequired, control(service.createPost))
  .get('/post/:id', getId, control(service.readById))
  .put('/post/:id', getId, getBody, uploadFileNotRequired, control(service.updatePost)) 
  .delete('/post/:id', getId, control(service.deletePost));