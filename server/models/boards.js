const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    columns: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Column"
            }
        ],
        default: [] //change to give default values of completed + in progress columns
    }
})

module.exports = mongoose.model("Board", boardSchema)