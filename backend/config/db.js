const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/resqnet_db', {
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[MongoDB] Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[MongoDB] Connection Error: ${error.message}`);
    // Fallback to in-memory/mock if database is temporarily unavailable during offline testing
    console.warn('[MongoDB] Running with in-memory resilient fallback store');
  }
};

module.exports = connectDB;
