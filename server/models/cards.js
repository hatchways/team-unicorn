const mongoose = require('mongoose')
const cardSchema = new mongoose.Schema({
    name: {type: String, required: true}, 
    desc: {type: String, required: true},
    column: {type: mongoose.Schema.Types.ObjectId, ref: "Column"},
    deadline: Date,
})

module.exports = mongoose.model("Card", cardSchema);