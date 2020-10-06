const express = require("express");
const router = express.Router();

const auth = require("../../middleware/authenticator");
const {
  validate,
  boardValidationRules
} = require("../../middleware/validator");

const Board = require("../../models/boards");

// @route POST /api/board/create
// @desc Create Card
// @access Private
router.post(
  "/create",
  [auth, boardValidationRules(), validate],
  async (req, res) => {
    console.log(req.body);
    const { name } = req.body;
    try {
      const board = new Board({ user: req.user.id, name: name });
      const newBoard = await board.save();
      await Board.findById(newBoard._id)
        .populate({
          path: "columns",
          populate: {
            path: "cards",
            model: "Card",
            select: ["name", "deadline"]
          }
        })
        .exec((err, board) => {
          console.log(board);
          res.json(board);
        });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route GET /api/boards/
// @desc Create Card
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    console.log(req.user._id);

    await Board.find({
      user: req.user._id
    })
      .populate({
        path: "columns",
        populate: { path: "cards", model: "Card", select: ["name", "deadline"] }
      })
      .exec((err, board) => {
        console.log(board);
        res.json(board);
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
