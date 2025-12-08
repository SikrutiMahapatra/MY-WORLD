const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  title: { type: String, required: true },
  board: { type: mongoose.Schema.Types.ObjectId, ref: "Board", required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("List", listSchema);
