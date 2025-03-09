const express = require("express");
const router = express.Router();
const ExcelJS = require("exceljs");
const Form = require("../models/Form");

router.get("/export", async (req, res) => {
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

        const students = await Form.find(query);

        if (students.length === 0) {
            return res.status(404).json({ error: "No entries found matching the criteria!" });
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Students");

        worksheet.columns = [
            { header: "Voucher No", key: "voucherno", width: 15 },
            { header: "Date", key: "date", width: 15 },
            { header: "Reference No", key: "referenceno", width: 15 },
            { header: "Party Name", key: "partyname", width: 20 },
            { header: "Ledger Group", key: "ledgergroup", width: 15 },
            { header: "Registration Type", key: "registrationtype", width: 18 },
            { header: "GSTIN No", key: "gstinno", width: 20 },
            { header: "Country", key: "country", width: 15 },
            { header: "State", key: "state", width: 15 },
            { header: "Pincode", key: "pincode", width: 10 },
            { header: "Address 1", key: "address1", width: 25 },
            { header: "Address 2", key: "address2", width: 25 },
            { header: "Address 3", key: "address3", width: 25 },
            { header: "Purchase Ledger", key: "purchaseledger", width: 20 },
            { header: "Amount", key: "amount", width: 15 },
            { header: "Sales Cost Center", key: "salescostcenter", width: 20 },
            { header: "Purchase Amount", key: "purchaseamount", width: 15 },
            { header: "Additional Ledger", key: "additionalledge", width: 20 },
            { header: "Ledger Amount", key: "ledgeamount", width: 15 },
            { header: "CGST Ledger", key: "cgstledger", width: 15 },
            { header: "CGST Amount", key: "cgstamount", width: 15 },
            { header: "SGST Ledger", key: "sgstledger", width: 15 },
            { header: "SGST Amount", key: "sgstamount", width: 15 },
            { header: "IGST Ledger", key: "igstledger", width: 15 },
            { header: "IGST Amount", key: "igstamount", width: 15 },
            { header: "Cess Ledger", key: "cessledger", width: 15 },
            { header: "Cess Amount", key: "cessamount", width: 15 },
            { header: "Total", key: "total", width: 15 },
            { header: "Narration", key: "narration", width: 30 },
            { header: "Tally Import Status", key: "tallyimportstatus", width: 20 },
            { header: "KM", key: "km", width: 10 },
            { header: "Category", key: "category", width: 20 },
            { header: "Subcategory", key: "subcategory", width: 20 },
            { header: "Details", key: "details", width: 30 }
        ];
        

        students.forEach(student => worksheet.addRow(student));

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=students.xlsx");

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error("Excel Export Error:", error);
        res.status(500).json({ error: "Error exporting data!" });
    }
});

module.exports = router;
