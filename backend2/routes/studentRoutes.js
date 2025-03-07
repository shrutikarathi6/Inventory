const express = require("express");
const Student = require("../models/Student");
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

// ✅ Get Students by Search Query (Supports UniqueID Range)
router.get("/search", async (req, res) => {
    try {
        let query = { $and: [] };

        if (req.query.name) {
            const namesArray = req.query.name.split(",");
            query.$and.push({ name: { $in: namesArray.map(n => new RegExp(n, "i")) } });
        }

        
        if (req.query.uniqueidFrom || req.query.uniqueidTo) {
            let uniqueidFilter = {};
            if (req.query.uniqueidFrom) uniqueidFilter.$gte = Number(req.query.uniqueidFrom);
            if (req.query.uniqueidTo) uniqueidFilter.$lte = Number(req.query.uniqueidTo);
            query.$and.push({ uniqueid: uniqueidFilter });
        }

        
        if (req.query.rollFrom || req.query.rollTo) {
            let rollArray = {};
            if (req.query.rollFrom) rollArray.$gte = Number(req.query.rollFrom);
            if (req.query.rollTo) rollArray.$lte = Number(req.query.rollTo);
            query.$and.push({ roll: rollArray });
        }


        if (req.query.ageFrom || req.query.ageTo) {
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
