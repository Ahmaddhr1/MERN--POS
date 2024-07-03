const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) return res.status(404).json({ message: "Users not found" });
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.post("/users", async (req, res) => {
  try {
    const { username, phoneNumber, location } = req.body;
    const user = new User({ username, phoneNumber, location });
    await user.save();
    return res.json("User Created!");
  } catch (e) {
    return res.status(500).json({ Errormessage: e.message });
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, phoneNumber, location } = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, {
      username,
      phoneNumber,
      location,
    });
    return res.json("User Updated!");
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json("User deleted!");
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;
