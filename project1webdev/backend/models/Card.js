const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  text: { type: String, required: true },
  list: { type: mongoose.Schema.Types.ObjectId, ref: "List", required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Card", cardSchema);


