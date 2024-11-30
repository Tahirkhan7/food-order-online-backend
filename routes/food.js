const express = require("express");
const router = express.Router();
const { Food } = require("../schema/food.schema");

router.get("/all", async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: "Error fetching foods", error });
  }
});

router.get("/category", async (req, res) => {
  const { c } = req.query;

  if (!c) {
    return res.status(400).json({ message: "Category is required" });
  }

  try {
    const foods = await Food.find({ category: c });
    if (foods.length === 0) {
      return res.status(404).json({ message: "No foods found in this category" });
    }
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: "Error fetching foods by category", error });
  }
});


router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const food = await Food.findById(id);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ message: "Error fetching food", error });
  }
});

router.post("/add", async (req, res) => {
  const { name, category, description, price, image } = req.body;

  if (!name || !category || !price || !image) {
    return res.status(400).json({ message: "Name, category, and price are required" });
  }

  try {
    const food = new Food({ name, category, description, price, image });
    await food.save();
    res.status(201).json({ message: "Food created successfully", food });
  } catch (error) {
    res.status(500).json({ message: "Error creating food", error });
  }
});

router.put("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { name, category, description, price, image } = req.body;

  try {
    const food = await Food.findByIdAndUpdate(
      id,
      { name, category, description, price, image },
      { new: true }
    );
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.status(200).json({ message: "Food updated successfully", food });
  } catch (error) {
    res.status(500).json({ message: "Error updating food", error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const food = await Food.findByIdAndDelete(id);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.status(200).json({ message: "Food deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting food", error });
  }
});

module.exports = router;
