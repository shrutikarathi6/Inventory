const express = require("express");
const router = express.Router();
const ExcelJS = require("exceljs");
const Student = require("../models/Student");

router.get("/export", async (req, res) => {
    try {
        let query = { $and: [] };

        if (req.query.name) {
            const namesArray = req.query.name.split(",");
            query.$and.push({ name: { $in: namesArray.map(n => new RegExp(n, "i")) } });
        }

        ["uniqueid", "roll", "age"].forEach(field => {
            let filter = {};
            if (req.query[`${field}From`]) filter.$gte = Number(req.query[`${field}From`]);
            if (req.query[`${field}To`]) filter.$lte = Number(req.query[`${field}To`]);
            if (Object.keys(filter).length > 0) query.$and.push({ [field]: filter });
        });

        if (query.$and.length === 0) delete query.$and;

        console.log("Generated Query:", JSON.stringify(query, null, 2));

        const students = await Student.find(query);

        if (students.length === 0) {
            return res.status(404).json({ error: "No students found matching the criteria!" });
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Students");

        worksheet.columns = [
            { header: "Name", key: "name", width: 20 },
            { header: "Unique ID", key: "uniqueid", width: 15 },
            { header: "Roll", key: "roll", width: 15 },
            { header: "Age", key: "age", width: 10 }
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
