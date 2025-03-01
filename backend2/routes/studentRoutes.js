const express = require("express");
const Student = require("../models/Student");

const router = express.Router();

// Submit Student Data
router.post("/submit", async (req, res) => {
    try {
        const { name, roll, age } = req.body;

        if (!name || !roll || !age) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        const newStudent = new Student({ name, roll, age });
        await newStudent.save();

        res.status(201).json({ message: "Student data saved successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error saving data!", details: error.message });
    }
});

// Get Students by Search Query (Flexible Search + Pagination)
router.get("/search", async (req, res) => {
    try {
        const { name, roll, age, page = 1, limit = 10 } = req.query;
        
        let query = {};

        if (name) {
            query.name = new RegExp(name, "i"); // Case-insensitive search
        }
        if (roll) {
            query.roll = roll; // Exact match for roll number
        }
        if (age) {
            query.age = Number(age); // Convert to number for proper matching
        }

        const students = await Student.find(query)
            .skip((page - 1) * limit) // Pagination
            .limit(Number(limit));

        if (students.length === 0) {
            return res.status(404).json({ error: "No students found matching the criteria!" });
        }

        res.json({ results: students, page: Number(page), limit: Number(limit) });

    } catch (error) {
        res.status(500).json({ error: "Error retrieving students!", details: error.message });
    }
});

module.exports = router;
