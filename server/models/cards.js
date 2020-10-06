const mongoose = require("mongoose");
const CardDetails = require("./CardDetails");

const cardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  details: { type: CardDetails, default: {} },
  column: { type: mongoose.Schema.Types.ObjectId, ref: "Column" },
});

cardSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

cardSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Card", cardSchema);
