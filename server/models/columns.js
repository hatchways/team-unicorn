const mongoose = require("mongoose");

const columnSchema = mongoose.Schema({
    name: {type: String, required: true},
    cards: [
        {
            type: mongoose.Schema.Types.ObjectId,
			ref: "Card"
        }
    ]
})

module.exports = mongoose.model("Column", columnSchema)