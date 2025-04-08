const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("MongoDB connection error ❌", error);
    throw error;
  }
};

module.exports = connectDb;
