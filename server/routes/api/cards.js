const express = require("express");
const router = express.Router();
const Card = require("../../models/cards");
const Column = require("../../models/columns");

const colQuery = require("./columns_query_handler");
// @route POST api/cards/create
// @desc Create Card
// @access Public
router.post("/create", (req, res) => {
    const name = req.body.name;
    const desc = req.body.description;

    const newCard = { name: name, desc: desc }
    Card.create(newCard, (err, card) => {
        if (err) {
            console.log(err)
        } else {
            console.log(card)
        }
    })
})

// @route PUT api/cards/create
// @desc Move Card to another column
// @access Public
router.put("/update/:card_id&:col_id&:index", (req, res) => {
    const index = req.params.index;
    const col_id = req.params.col_id
    const card_id = req.params.card_id

    //Have to update column where card is removed, 
    const oldCol = Column.findById(Card.findById(card_id).column)
    const oldColCards = oldCol.cards.filter((card) => card !== card_id)
    Column.findByIdAndUpdate(Card.findById(card_id).column, {'cards': oldColCards}, (err, res) => {
        if (err) {
            console.log(err)
        } else {
            console.log(res)
        }
    })
    
    //Update column where card is added
    let newColCards = Column.findById(col_id).cards
    newColCards = [...newColCards.slice(0, index), card_id, ...newColCards.slice(index)]
    Column.findByIdAndUpdate(col_id, {'cards': oldColCards}, (err,  res) => {
        if (err) {
            console.log(err)
        } else {
            console.log(res)
        }
    })
    //Change card's column reference
    Card.findByIdAndUpdate(card_id, { 'column': col_id }, (err, res) => {
        if (err) {
            console.log(err)
        } else {
            console.log(res)
        }
    })
})

module.exports = router;
