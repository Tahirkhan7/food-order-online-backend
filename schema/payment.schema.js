const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  cardNumber: { type: Number, required: true },
  expiration: { type: String, required: true },
  cvc: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = { Payment };
