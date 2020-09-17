const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(MONGOURI, {
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
