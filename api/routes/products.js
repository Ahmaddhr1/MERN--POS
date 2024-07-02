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

router.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findById(id);
    return res.json(products);
  } catch (e) {
    return res.status(500).json({ message: e.message });
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

router.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name,price,quantity } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, quantity}
    );
    console.log(updatedProduct)
    return res.json("Product Updated!");
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
})

router.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    return res.json("Product deleted!");
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
})

module.exports = router;
