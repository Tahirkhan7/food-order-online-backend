const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
});

const Food = mongoose.model("Food", FoodSchema);

module.exports = { Food };
