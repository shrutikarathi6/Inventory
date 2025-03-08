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

      // Name filter (Handles multiple names using $in)
      if (req.query.name) {
          const namesArray = req.query.name.split(",");
          query.$and.push({ name: { $in: namesArray.map(n => new RegExp(n, "i")) } });
      }

      // Filters for uniqueid, roll, and age
      ["uniqueid", "roll", "age"].forEach(field => {
          let filter = {};
          if (req.query[`${field}From`]) filter.$gte = Number(req.query[`${field}From`]); // ✅ Fixed Syntax
          if (req.query[`${field}To`]) filter.$lte = Number(req.query[`${field}To`]);   // ✅ Fixed Syntax
          if (Object.keys(filter).length > 0) query.$and.push({ [field]: filter });
      });

      // If no filter was applied, reset query to empty (fetch all)
      if (query.$and.length === 0) {
          query = {};
      }

      console.log("Generated Query:", JSON.stringify(query, null, 2));

      // Fetch results from MongoDB
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
