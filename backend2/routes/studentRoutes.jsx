const express = require("express");
const Student = require("../models/Student.jsx");

const router = express.Router();

// Submit Student Data
router.post("/submit", async (req, res) => {
    try {
        const { name, roll, age } = req.body;
        const newStudent = new Student({ name, roll, age });
        await newStudent.save();
        res.status(201).json({ message: "Student data saved successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error saving data!" });
    }
});

// Get Students by Name (Search Functionality)
router.get("/search", async (req, res) => {
    try {
        const nameQuery = req.query.name;
        const students = await Student.find({ name: new RegExp(nameQuery, "i") });
        res.json({ results: students });
    } catch (error) {
        res.status(500).json({ error: "Error retrieving students!" });
    }
});

module.exports = router;
