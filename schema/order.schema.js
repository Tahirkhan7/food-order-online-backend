const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  items: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      category: { type: String, required: false },
      description: { type: String },
      price: { type: Number, required: false },
      image: { type: String },
    },
  ],
  email: {
    type: String,
    required: true,
  },
  orderDatetime: {
    type: Date,
    default: Date.now,
  },
  token: {
    type: String,
    required: true,
  },
  isOrderPlaced: { type: Boolean, required:false, default: false },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order };
