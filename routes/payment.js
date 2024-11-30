const express = require("express");
const router = express.Router();
const { Payment } = require("../schema/payment.schema");

router.get("/all/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const payments = await Payment.find({ email });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payments", error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const payment = await Payment.findById(id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching payment", error });
  }
});

router.post("/add", async (req, res) => {
  const { cardNumber, expiration, cvc, name, email } = req.body;

  if (!cardNumber || !expiration || !name || !email) {
    return res
      .status(400)
      .json({ message: "Card number, expiration, and name are required" });
  }

  try {
    const payment = new Payment({ cardNumber, expiration, cvc, name, email });
    await payment.save();
    res.status(201).json({ message: "Payment created successfully", payment });
  } catch (error) {
    res.status(500).json({ message: "Error creating payment", error });
  }
});

router.put("/edit", async (req, res) => {
  const { cardNumber, expiration, cvc, name, email, id } = req.body;

  try {
    if (id == "") {
      newPayment = new Payment({ cardNumber, expiration, cvc, name, email });
      await newPayment.save();
      return res
        .status(201)
        .json({ message: "Payment created successfully", newPayment });
    } else {
      const payment = await Payment.findByIdAndUpdate(
        id,
        { cardNumber, expiration, cvc, name, email },
        { new: true }
      );
      res
        .status(200)
        .json({ message: "Payment updated successfully", payment });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating payment", error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findByIdAndDelete(id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting payment", error });
  }
});

module.exports = router;
