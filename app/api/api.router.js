const express = require('express');

const credentialsRouter = require('./credentials/credentials.router');
const feedsRouter = require('./feeds/feeds.router');
const usersRouter = require('./users/users.router');

const middleware = require('../middleware/middleware.index');
const {debug} = require('winston');
const {guardUser} = middleware.authentication;
const {debugReq} = middleware.logs;

const useRouters = (app, apiVersion) => {
  app.use(express.json());
  app.get('/', (req, res) => res.send('Activity X API'));
  const apiRouters = getApiRouters();
  app.use(`/v${apiVersion}`, apiRouters);
};

const getApiRouters = () => {
  const apiRouters = express.Router();
  apiRouters.use('/feeds', debugReq, feedsRouter);
  apiRouters.use('/credentials', debugReq, credentialsRouter);
  apiRouters.use('/users', guardUser, debugReq, usersRouter);
  return apiRouters;
};

/**
 * Defines main routes for the API, attaching controllers and middleware.
 */
module.exports = api = {
  /** Configure middleware and sets routes for the API endpoints */
  useRouters,
};
