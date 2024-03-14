const mongoose = require('mongoose');

const connectDB = async (app) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    app.listen(3000);
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = connectDB;
