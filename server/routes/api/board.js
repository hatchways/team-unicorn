const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");
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
      const boardFields = {};
      boardFields.user = req.user.id;
      boardFields.name = name;

      console.log(boardFields);
      const board = new Board(boardFields);

      await board.save();

      res.json(board);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route GET /api/board/:boardId
// @desc Create Card
// @access Private
router.get("/:boardId", auth, async (req, res) => {
  try {
    await Board.findById(req.params.boardId)
      .populate({ path: "columns", populate: { path: "cards", model: "Card" } })
      .exec((err, board) => {
        console.log(board);
        if (!board) {
          return res.status(400).send({msg: "Invalid board"});
        }
        console.log(board);
        console.log("board", board);
        res.json(board);
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
