const express = require("express");
const Form = require("../../models/gst/GstForm");
const router = express.Router();

// ✅ Submit Data
router.post("/submit", async (req, res) => {
    try {
        const { 
            voucherno, date, referenceno, partyname, ledgergroup, registrationtype, 
            gstinno, country, state, pincode, address1, address2, address3, 
            purchaseledger, amount, salescostcenter, purchaseamount, additionalledge, 
            ledgeamount, cgstledger, cgstamount, sgstledger, sgstamount, igstledger, 
            igstamount, cessledger, cessamount, total, narration, tallyimportstatus,companyname,workdate,vehicleno, 
            km, category, subcategory,partno, details
        } = req.body;

        // Ensure required fields are present
        if (!referenceno || !partyname || !date || !amount) {
            return res.status(400).json({ error: "Missing required fields: referenceno, partyname, date, or amount" });
        }

        // Generate uniqueid as partyname + referenceno
        const uniqueid = `${partyname.replace(/\s+/g, "_")}${referenceno}`;


        // Check if a record with the same uniqueid already exists
        const existingEntry = await Form.findOne({ uniqueid });
        if (existingEntry) {
            return res.status(400).json({ error: "Entry with this Unique ID already exists!" });
        }

        // Create and save a new form entry
        const newFormEntry = new Form({ 
            voucherno, date, referenceno, partyname, ledgergroup, registrationtype, 
            gstinno, country, state, pincode, address1, address2, address3, 
            purchaseledger, amount, salescostcenter, purchaseamount, additionalledge, 
            ledgeamount, cgstledger, cgstamount, sgstledger, sgstamount, igstledger, 
            igstamount, cessledger, cessamount, total, narration, tallyimportstatus,companyname,workdate,vehicleno, 
            km, category, subcategory,partno, details
        });

        await newFormEntry.save();
        res.status(201).json({ message: "Form data saved successfully!", data: newFormEntry });

    } catch (error) {
        res.status(500).json({ error: "Error saving form data!", details: error.message });
    }
});

// ✅ Search Entries with Filters
router.get("/search", async (req, res) => {
    try {
        let query = { $and: [] };

        // Filters for text-based fields (Handles multiple values using $in)
        ["uniqueid", "referenceno", "partyname", "purchaseledger", "category", "subcategory"].forEach(field => {
            if (req.query[field]) {
                const valuesArray = req.query[field].split(",");
                query.$and.push({ [field]: { $in: valuesArray.map(value => new RegExp(value, "i")) } });
            }
        });

        // Filters for numerical range-based fields
        ["amount", "km", "total"].forEach(field => {
            let filter = {};
            if (req.query[`${field}From`]) filter.$gte = Number(req.query[`${field}From`]); 
            if (req.query[`${field}To`]) filter.$lte = Number(req.query[`${field}To`]);   
            if (Object.keys(filter).length > 0) query.$and.push({ [field]: filter });
        });

        // Ensure `date` field is properly filtered
        let dateFilter = {};
        if (req.query.dateFrom) dateFilter.$gte = new Date(req.query.dateFrom);
        if (req.query.dateTo) dateFilter.$lte = new Date(req.query.dateTo);
        if (Object.keys(dateFilter).length > 0) query.$and.push({ date: dateFilter });

        // If no filters were applied, reset to fetch all entries
        if (query.$and.length === 0) query = {};

        console.log("Generated Query:", JSON.stringify(query, null, 2));

        // Fetch results from MongoDB
        const entries = await Form.find(query);

        if (entries.length === 0) {
            return res.status(404).json({ error: "No entry found matching the criteria!" });
        }

        res.json({ results: entries });

    } catch (error) {
        res.status(500).json({ error: "Error retrieving entries!", details: error.message });
    }
});

// ✅ Delete Entry by Unique ID
router.delete("/delete/:uniqueid", async (req, res) => {
    try {
        const { uniqueid } = req.params;
        const deletedEntry = await Form.findOneAndDelete({ uniqueid });

        if (!deletedEntry) {
            return res.status(404).json({ message: "Entry not found" });
        }

        res.json({ message: "Entry deleted successfully", deletedEntry });
    } catch (error) {
        res.status(500).json({ message: "Error deleting entry", error });
    }
});

// ✅ Update Entry by Unique ID
router.put("/update/:uniqueid", async (req, res) => {
    try {
        const { uniqueid } = req.params;
        const updatedData = req.body;

        const updatedEntry = await Form.findOneAndUpdate(
            { uniqueid },
            updatedData,
            { new: true } 
        );

        if (!updatedEntry) {
            return res.status(404).json({ message: "Entry not found" });
        }

        res.json({ message: "Entry updated successfully", updatedEntry });
    } catch (error) {
        res.status(500).json({ message: "Error updating Entry", error });
    }
});

module.exports = router;
