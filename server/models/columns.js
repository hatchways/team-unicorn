const mongoose = require("mongoose");

const columnSchema = mongoose.Schema({
  name: { type: String, required: true },
  cards: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card"
      }
    ],
    default: []
  }
});

module.exports = mongoose.model("Column", columnSchema);
