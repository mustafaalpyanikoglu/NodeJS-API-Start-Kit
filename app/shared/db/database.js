const mongoose = require('mongoose');
const env = require("dotenv").config().parsed;

const connectDB = async (app) => {
  try {
    await mongoose.connect(env.MONGODB_URI);
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = connectDB;
