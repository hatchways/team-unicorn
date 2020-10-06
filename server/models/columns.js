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

columnSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

columnSchema.set('toJSON', {
  virtuals: true
});


module.exports = mongoose.model("Column", columnSchema);
