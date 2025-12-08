const express = require("express");
const router = express.Router();
const Card = require("../models/Card");
const auth = require("../middleware/authMiddleware");

// CREATE CARD
router.post("/create", auth, async (req, res) => {
  const { text, listId } = req.body;

  const card = new Card({ text, list: listId });
  await card.save();

  res.json({ message: "Card Created!", card });
});

// GET CARDS OF A LIST
router.get("/:listId", auth, async (req, res) => {
  const cards = await Card.find({ list: req.params.listId });
  res.json(cards);
});

// UPDATE CARD
router.put("/:id", auth, async (req, res) => {
  const { text } = req.body;

  const updated = await Card.findByIdAndUpdate(
    req.params.id,
    { text },
    { new: true }
  );

  res.json({ message: "Card Updated!", updated });
});

// DELETE CARD
router.delete("/:id", auth, async (req, res) => {
  await Card.findByIdAndDelete(req.params.id);
  res.json({ message: "Card Deleted!" });
});

module.exports = router;
