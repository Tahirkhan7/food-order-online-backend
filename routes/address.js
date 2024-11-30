const express = require("express");
const router = express.Router();
const { Address } = require("../schema/address.schema");

router.get("/all/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const addresses = await Address.find({ email });
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching addresses", error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const address = await Address.findById(id);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: "Error fetching address", error });
  }
});

router.post("/add", async (req, res) => {
  const { state, city, pincode, mobile, fullAddress, email } = req.body;

  if (!state || !city || !pincode || !mobile || !fullAddress || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const address = new Address({ state, city, pincode, mobile, fullAddress, email });
    await address.save();
    res.status(201).json({ message: "Address created successfully", address });
  } catch (error) {
    res.status(500).json({ message: "Error creating address", error });
  }
});

router.put("/edit", async (req, res) => {
  const { state, city, pincode, mobile, fullAddress, email, id } = req.body;

  try {
    if (!id) {
      const newAddress = new Address({ state, city, pincode, mobile, fullAddress, email });
      await newAddress.save();
      return res.status(201).json({ message: "Address created successfully", newAddress });
    } else {
      const address = await Address.findByIdAndUpdate(
        id,
        { state, city, pincode, mobile, fullAddress, email },
        { new: true }
      );
      res.status(200).json({ message: "Address updated successfully", address });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating address", error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const address = await Address.findByIdAndDelete(id);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting address", error });
  }
});

module.exports = router;
