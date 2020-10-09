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
  "/",
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
// @desc Get Board by User
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
        res.json(board);
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/board/:id
// @desc Get Board By ID
// @access Private
router.get("/:id", auth, async (req, res) => {
  try {
    await Board.findById(req.params.id)
    .populate({path: "columns", populate: {path: "cards", model: "Card", select: ["name", "deadline"]}})
    .exec((err, board) => {
      res.json(board);
    }); 
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error")
    }
  })

router.put("/:id", auth, (req, res) => {
  try {
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
