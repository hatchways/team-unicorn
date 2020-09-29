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

// @route GET /api/board/
// @desc Get Board by User
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    console.log(req.user._id);

    await Board.findOne({
      user: req.user._id
    })
      .populate({ path: "columns", populate: { path: "cards", model: "Card",  select: 'name' } })
      .exec((err, board) => {
        console.log(board);
        res.json(board);
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/update/:id", auth, (req, res) => {
  try {
    console.log('body ' ,req.body)
    Board.findByIdAndUpdate(req.params.id, req.body, (err, newColumnOrder) => {
      if (!newColumnOrder) return res.status(400).send({msg: "Invalid Columns"});

      console.log("Updated Columns: ", newColumnOrder)
      res.send(newColumnOrder)
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send("error")
  }
})

module.exports = router;
