const mongoose = require("mongoose");
const Column = require("columns")

const defaultColumns = () => {
    //to produce the Completed/In progress columns for the board
    const initial = [{ 'name': 'Completed' }, { 'name': 'In Progress' }]
    Columns.create(initial, (err, columns) => {
        if (err) {
            console.log(err);
            return []
        } else {
            return columns.map(col => col._id)
        }
    })
}

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
        default: defaultColumns()
    }
})

module.exports = mongoose.model("Board", boardSchema)