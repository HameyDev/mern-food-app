const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL)   
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("Database Error", err);
    process.exit(1);
  }
};

module.exports = connectDB;