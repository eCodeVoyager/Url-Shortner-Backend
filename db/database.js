const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);

    console.log(`MongoDB Connected Successfully.`);
  } catch (error) {
    console.log(`MongoDB Connection Failed.`);
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
