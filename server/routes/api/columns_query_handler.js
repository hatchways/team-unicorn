const express = require("express");
const router = express.Router();
const Column = require("../../models/columns");

const createColumns = (req, res) => {
    const name = req.body.name;
    const desc = req.body.description;

    const newColumn = { name: name, desc: desc }

    Column.create(newColumn, (err, col) => {
        if (err) {
            console.log(err);
        } else {
            console.log(col);
        }
    })
}

const updateColumns = (req, res) => {

    let newData = {
        'name': req.body.name,
        'cards': req.body.cards,
    }

    Column.findByIdAndUpdate(req.params.id, newData, (err, updatedColumn) => {
        if (err) {
            console.log(err)
        } else {
            console.log(updatedColumn)
        }
    })
}

module.exports = {
    createColumns: createColumns,
    updateColumns: updateColumns
}