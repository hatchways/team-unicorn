const express = require("express");
const router = express.Router();
const Card = require("../../models/cards");
const Column = require("../../models/columns");

// @route POST api/cards/create
// @desc Create Card
// @access Public
router.post("/create", (req, res) => {
    const name = req.body.name;
    const desc = req.body.desc;

    const newCard = { name: name, desc: desc }
    Card.create(newCard, (err, card) => {
        if (err) {
            console.log(err)
        } else {
            console.log(card)
            res.send(card)
        }
    })
})

// router.put("/update/:id", (req, res) => {
//     Card.findByIdAndUpdate(req.params.id, req.body, (err, updatedCard) => {
//         if (err) {
//             console.log(err)
//             res.send(err)
//         } else {
//             console.log(updatedCard)
//             res.send(updatedCard)
//         }
//     })
// })

// @route PUT api/cards/update
// @desc Move Card to another column
// @access Public
router.put("/update/:id", async (req, res) => {
    try {
        const index = req.body.index;
        const newColId = req.body.newCol
        const oldColId = req.body.oldCol
        const cardId = req.params.id

        //Have to update column where card is removed, 
        const oldCol = await Column.findById(oldColId)
        const oldColCards = await oldCol.cards
        await Column.findByIdAndUpdate(oldColId, {'cards': oldColCards.filter(c => c !== cardId)})
        
        //Update column where card is added
        const newCol = await Column.findById(newColId)
        let newColCards = await newCol.cards;
        await Column.findByIdAndUpdate(newColId, {'cards': [...newColCards.slice(0, index), cardId, ...newColCards.slice(index)]})

        //Change card's column reference
        await Card.findByIdAndUpdate(cardId, { 'column': newColId })
        
        res.sendStatus(200)
    } catch(e) {
        console.error(e)
        res.sendStatus(404)
    }
})

router.get("/show/:id", (req, res) => {
    Card.findById(req.params.id, (err, card) => {
        if (err) {
            res.send(err)
        } else {
            res.send(card)
        }
    })
})

module.exports = router;
