const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  stripeId: {
    type: String,
    unique: true
  },
  premium: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String,
    default: "https://unicorn-profile-pictures.s3-us-west-1.amazonaws.com/download.png"
  }
});

module.exports = User = mongoose.model("users", UserSchema);
