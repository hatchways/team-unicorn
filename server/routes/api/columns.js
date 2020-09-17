const express = require("express");
const { isValidObjectId, Mongoose } = require("mongoose");
const router = express.Router();
const Column = require("../../models/columns");

// @route POST api/columns/create
// @desc Create a New Column
// @access Public
router.post("/create", (req, res) => {
    console.log(req.body)
    Column.create(req.body, (err, col) => {
        if (err) {
            console.log(err);
        } else {
            console.log(col);
            res.send(col);
        }
    })
})

// @route PUT api/columns/update
// @desc Either change name of column or changing location of card within column.
// @access Public
router.put("/update/:id", (req, res) => {
    console.log(req.body)
    Column.findByIdAndUpdate(req.params.id, req.body, (err, updatedColumn) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            console.log(updatedColumn)
            res.send(updatedColumn)
        }
    })
})

router.get("/show/:id", (req, res) => {
    Column.findById(req.params.id, (err, col) => {
        if (err) {
            res.send(err)
        } else {
            res.send(col)
        }
    })
})

module.exports = router;