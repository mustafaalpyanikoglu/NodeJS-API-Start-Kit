const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const {connectDB, constants} = require('./utils');
const {
  corsMiddleware, errorHandlerMiddleware,
  uploadMiddleware, staticFilesMiddleware,
} = require('./middlewares');

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');

const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(uploadMiddleware);

app.use(staticFilesMiddleware);

app.use(corsMiddleware);

app.use(constants.FEED_ROUTE, feedRoutes);
app.use(constants.AUTH_ROUTE, authRoutes);

app.use(errorHandlerMiddleware);

connectDB(app);

