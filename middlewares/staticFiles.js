const express = require('express');
const path = require('path');
const {constants} = require('../utils');

const staticFilesMiddleware = express.static(
    path.join(__dirname, constants.IMAGES),
);

module.exports = staticFilesMiddleware;
