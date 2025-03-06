const express = require("express");
const Student = require("../models/Student");
const ExcelJS = require("exceljs");

const router = express.Router();

// ✅ Submit Student Data
router.post("/submit", async (req, res) => {
    try {
        const { name, uniqueid, roll, age } = req.body;

        const newStudent = new Student({ name, uniqueid, roll, age });
        await newStudent.save();

        res.status(201).json({ message: "Student data saved successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error saving data!", details: error.message });
    }
});

// ✅ Get Students by Search Query (Fixed Age Filtering)
router.get("/search", async (req, res) => {
    try {
        let query = { $and: [] };

        if (req.query.name) {
            const namesArray = req.query.name.split(",");
            query.$and.push({ name: { $in: namesArray.map(n => new RegExp(n, "i")) } });
        }

        if (req.query.uniqueid) {
            const uniqueidArray = req.query.uniqueid.split(",");
            query.$and.push({ uniqueid: { $in: uniqueidArray.map(id => Number(id)) } });
        }

        if (req.query.roll) {
            const rollArray = req.query.roll.split(",");
            query.$and.push({ roll: { $in: rollArray.map(r => Number(r)) } });
        }

        // ✅ Age Filter (Supports Multiple Values & Range)
        if (req.query.age) {
            const ageArray = req.query.age.split(",").map(Number);
            query.$and.push({ age: { $in: ageArray } });
        } else if (req.query.ageFrom || req.query.ageTo) {
            let ageFilter = {};
            if (req.query.ageFrom) ageFilter.$gte = Number(req.query.ageFrom);
            if (req.query.ageTo) ageFilter.$lte = Number(req.query.ageTo);
            query.$and.push({ age: ageFilter });
        }

        if (query.$and.length === 0) {
            query = {};
        }

        console.log("Generated Query:", JSON.stringify(query, null, 2));

        const students = await Student.find(query);

        if (students.length === 0) {
            return res.status(404).json({ error: "No students found matching the criteria!" });
        }

        res.json({ results: students });

    } catch (error) {
        res.status(500).json({ error: "Error retrieving students!", details: error.message });
    }
});

// ✅ Export Student Data to Excel (Fixed Filtering)
router.get("/export/excel", async (req, res) => {
    try {
        let query = { $and: [] };

        if (req.query.name) {
            const namesArray = req.query.name.split(",");
            query.$and.push({ name: { $in: namesArray.map(n => new RegExp(n, "i")) } });
        }

        if (req.query.uniqueid) {
            const uniqueidArray = req.query.uniqueid.split(",");
            query.$and.push({ uniqueid: { $in: uniqueidArray.map(id => Number(id)) } });
        }

        if (req.query.roll) {
            const rollArray = req.query.roll.split(",");
            query.$and.push({ roll: { $in: rollArray.map(r => Number(r)) } });
        }

        // ✅ Age Filter (Supports Multiple Values & Range)
        if (req.query.age) {
            const ageArray = req.query.age.split(",").map(Number);
            query.$and.push({ age: { $in: ageArray } });
        } else if (req.query.ageFrom || req.query.ageTo) {
            let ageFilter = {};
            if (req.query.ageFrom) ageFilter.$gte = Number(req.query.ageFrom);
            if (req.query.ageTo) ageFilter.$lte = Number(req.query.ageTo);
            query.$and.push({ age: ageFilter });
        }

        if (query.$and.length === 0) {
            query = {};
        }

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

        students.forEach(student => {
            worksheet.addRow(student);
        });

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=students.xlsx");

        await workbook.xlsx.write(res);
        res.end();

    } catch (error) {
        console.error("Excel Export Error:", error);
        res.status(500).json({ error: "Error exporting data!", details: error.message });
    }
});




router.delete("/delete/:uniqueid", async (req, res) => {
    try {
      const { uniqueid } = req.params;
      const deletedStudent = await Student.findOneAndDelete({ uniqueid });
  
      if (!deletedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      res.json({ message: "Student deleted successfully", deletedStudent });
    } catch (error) {
      res.status(500).json({ message: "Error deleting student", error });
    }
  });
  
  router.put("/update/:uniqueid", async (req, res) => {
    try {
      const { uniqueid } = req.params;
      const updatedData = req.body;
  
      const updatedStudent = await Student.findOneAndUpdate(
        { uniqueid },
        updatedData,
        { new: true } 
      );
  
      if (!updatedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      res.json({ message: "Student updated successfully", updatedStudent });
    } catch (error) {
      res.status(500).json({ message: "Error updating student", error });
    }
  });
  
module.exports = router;
