const express = require("express");
const Form = require("../../models/gst/GstForm");

const router = express.Router();

// API route for fetching unique names with search query
router.get("/partyname", async (req, res) => {
  try {
    const searchQuery = req.query.q || "";
    let partyname = [];

    if (searchQuery) {
      partyname = await Form.find({ partyname: new RegExp("^" + searchQuery, "i") }, "partyname");
      partyname = [...new Set(partyname.map(n => n.partyname))]; // Ensure unique names
    }

    // If no match is found, try getting names with a partial match
    if (partyname.length === 0 && searchQuery.length > 1) {
      const partialQuery = searchQuery.slice(0, -1); // Remove last character
      partyname = await Form.find({ partyname: new RegExp("^" + partialQuery, "i") }, "partyname");
      partyname = [...new Set(partyname.map(n => n.partyname))];
    }

    res.json(partyname);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API route for fetching unique names with search query
router.get("/purchaseledger", async (req, res) => {
  try {
    const searchQuery = req.query.q || "";
    let purchaseledger = [];

    if (searchQuery) {
      purchaseledger = await Form.find({ purchaseledger: new RegExp("^" + searchQuery, "i") }, "purchaseledger");
      purchaseledger = [...new Set(purchaseledger.map(n => n.purchaseledger))]; // Ensure unique names
    }

    // If no match is found, try getting names with a partial match
    if (purchaseledger.length === 0 && searchQuery.length > 1) {
      const partialQuery = searchQuery.slice(0, -1); // Remove last character
      purchaseledger = await Form.find({ purchaseledger: new RegExp("^" + partialQuery, "i") }, "purchaseledger");
      purchaseledger = [...new Set(purchaseledger.map(n => n.purchaseledger))];
    }

    res.json(purchaseledger);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API route for fetching unique names with search query
router.get("/subcategory", async (req, res) => {
  try {
    const searchQuery = req.query.q || "";
    let subcategory = [];

    if (searchQuery) {
      subcategory = await Form.find({ subcategory: new RegExp("^" + searchQuery, "i") }, "subcategory");
      subcategory = [...new Set(subcategory.map(n => n.subcategory))]; // Ensure unique names
    }

    // If no match is found, try getting names with a partial match
    if (subcategory.length === 0 && searchQuery.length > 1) {
      const partialQuery = searchQuery.slice(0, -1); // Remove last character
      subcategory = await Form.find({ subcategory: new RegExp("^" + partialQuery, "i") }, "subcategory");
      subcategory = [...new Set(subcategory.map(n => n.subcategory))];
    }

    res.json(subcategory);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
