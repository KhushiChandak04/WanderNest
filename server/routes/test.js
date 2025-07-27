const express = require("express");
const router = express.Router();

const Test = require("../models/Test");

// Insert test entry
router.get("/add", async (req, res) => {
  try {
    const entry = await Test.create({ message: "Hello from WanderNest DB!" });
    res.json({ success: true, entry });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get all entries
router.get("/all", async (req, res) => {
  try {
    const entries = await Test.find();
    res.json({ success: true, entries });
  } catch (error) {
    res.status(500).json({ success: false, error: "Fetch failed" });
  }
});

module.exports = router;
