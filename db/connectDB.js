const mongoose = require("mongoose");

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    // 1 means connected
    console.log("DB already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.DBURL);
    console.log("DB Connected");
  } catch (error) {
    console.error("Error connecting to DB:", error);
  }
};

module.exports = connectDB;
