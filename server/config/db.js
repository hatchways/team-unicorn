const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://nick:nick@schoolcluster.dal4d.mongodb.net/school?retryWrites=true&w=majority", {
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
