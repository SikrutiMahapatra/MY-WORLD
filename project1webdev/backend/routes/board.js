const express = require("express");
const router = express.Router();
const Board = require("../models/boards");
const auth = require("../middleware/authMiddleware");

// CREATE BOARD
router.post("/create", auth, async (req, res) => {
  const { name } = req.body;

  const board = new Board({
    name,
    user: req.user.id
  });

  await board.save();

  res.json({ message: "Board Created!", board });
});

// GET USER BOARDS
router.get("/", auth, async (req, res) => {
  const boards = await Board.find({ user: req.user.id });
  res.json(boards);
});

// DELETE BOARD
router.delete("/:id", auth, async (req, res) => {
  await Board.findByIdAndDelete(req.params.id);
  res.json({ message: "Board Deleted!" });
});

module.exports = router;
