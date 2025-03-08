const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    uniqueid: { type: Number, required: true, unique: true },
    roll: { type: Number, required: true },
    age: { type: Number, required: true }
});

module.exports = mongoose.model("Student", studentSchema);
