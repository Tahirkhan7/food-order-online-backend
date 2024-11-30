const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  state: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  mobile: { type: String, required: true },
  fullAddress: { type: String, required: true },
  email: { type: String, required: true },
});

const Address = mongoose.model("Address", AddressSchema);

module.exports = { Address };
