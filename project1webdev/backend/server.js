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

// AUTH ROUTES
app.use("/api/auth", require("./routes/auth"));

// MIDDLEWARE
const authMiddleware = require("./middleware/authMiddleware");

// PROTECTED ROUTE
app.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "You accessed a protected route!", user: req.user });
});

// BOARD ROUTES
app.use("/api/board", require("./routes/board"));


app.use("/api/list", require("./routes/list"));
app.use("/api/card", require("./routes/card"));

app.use("/api/payment", require("./routes/payment"));

// ⭐ SERVER START (MUST BE LAST)
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

