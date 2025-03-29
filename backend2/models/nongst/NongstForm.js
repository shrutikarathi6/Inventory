const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    uniqueid: { type: String, required: true, unique: true },
    voucherno: { type: String },
    date: { type: Date }, // Updated to Date type
    drlegdername: { type: String},
    dramount: { type: Number },
    referenceno: { type: String},
    
    crledgername: { type: String },
    cramount: { type: Number },
    
    narration: { type: String },
    tallyimportstatus: { type: String },
    companyname: {type: String},
    workdate: {type: Date},
    vehicleno: {type: String},
    km: { type: Number },
    category: { type: String },
    subcategory: { type: String },
    partno: {tyoe: String},
    details: { type: String },


});

module.exports = mongoose.model("NONGSTForm", formSchema);
