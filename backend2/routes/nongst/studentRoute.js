const express = require("express");
const Form = require("../../models/nongst/NongstForm");
const router = express.Router();

// ✅ Submit Data
router.post("/submit", async (req, res) => {
    try {
        const {
            voucherno, date, drledgername, dramount, referenceno,  crledgername
            , cramount, 
            narration, tallyimportstatus,companyname,workdate,vehicleno,
            km, category, subcategory,partno,  details
        } = req.body;

        let prefix = companyname === "YLPL" ? "NY" : companyname === "ARS" ? "NA" : null;
        if (!prefix) {
            return res.status(400).json({ error: "Invalid company name!" });
        }

        // ✅ 2. Fetch the latest count for the given prefix (atomic operation)
        const lastEntry = await Form.findOne({ uniqueid: new RegExp(`^${prefix}\\d+$`) })
            .sort({ uniqueid: -1 }) // Sort in descending order to get the latest
            .select("uniqueid");

        let newCount = 1; // Default count if no previous entry exists
        if (lastEntry) {
            const lastNumber = parseInt(lastEntry.uniqueid.replace(prefix, ""), 10);
            newCount = lastNumber + 1;
        }

        // ✅ 3. Generate Unique ID
        const uniqueid = `${prefix}${newCount}`;


        // Create and save a new form entry
        const newFormEntry = new Form({
           uniqueid, voucherno, date, drledgername, dramount, referenceno,  crledgername
            , cramount, 
            narration, tallyimportstatus,companyname,workdate,vehicleno,
            km, category, subcategory,partno,  details
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
        ["uniqueid", "referenceno", "category", "subcategory","companyname","vehicleno","partno"].forEach(field => {
            if (req.query[field]) {
                const valuesArray = req.query[field].split(",");
                query.$and.push({ [field]: { $in: valuesArray.map(value => new RegExp(value, "i")) } });
            }
        });

        // Filters for numerical range-based fields
        ["dramount", "km"].forEach(field => {
            let filter = {};
            if (req.query[`${field}From`]) filter.$gte = Number(req.query[`${field}From`]);
            if (req.query[`${field}To`]) filter.$lte = Number(req.query[`${field}To`]);
            if (Object.keys(filter).length > 0) query.$and.push({ [field]: filter });
        });

        // Ensure `date` field is properly filtered
        ["date", "workdate"].forEach((field) => {
            let filter = {};
        
            if (req.query[`${field}From`] && req.query[`${field}From`] !== "null") {
                filter.$gte = new Date(req.query[`${field}From`]);
            }
            if (req.query[`${field}To`] && req.query[`${field}To`] !== "null") {
                let dateTo = new Date(req.query[`${field}To`]);
                dateTo.setHours(23, 59, 59, 999); // Include the full day
                filter.$lte = dateTo;
            }
        
            if (Object.keys(filter).length > 0) {
                query.$and.push({ [field]: filter });
            }
        });
        

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
