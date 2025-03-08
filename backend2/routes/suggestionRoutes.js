const express = require("express");
const Student = require("../models/Student");

const router = express.Router();

// API route for fetching unique names with search query
router.get("/names", async (req, res) => {
  try {
    const searchQuery = req.query.q || "";
    let names = [];

    if (searchQuery) {
      names = await Student.find({ name: new RegExp("^" + searchQuery, "i") }, "name");
      names = [...new Set(names.map(n => n.name))]; // Ensure unique names
    }

    // If no match is found, try getting names with a partial match
    if (names.length === 0 && searchQuery.length > 1) {
      const partialQuery = searchQuery.slice(0, -1); // Remove last character
      names = await Student.find({ name: new RegExp("^" + partialQuery, "i") }, "name");
      names = [...new Set(names.map(n => n.name))];
    }

    res.json(names);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
