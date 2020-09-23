const mongoose = require("mongoose");
const Column = require("./columns")

const createCols = () => {
    return Column.create([{ 'name': 'Completed' }, { 'name': 'In Progress' }])
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
    }
});

boardSchema.pre('save', async function() {
    if (this.columns.length === 0) {
        const cols = await createCols()
        this.columns = await cols.map(col => col._id)
    }
});
module.exports = mongoose.model("Board", boardSchema)