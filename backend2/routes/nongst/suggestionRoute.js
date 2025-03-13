const express = require("express");
const Form = require("../../models/nongst/NongstForm");

const router = express.Router();

// API route for fetching unique names with search query
router.get("/drledgername", async (req, res) => {
  try {
    const searchQuery = req.query.q || "";
    let drledgername = [];

    if (searchQuery) {
      drledgername = await Form.find({ drledgername: new RegExp("^" + searchQuery, "i") }, "drledgername");
      drledgername = [...new Set(drledgername.map(n => n.drledgername))]; // Ensure unique names
    }

    // If no match is found, try getting names with a partial match
    if (drledgername.length === 0 && searchQuery.length > 1) {
      const partialQuery = searchQuery.slice(0, -1); // Remove last character
      drledgername = await Form.find({ drledgername: new RegExp("^" + partialQuery, "i") }, "drledgername");
      drledgername = [...new Set(drledgername.map(n => n.drledgername))];
    }

    res.json(drledgername);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// API route for fetching unique names with search query
router.get("/crledgername", async (req, res) => {
  try {
    const searchQuery = req.query.q || "";
    let crledgername = [];

    if (searchQuery) {
      crledgername = await Form.find({ crledgername: new RegExp("^" + searchQuery, "i") }, "crledgername");
      crledgername = [...new Set(crledgername.map(n => n.crledgername))]; // Ensure unique names
    }

    // If no match is found, try getting names with a partial match
    if (crledgername.length === 0 && searchQuery.length > 1) {
      const partialQuery = searchQuery.slice(0, -1); // Remove last character
      crledgername = await Form.find({ crledgername: new RegExp("^" + partialQuery, "i") }, "crledgername");
      crledgername = [...new Set(crledgername.map(n => n.crledgername))];
    }

    res.json(crledgername);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API route for fetching unique names with search query
router.get("/crcostcenter", async (req, res) => {
  try {
    const searchQuery = req.query.q || "";
    let crcostcenter = [];

    if (searchQuery) {
      crcostcenter = await Form.find({ crcostcenter: new RegExp("^" + searchQuery, "i") }, "crcostcenter");
      crcostcenter = [...new Set(crcostcenter.map(n => n.crcostcenter))]; // Ensure unique names
    }

    // If no match is found, try getting names with a partial match
    if (crcostcenter.length === 0 && searchQuery.length > 1) {
      const partialQuery = searchQuery.slice(0, -1); // Remove last character
      crcostcenter = await Form.find({ crcostcenter: new RegExp("^" + partialQuery, "i") }, "crcostcenter");
      crcostcenter = [...new Set(crcostcenter.map(n => n.crcostcenter))];
    }

    res.json(crcostcenter);
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
