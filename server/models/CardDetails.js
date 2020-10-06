const mongoose = require("mongoose");

const CardDetailsSchema = new mongoose.Schema({
  color: String, // hexcode
  description: String,
  checklist: [mongoose.ObjectId],
  deadline: Number, // epoch
  comments: [mongoose.ObjectId],
  attachments: [mongoose.ObjectId],
  tags: [mongoose.ObjectId],
});

module.exports = CardDetailsSchema;
