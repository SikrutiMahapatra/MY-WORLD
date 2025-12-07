require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

// MongoDB connect
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log("Mongo Error:", err));

// Test Route
app.get("/", (req, res) => {
  res.send("Server Chal Gaya!");
});

// Server Start
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.use("/api/auth", require("./routes/authRoutes"));
