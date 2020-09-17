const express = require("express");
const router = express.Router();
const query = require("./columns_query_handler")

// @route POST api/columns/create
// @desc Create a New Column
// @access Public
router.post("/create", query.createColumns)

// @route POST api/columns/update
// @desc Either change name of column or changing location of card within column.
// @access Public
router.put("/update/:id", query.updateColumns)

module.exports = router;