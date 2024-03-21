const express = require('express');
const env = require('dotenv').config().parsed;
const bodyParser = require('body-parser');

const api = require('./api/api.router');
const middleware = require('./middleware/middleware.index');
const shared = require('./shared/shared.index');
const config = require('../config/config.index');

const logger = shared.utils.logger;
const connectDB = config.connectDB;
const app = express();

app.use(bodyParser.urlencoded({extended: false}));

middleware.logs.useLoggers(app);
middleware.upload.useUpload(app);
middleware.staticFiles.useStaticFiles(app);
middleware.security.useSecurity(app);
api.useRouters(app, env.API_VERSION);
middleware.errorHandler.useErrorHandler(app, logger);

connectDB(env.MONGODB_URI);

const startMessage = `Listening on ${env.PORT}, ${env.NODE_ENV} environment`;
app.listen(env.PORT, () => logger.info(startMessage));
