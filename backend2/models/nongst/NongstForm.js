const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    uniqueid: { type: String, required: true, unique: true },
    voucherno: { type: String },
    date: { type: Date, required: true }, // Updated to Date type
    drlegdername: { type: String ,required: true },
    dramount: { type: Number },
    referenceno: { type: String, required: true },
    referenceamount: { type: Number },
    drcostcenter: { type: String },
    drcostcenteramount: { type: String },
    crledgername: { type: String },
    cramount: { type: Number },
    crcostcenter: { type: String },
    crcostcenteramount: { type: Number },
    narration: { type: String },
    tallyimportstatus: { type: String },
    km: { type: Number },
    category: { type: String },
    subcategory: { type: String },
    details: { type: String },


});

module.exports = mongoose.model("NONGSTForm", formSchema);
