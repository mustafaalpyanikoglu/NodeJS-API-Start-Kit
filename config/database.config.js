const mongoose = require('mongoose');
const shared = require('../app/shared/shared.index');
const models = shared.models;
const {AppError} = models;

const connectDB = async (URL) => {
  try {
    await mongoose.connect(URL);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new AppError('Database Connection Error', 'INTERNAL_SERVER_ERROR', 'mongoose');
    next();
  }
};

module.exports = connectDB;
