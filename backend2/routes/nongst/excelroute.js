const express = require("express");
const router = express.Router();
const ExcelJS = require("exceljs");
const Form = require("../../models/nongst/NongstForm");

router.get("/export", async (req, res) => {
    try {
        let query = { $and: [] };

        // Filters for text-based fields (Handles multiple values using $in)
        ["uniqueid", "referenceno", "drledgername", "category", "subcategory"].forEach(field => {
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
        const ans = "Journal"

        worksheet.columns = [
            { header: "Voucher No", key: "voucherno", width: 15 },
            { header: "Voucher Type", key: ans, width: 15 },
            { header: "Date", key: "date", width: 15 },
            { header: "Dr Ledger Name", key: "drledgername", width: 20 },
            { header: "Dr Amount", key: "dramount", width: 15 },
            { header: "Reference No", key: "referenceno", width: 15 },
            { header: "Reference Amount", key: "referenceamount", width: 15 },
            { header: "Dr Cost Center", key: "drcostcenter", width: 20 },
            { header: "Dr Cost Center Amount", key: "drcostcenteramount", width: 20 },
            { header: "Cr Ledger Name", key: "crledgername", width: 15 },
            { header: "Cr Amount", key: "cramount", width: 20 },
            { header: "Cr Cost Center", key: "crcostcenter", width: 20 },
            { header: "Cr Cost Center Amount", key: "crcostcenteramount", width: 20 },
            { header: "Narration", key: "narration", width: 30 },
            { header: "Tally Import Status", key: "tallyimportstatus", width: 20 },
            { header: "Company Name", key: "companyname", width: 15 },
            { header: "Work Date", key: "workdate", width: 15 },
            { header: "Vehicle No", key: "vehicleno", width: 15 },
            { header: "Part No", key: "partno", width: 15 },
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
