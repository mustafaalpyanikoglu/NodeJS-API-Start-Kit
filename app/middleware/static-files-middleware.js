const express = require('express');
const path = require('path');
const shared = require('../shared/shared.index');
const { IMAGES } = shared.constants;

const staticFilesMiddleware = express.static(
    path.join(__dirname, IMAGES),
);

/**
 * Static files middleware handler.
 * @description Configures static files to the app
 */
module.exports = staticFilesMiddlewareHandler = {
    /** Configures static files to the app */
    useStaticFiles: (app) => app.use(staticFilesMiddleware),
};