const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  uniqueid: { type: String, required: true, unique: true }, 
  voucherno: { type: String },
  date: { type: Date }, // Updated to Date type
  referenceno: { type: String},
  suppinvdate: { type: Date }, 
  partyname: { type: String },
  additionalledge: { type: String },
  amount: { type: Number },
  cgstledger: { type: String },
  cgstpercent: { type: Number },
  cgstamount: { type: Number },
  sgstledger: { type: String },
  sgstpercent:{ type: Number },
  sgstamount: { type: Number },
  igstledger: { type: String },
  igstpercent:{ type: Number },
  igstamount: { type: Number },
  cessledger: { type: String },
  cessamount: { type: Number },
  total: { type: Number },
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

module.exports = mongoose.model("GSTForm", formSchema);
