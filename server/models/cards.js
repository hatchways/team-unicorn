const mongoose = require("mongoose");
const cardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String },
  column: { type: mongoose.Schema.Types.ObjectId, ref: "Column" }
});

cardSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

cardSchema.set('toJSON', {
  virtuals: true
});


module.exports = mongoose.model("Card", cardSchema);
