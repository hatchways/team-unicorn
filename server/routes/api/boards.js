const express = require("express");
const router = express.Router();
const Board = require("../../models/boards");


// @route POST api/boards/create
// @desc Create Board
// @access Public
router.post('/create', (req, res) => {
    Board.create(null, (err, board) => {
        if (err) {
            console.error(err)
            res.sendStatus(404)
        } else {
            console.log(board)
            res.send(board)
        }
    })
})

module.exports =  router;