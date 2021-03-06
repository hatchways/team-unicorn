const mongoose = require("mongoose");
const Column = require("./columns");

const createCols = () => {
  return Column.create([{ name: "Completed" }, { name: "In Progress" }]);
};

const boardSchema = new mongoose.Schema({
  name: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  columns: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Column"
      }
    ]
  }
});

//on hindsight prob change cuz i was assuming
//need the default columns no matter what
boardSchema.pre("save", async function () {
  if (this.columns.length === 0) {
    const cols = await createCols();
    this.columns = await cols.map((col) => col._id);
  }
});

boardSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

boardSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model("Board", boardSchema);
