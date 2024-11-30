const express = require("express");
const router = express.Router();
const { Order } = require("../schema/order.schema");
const { Food } = require("../schema/food.schema");
const mongoose = require("mongoose");

router.get("/all", async (req, res) => {
  try {
    const orders = await Order.find().populate("items.id");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
});

router.post("/add", async (req, res) => {
  const { items, email } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Items array is required" });
  }

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const ids = items.map((item) => item.id);
    const foods = await Food.find({ _id: { $in: ids } });

    if (foods.length !== items.length) {
      return res.status(404).json({ message: "Some food items not found" });
    }

    const order = new Order({
      items,
      email,
    });

    await order.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error });
  }
});

router.post("/update", async (req, res) => {
  const { email, items, token } = req.body;

  try {
    let cart = await Order.findOne({ token });

    if (!cart) {
      cart = new Order({
        email,
        items: items.map((item) => ({
          id: new mongoose.Types.ObjectId(item.id),
          quantity: item.quantity,
          name: item.name,
          category: item.category,
          description: item.description,
          price: item.price,
          image: item.image,
        })),
        token,
      });
    } else {
      items.forEach((item) => {
        const itemIndex = cart.items.findIndex(
          (cartItem) => cartItem.id.toString() === item.id
        );

        if (itemIndex >= 0) {
        //   cart.items[itemIndex].quantity += item.quantity;
        
        if(cart.items[itemIndex].quantity < item.quantity)
          cart.items[itemIndex].quantity += 1;
        } else {
          cart.items.push({
            id: new mongoose.Types.ObjectId(item.id),
            quantity: item.quantity,
            name: item.name,
            category: item.category,
            description: item.description,
            price: item.price,
            image: item.image,
          });
        }
      });
    }

    await cart.save();

    res.status(200).json({ message: "Cart updated successfully", cart });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Error updating cart", error });
  }
});

router.get("/token/:token", async (req, res) => {
  const { token } = req.query;
  console.log(token)
  if (!token) {
    return res.status(400).json({ message: "Valid link is required!" });
  }

  try {
    const orders = await Order.findOne({ token });
    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this link!" });
    }
    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching orders by this link!", error });
  }
});

router.put("/updateStatus", async (req, res) => {
  const { id } = req.body;

  try {
    if (!id) {
      return res.status(201).json({ message: "Order not found!", newAddress });
    } else {
      const order = await Address.findByIdAndUpdate(
        id,
        { isOrderPlaced: true },
        { new: false }
      );
      res.status(200).json({ message: "Order status updated successfully.", order });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating order!", error });
  }
});

module.exports = router;
