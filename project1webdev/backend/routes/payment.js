const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const auth = require("../middleware/authMiddleware");

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 1️⃣ CREATE ORDER (OPEN RAZORPAY CHECKOUT)
router.post("/create-order", auth, async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100, // convert INR → paise
    currency: "INR",
    receipt: "receipt_" + Date.now(),
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Order creation failed" });
  }
});

// 2️⃣ VERIFY PAYMENT SIGNATURE (AFTER SUCCESS)
router.post("/verify", auth, async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    // Payment success → update user as premium
    // await User.findByIdAndUpdate(req.user.id, { isPremium: true });

    return res.json({ success: true, message: "Payment Verified!" });
  }

  res.json({ success: false, message: "Payment Verification Failed!" });
});

module.exports = router;
