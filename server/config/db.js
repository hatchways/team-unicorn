const mongoose = require("mongoose");
const keys = require("./keys");

const connectDB = async () => {
  try {
    await mongoose.connect(keys.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("MongoDB Connected..");
  } catch (error) {
    console.error(error);
    // Exit the process  with failure
    process.exit(1);
  }
};

module.exports = connectDB;
