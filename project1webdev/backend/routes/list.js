const express = require("express");
const router = express.Router();
const List = require("../models/List");
const auth = require("../middleware/authMiddleware");

// CREATE LIST
router.post("/create", auth, async (req, res) => {
  const { title, boardId } = req.body;

  const list = new List({ title, board: boardId });
  await list.save();

  res.json({ message: "List Created!", list });
});

// GET LISTS OF A BOARD
router.get("/:boardId", auth, async (req, res) => {
  const lists = await List.find({ board: req.params.boardId });
  res.json(lists);
});

// UPDATE LIST TITLE
router.put("/:id", auth, async (req, res) => {
  const { title } = req.body;

  const updated = await List.findByIdAndUpdate(
    req.params.id,
    { title },
    { new: true }
  );

  res.json({ message: "List Updated!", updated });
});

// DELETE LIST
router.delete("/:id", auth, async (req, res) => {
  await List.findByIdAndDelete(req.params.id);
  res.json({ message: "List Deleted!" });
});

module.exports = router;
