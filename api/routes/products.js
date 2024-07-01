const express = require("express");
const router = express.Router();
const Product = require("../models/Products");

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/products", async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const product = new Product({ name, price, quantity });
    await product.save();
    return res.json("Product Created!");
  } catch (e) {
    return res.status(500).json({ Errormessage: e.message });
  }
});

module.exports = router;
