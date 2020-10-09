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
      const newCard = {
        name: name,
        column: column._id,
        details: { deadline: deadline }
      };

      Card.create(newCard, async (err, card) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          // Pushing the card to the column
          column.cards.push({ _id: card.id });
          await column.save();
          const newCard = await Card.findById(card.id);
          res.send(newCard);
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

router.put("/:id", auth, async (req, res) => {
  try {
    const { name, details } = req.body;
    await Card.findByIdAndUpdate(req.params.id, {
      $set: {
        name: name,
        details: details
      }
    });
    const updatedCard = await Card.findById(req.params.id);
    res.status(200).send(updatedCard);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      errors: { CARD_NOT_SAVED: "Could not save card." }
    });
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
        if (!card) return res.status(400).json({ msg: "Invalid Card" });
        res.json(card);
      });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
