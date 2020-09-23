const mongoose = require('mongoose')
const cardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    column: { type: mongoose.Schema.Types.ObjectId, ref: "Column" },
})

module.exports = mongoose.model("Card", cardSchema);