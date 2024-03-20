const express = require('express');
const path = require('path');
const {constants} = require('../shared/shared.index');

const staticFilesMiddleware = express.static(
    path.join(__dirname, constants.IMAGES),
);

/** Static files middleware */
const staticFilesMiddlewareHandler = {
    /** Configures static files to the app */
    useStaticFiles: (app) => app.use(staticFilesMiddleware),
};

module.exports = staticFilesMiddlewareHandler;