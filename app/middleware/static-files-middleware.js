const express = require('express');
const path = require('path');
const shared = require('../shared/shared.index');
const { IMAGES } = shared.constants;

const staticFilesMiddleware = express.static(
    path.join(__dirname, IMAGES),
);

/** Static files middleware */
const staticFilesMiddlewareHandler = {
    /** Configures static files to the app */
    useStaticFiles: (app) => app.use(staticFilesMiddleware),
};

module.exports = staticFilesMiddlewareHandler;