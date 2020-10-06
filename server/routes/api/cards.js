const express = require("express");
const router = express.Router();

const auth = require("../../middleware/authenticator");
const { validate, cardValidationRules } = require("../../middleware/validator");

const Card = require("../../models/cards");
const Column = require("../../models/columns");

// @route POST api/cards/create
// @desc Create Card
// @access Private
router.post(
  "/:columnId",
  [auth, cardValidationRules(), validate],
  async (req, res) => {
    try {
      const { name, deadline } = req.body;
      const column = await Column.findById(req.params.columnId);
      const newCard = { name: name, column: column._id, deadline: deadline };

      Card.create(newCard, async (err, card) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          // Pushing the card to the column
          column.cards.push({ _id: card.id });
          await column.save();

          console.log(card);
          res.send(card);
        }
      });
    } catch (err) {
      if (err.name === "CastError")
        return res.status(404).json({ msg: "Column not found" });
      res.status(500).send("Server Error");
    }
  }
);

// @route PUT /api/cards/detail/update/:id
// @desc Move Card to another column
// @access private

router.put("/:id", auth, (req, res) => {
  try {
    console.log(req.body);
    Card.findByIdAndUpdate(req.params.id, req.body, (err, updatedCard) => {
      if (!updatedCard) return res.status(400).send({ msg: "Invalid Card" });

      console.log("updatedCard", updatedCard);
      res.send(updatedCard);
    });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route PUT api/cards/update
// @desc Move Card to another column
// @access Public
router.put("/:id", async (req, res) => {
  try {
    const index = req.body.index;
    const newColId = req.body.newCol;
    const oldColId = req.body.oldCol;
    const cardId = req.params.id;

    //Have to update column where card is removed,
    const oldCol = await Column.findById(oldColId);
    const oldColCards = await oldCol.cards;
    await Column.findByIdAndUpdate(oldColId, {
      cards: oldColCards.filter((c) => c !== cardId)
    });

    //Update column where card is added
    const newCol = await Column.findById(newColId);
    let newColCards = await newCol.cards;
    await Column.findByIdAndUpdate(newColId, {
      cards: [
        ...newColCards.slice(0, index),
        cardId,
        ...newColCards.slice(index)
      ]
    });

    //Change card's column reference
    await Card.findByIdAndUpdate(cardId, { column: newColId });

    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(404);
  }
});

// @route Get api/cards/show/:id
// @desc Get Card by Id
// @access Private

router.get("/:id", auth, (req, res) => {
  try {
    console.log(req.params.id);
    Card.findById(req.params.id)
      .populate("column", ["name"])
      .exec((err, card) => {
        if (!card) return res.status(400).send({ msg: "Invalid Card" });

        console.log(card);
        res.send(card);
      });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
