const mongoose = require("mongoose");

const dbUrl = process.env.ATLAS_DB;

// Connect to MongoDB Atlas
const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("✅ Connected to MongoDB Atlas!");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
