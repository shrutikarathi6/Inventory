const express = require("express");
const router = express.Router();
const ExcelJS = require("exceljs");
const Form = require("../../models/nongst/NongstForm");

router.get("/export", async (req, res) => {
    try {
        let query = { $and: [] };

        // Filters for text-based fields (Handles multiple values using $in)
        ["uniqueid", "referenceno", "drledgername", "category", "subcategory","companyname","vehicleno","partno"].forEach(field => {
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

        const students = await Form.find(query);

        if (students.length === 0) {
            return res.status(404).json({ error: "No entries found matching the criteria!" });
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Students");
    

        worksheet.columns = [
            { header: "Unique Id", key: "uniqueid", width: 15 },
            { header: "Voucher No", key: "voucherno", width: 15 },
            { header: "Voucher Type", key: "vouchertype", width: 15 },
            { header: "Voucher Date", key: "date", width: 15 },
            { header: "Dr Ledger Name", key: "drledgername", width: 20 },
            { header: "Dr Amount", key: "dramount", width: 15 },
            { header: "Reference No", key: "referenceno", width: 15 },
            { header: "Reference Amount", width: 15 },
            { header: "Dr Cost Center",  width: 20 },
            { header: "Dr Cost Center Amount",  width: 20 },
            { header: "Cr Ledger Name", key: "crledgername", width: 15 },
            { header: "Cr Amount", key: "cramount", width: 20 },
            { header: "Cr Cost Center",  width: 20 },
            { header: "Cr Cost Center Amount",  width: 20 },
            { header: "Narration", key: "narration", width: 30 },
            { header: "Tally Import Status", key: "tallyimportstatus", width: 20 },

            // { header: "Work Date", key: "workdate", width: 15 },
            // { header: "Vehicle No", key: "vehicleno", width: 15 },
            // { header: "Part No", key: "partno", width: 15 },
            { header: "KM", key: "km", width: 10 },
            { header: "Category", key: "category", width: 20 },
            { header: "Subcategory", key: "subcategory", width: 20 },
            { header: "Details", key: "details", width: 30 }
        ];


          // ✅ Make headers bold
          worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
        });

        // ✅ Insert rows into the worksheet
        students.forEach(student => {
            worksheet.addRow({
                ...student.toObject(), // Convert MongoDB document to plain object
                vouchertype: "Purchase" // ✅ Set "Voucher Type" as "Purchase"
            });
        });

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
