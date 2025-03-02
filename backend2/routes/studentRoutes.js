const express = require("express");
const Student = require("../models/Student");

const router = express.Router();

// Submit Student Data
router.post("/submit", async (req, res) => {
    try {
        const { name,uniqueid, roll, age } = req.body;

        // if (!name || !roll || !age) {
        //     return res.status(400).json({ error: "All fields are required!" });
        // }

        const newStudent = new Student({ name,uniqueid, roll, age });
        await newStudent.save();

        res.status(201).json({ message: "Student data saved successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error saving data!", details: error.message });
    }
});

// Get Students by Search Query (Flexible Search + Pagination)
router.get("/search", async (req, res) => {
    try {
        const { name, uniqueid, roll, age } = req.query;
        
        let query = { $or: [] };

        if (name) {
            const namesArray = Array.isArray(name) ? name : [name]; // Ensure it's an array
            query.$or.push(...namesArray.map(n => ({ name: new RegExp(n, "i") })));
        }

        if (uniqueid) {
            const uniqueidArray = Array.isArray(uniqueid) ? uniqueid : [uniqueid];
            query.$or.push(...uniqueidArray.map(id => ({ uniqueid: Number(id) })));
        }

        if (roll) {
            const rollArray = Array.isArray(roll) ? roll : [roll];
            query.$or.push(...rollArray.map(r => ({ roll: r })));
        }

        if (age) {
            const ageArray = Array.isArray(age) ? age : [age];
            query.$or.push(...ageArray.map(a => ({ age: Number(a) })));
        }

        // Remove empty $or conditions
        if (query.$or.length === 0) {
            delete query.$or;
        }

        console.log(query);

        const students = await Student.find(query)
            // .skip((page - 1) * limit) // Pagination
            // .limit(Number(limit));

        if (students.length === 0) {
            return res.status(404).json({ error: "No students found matching the criteria!" });
        }

        res.json({ results: students });

    } catch (error) {
        res.status(500).json({ error: "Error retrieving students!", details: error.message });
    }
});


module.exports = router;
