import "./formcss.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/navbar";
import categoryOptions from "../../../../data/categorysub.jsx";

import useAutocomplete from "../../../hooks/useAutocomplete"; // Import the custom hook
import PartyNames from "../../../../data/party_name.jsx";
import drledgername from "../../../../data/drledgername.jsx";
import VehicleNos from "../../../../data/vehicleno.jsx";
// import VehicleNumbers from "../../../../vehicle_numbers";

const ExampleForm = () => {


  const [cgstpercent, setCgstPercent] = useState("");
  const [igstpercent, setIgstPercent] = useState("");

  const [formData, setFormData] = useState({

    voucherno: "", date: "", referenceno: "", suppinvdate: "", partyname: "", additionalledge: "", amount: "",
    cgstledger: "", cgstpercent: "", cgstamount: "", sgstledger: "", sgstpercent: "", sgstamount: "", igstledger: "", igstpercent: "", igstamount: "",
    cessledger: "", cessamount: "", total: "", narration: "", tallyimportstatus: "", companyname: "", workdate: "", vehicleno: "", km: "",
    category: "", subcategory: "", partno: "", details: ""


  });

  const { filteredOptions: filteredPartyNames, showDropdown: showPartyDropdown, handleInputChange: handlePartyInput, handleSelect: selectParty } =
    useAutocomplete(PartyNames, formData, setFormData, "partyname");

    const { filteredOptions: filteredDrLedgerNames, showDropdown: showDrLedgerDropdown, handleInputChange: handleDrLedgerInput, handleSelect: selectDrLedger } =
    useAutocomplete(drledgername, formData, setFormData, "additionalledge");

    const { filteredOptions: filteredVehicleNames, showDropdown: showVehicleDropdown, handleInputChange: handleVehicleInput, handleSelect: selectVehicle } =
    useAutocomplete(VehicleNos, formData, setFormData, "vehicleno");


  useEffect(() => {

    const newcgstamount = (parseFloat(formData.amount) * parseFloat(formData.cgstpercent)) / 100 || 0;

    setFormData((prev) => ({
      ...prev,
      cgstamount: newcgstamount.toFixed(2),
      sgstamount: newcgstamount.toFixed(2),
      sgstpercent: cgstpercent


    }));

  }, [formData.amount, formData.cgstpercent]);




  // useEffect hook to sync CGST values with SGST values
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,

      referenceno: prev.voucherno,
    }));
  }, [formData.voucherno]);


  useEffect(() => {
    setFormData((prev) => ({
      ...prev,

      suppinvdate: prev.date,
    }));
  }, [formData.date]);


  useEffect(() => {

    const newigstamount = (parseFloat(formData.amount) * parseFloat(formData.igstpercent)) / 100 || 0;

    setFormData((prev) => ({
      ...prev,
      igstamount: newigstamount.toFixed(2),

    }));

  }, [formData.amount, formData.igstpercent]);


  useEffect(() => {

    const newigstamount = (parseFloat(formData.amount) * parseFloat(formData.igstpercent)) / 100 || 0;
    const newcgstamount = (parseFloat(formData.amount) * parseFloat(formData.cgstpercent)) / 100 || 0;

    const newamount = (parseFloat(formData.amount) + 2 * newcgstamount + newigstamount);
    // if (!isNaN(newamount)) {
    setFormData((prev) => ({ ...prev, total: newamount.toFixed(2) }));
    // }

  }, [formData.amount, formData.cgstpercent, formData.igstpercent]);





  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedData = { ...formData, [name]: value };

    // Reset subcategory when category changes
    if (name === "category") {
      updatedData.subcategory = "";
    }

    // Auto-fill SGST Ledger when CGST Ledger is typed
    if (name === "cgstledger") {
      updatedData.sgstledger = value.replace(/cgst/i, "SGST");
    }

    // If CGST percent is entered, set SGST percent same & disable IGST
    if (name === "cgstpercent" || name === "cgstledger" || name === "sgstledger") {

      updatedData.igstledger = "";
      updatedData.igstpercent = "";
      updatedData.igstamount = "";
    }


    if (name === "igstpercent" || name === "igstledger") {
      updatedData.cgstledger = "";
      updatedData.sgstledger = "";
      updatedData.cgstpercent = "";
      updatedData.sgstpercent = "";
      updatedData.cgstamount = "";
      updatedData.sgstamount = "";
    }

    setFormData(updatedData);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/gst/students/submit", formData);
      alert(response.data.message);
      setFormData({
        voucherno: "", date: "", referenceno: "", suppinvdate: "", partyname: "", additionalledge: "", amount: "",
        cgstledger: "", cgstpercent: "", cgstamount: "", sgstledger: "", sgstpercent: "", sgstamount: "", igstledger: "", igstpercent: "", igstamount: "",
        cessledger: "", cessamount: "", total: "", narration: "", tallyimportstatus: "", companyname: "", workdate: "", vehicleno: "", km: "",
        category: "", subcategory: "", partno: "", details: ""

      });


    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit data!");
    }
  };


  return (
    <>
      <Navbar />
      <div className="backgroundhome">
        <div className="foregroundhome">
          <div className='scroll-container'>
            <h2 style={{ marginLeft: "40%", marginRight: "35%" }}>Add Details For GST</h2>


            <form onSubmit={handleSubmit} className="form-container">

              <div className="bajubaju">
                {/* voucher No */}
                <div className="input-container">
                  <label className="input-label">Voucher No</label>
                  <input
                    type="text"
                    name="voucherno"
                    placeholder="Enter Voucher No"
                    className="input-field"
                    value={formData.voucherno}
                    onChange={handleChange}

                  />
                </div>

                {/* voucher type
                <div className="input-container">
                  <label className="input-label">Vch Type:</label>
                  <input
                    type="text"
                    className="input-field"
                    value={"Purchase"}
                    readOnly
                  />
                </div> */}


                {/* Date */}
                <div className="input-container">
                  <label className="input-label">Date</label>
                  <input
                    type="date"
                    name="date"
                    placeholder="Enter date"
                    className="input-field"
                    value={formData.date}
                    onChange={handleChange}

                  />
                </div>
              </div>


              <div className="bajubaju">
                {/* Reference No */}
                <div className="input-container">
                  <label className="input-label">Supp Inv No</label>
                  <input
                    type="text"
                    name="referenceno"
                    className="input-field"
                    value={formData.referenceno}
                    readOnly

                  />
                </div>

                {/* Date */}
                <div className="input-container">
                  <label className="input-label">Supp Inv Date</label>
                  <input
                    type="date"
                    name="suppinvdate"
                    className="input-field"
                    value={formData.suppinvdate}
                    readOnly

                  />
                </div>
              </div>

              <div className="bajubaju">

                {/* Party Name */}

                <div className="input-container">
                  <label className="input-label">Party Name:</label>
                  <input
                    type="text"
                    name="partyname"
                    className="input-field"
                    placeholder="Enter Party Name"
                    value={formData.partyname}
                    onChange={handlePartyInput}
                    autoComplete="off"
                  />
                  {showPartyDropdown && (
                    <div className="dropdown">
                      {filteredPartyNames.map((party, index) => (
                        <div
                          key={index}
                          className="dropdown-item"
                          onClick={() => selectParty(party)}
                        >
                          {party}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* voucher type */}
                <div className="input-container">
                  <label className="input-label">Vch Type:</label>
                  <input
                    type="text"
                    className="input-field"
                    value={"Purchase"}
                    readOnly
                  />
                </div>
              </div>

              {/* Additional Ledge*/}
              <div className="bajubaju">
                <div className="input-container">
                  <label className="input-label">Additional Ledge</label>
                  <input
                    type="text"
                    name="additionalledge"
                    placeholder="Enter Additional Ledge"
                    className="input-field"
                    value={formData.additionalledge}
                   onChange={handleDrLedgerInput}
                    autoComplete="off"
                          
                  />
                  {showDrLedgerDropdown && (
                    <div className="dropdown">
                      {filteredDrLedgerNames.map((party, index) => (
                        <div
                          key={index}
                          className="dropdown-item"
                          onClick={() => selectDrLedger(party)}
                        >
                          {party}
                        </div>
                      ))}
                    </div>
                  )}
                </div>


                {/* Amount */}
                <div className="input-container">
                  <label className="input-label">Amount</label>
                  <input
                    type="number"
                    name="amount"
                    placeholder="Enter Amount"
                    className="input-field"
                    value={formData.amount}
                    onChange={handleChange}
                    step="any" // Allows decimal values
                    required
                  />
                </div>
              </div>




              {/* Cgst Ledger*/}
              <div className="bajubaju">

                {/* Igst percentage*/}
                <div className="input-container">
                  <label className="input-label">Cgst Ledger</label>
                  <input
                    type="text"
                    name="cgstledger"
                    placeholder="Enter cgstledger"
                    className="input-field"
                    value={formData.cgstledger}
                    onChange={handleChange}
                    disabled={formData.igstpercent || formData.igstledger}
                  />
                </div>



                {/* Cgst percentage*/}
                <div className="input-container">
                  <label className="input-label">Cgst in %</label>
                  <input
                    type="number"
                    name="cgstpercent"
                    placeholder="Enter Cgst Percent"
                    className="input-field"
                    value={formData.cgstpercent}
                    onChange={handleChange}
                    disabled={formData.igstpercent || formData.igstledger}
                  />
                </div>


                {/* Cgst Amount */}
                <div className="input-container">
                  <label className="input-label">Cgst Amount</label>
                  <input
                    type="number"
                    name="cgstamount"
                    className="input-field"
                    value={formData.cgstamount}
                    read only
                    step="any"
                  />
                </div>
              </div>


              {/* sgst Ledger*/}
              <div className="bajubaju">

                {/* Igst percentage*/}
                <div className="input-container">
                  <label className="input-label">Sgst Ledger</label>
                  <input
                    type="text"
                    name="sgstledger"
                    placeholder="Enter sgstledger"
                    className="input-field"
                    value={formData.sgstledger}
                    onChange={handleChange}
                    disabled={formData.igstpercent || formData.igstledger}
                  />
                </div>



                {/* Sgst percentage*/}
                <div className="input-container">
                  <label className="input-label">Sgst in %</label>
                  <input
                    type="number"
                    name="sgstpercent"
                    className="input-field"
                    value={formData.cgstpercent}
                    disabled
                  />
                </div>


                {/* Sgst Amount */}
                <div className="input-container">
                  <label className="input-label">Sgst Amount</label>
                  <input
                    type="number"
                    name="sgstamount"
                    className="input-field"
                    value={formData.sgstamount}
                    read only
                    step="any"
                  />
                </div>
              </div>



              {/* Igst Ledger*/}
              <div className="bajubaju">


                {/* Igst percentage*/}
                <div className="input-container">
                  <label className="input-label">Igst Ledger</label>
                  <input
                    type="text"
                    name="igstledger"
                    placeholder="Enter igstledger"
                    className="input-field"
                    value={formData.igstledger}
                    onChange={handleChange}
                    disabled={formData.cgstpercent || formData.sgstpercent || formData.cgstledger || formData.sgstledger}

                  />
                </div>



                {/* Igst percentage*/}
                <div className="input-container">
                  <label className="input-label">Igst in %</label>
                  <input
                    type="number"
                    name="igstpercent"
                    placeholder="Enter Igst Percent"
                    className="input-field"
                    value={formData.igstpercent}
                    onChange={handleChange}
                    disabled={formData.cgstpercent || formData.sgstpercent || formData.cgstledger || formData.sgstledger}
                  />
                </div>


                {/* Igst Amount */}
                <div className="input-container">
                  <label className="input-label">Igst Amount</label>
                  <input
                    type="number"
                    name="igstamount"
                    className="input-field"
                    value={formData.igstamount}
                    read only
                    step="any"

                  />
                </div>
              </div>


              {/* total Amount */}
              <div className="bajubaju">
                <div className="input-container">
                  <label className="input-label">Total Amount</label>
                  <input
                    type="number"
                    name="total"
                    className="input-field1"
                    value={formData.total}
                    step="any"
                  />
                </div>





                {/* Km */}
                <div className="input-container">
                  <label className="input-label">Kilometer</label>
                  <input
                    type="number"
                    name="km"
                    placeholder="Enter km"
                    className="input-field"
                    value={formData.km}
                    onChange={handleChange}
                    step="any"
                  />
                </div>
              </div>


              {/* category*/}
              <div className="bajubaju">
                <div className="input-container">
                  <label className="input-label">Category</label>
                  <select
                    name="category"
                    className="input-field"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Select Category</option>
                    {Object.keys(categoryOptions).map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>





                {/* Subcategory*/}
                <div className="input-container">
                  <label className="input-label">Subcategory</label>
                  <select
                    name="subcategory"
                    className="input-field"
                    value={formData.subcategory}
                    onChange={handleChange}
                    disabled={!formData.category}
                  >
                    <option value="">Select Subcategory</option>
                    {formData.category &&
                      categoryOptions[formData.category].map((sub, index) => (
                        <option key={index} value={sub}>
                          {sub}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Narration*/}
              <div className="bajubaju">
                <div className="input-container">
                  <label className="input-label">Narration</label>
                  <input
                    type="text"
                    name="narration"
                    placeholder="Enter Narration"
                    className="input-field"
                    value={formData.narration}
                    onChange={handleChange}

                  />
                </div>


                {/* details*/}
                <div className="input-container">
                  <label className="input-label">Details</label>
                  <input
                    type="text"
                    name="details"
                    placeholder="Enter Details"
                    className="input-field"
                    value={formData.details}
                    onChange={handleChange}

                  />
                </div>
              </div>

              {/*Work  Date */}
              <div className="bajubaju">
                <div className="input-container">
                  <label className="input-label">Work Date</label>
                  <input
                    type="date"
                    name="workdate"
                    placeholder="Enter Work date"
                    className="input-field"
                    value={formData.workdate}
                    onChange={handleChange}

                  />
                </div>

                {/* Company Name */}

                <div className="input-container">
                  <label className="input-label">Company Name</label>
                  <select
                    name="companyname"
                    className="input-field"
                    value={formData.companyname}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Company Name</option>
                    {[
                      "YLPL", "ARS"
                    ].map((item, index) => (
                      <option key={index} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Vehicle No*/}
              
               
              <div className="bajubaju">
              <div className="input-container">
                  <label className="input-label">Vehicle No</label>
                  <input
                    type="text"
                    name="vehicleno"
                  
                    placeholder="Enter vehicleno"
                    className="input-field"
                    value={formData.vehicleno}
                   onChange={handleVehicleInput}
                    autoComplete="off"
                          
                  />
                  {showVehicleDropdown && (
                    <div className="dropdown">
                      {filteredVehicleNames.map((party, index) => (
                        <div
                          key={index}
                          className="dropdown-item"
                          onClick={() => selectVehicle(party)}
                        >
                          {party}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                

                {/*Part No */}
                <div className="input-container">
                  <label className="input-label">Part No</label>
                  <input
                    type="text"
                    name="partno"
                    placeholder="Enter Part No"
                    className="input-field"
                    value={formData.partno}
                    onChange={handleChange}


                  />
                </div>
              </div>


              {/* Cess Ledger*/}
              <div className="bajubaju">
                <div className="input-container">
                  <label className="input-label">CESS Ledger</label>
                  <input
                    type="text"
                    name="cessledger"
                    placeholder="Enter Cess Ledger"
                    className="input-field"
                    value={formData.cessledger}
                    onChange={handleChange}

                  />
                </div>


                {/* Cess Amount */}
                <div className="input-container">
                  <label className="input-label">CESS Amount</label>
                  <input
                    type="number"
                    name="cessamount"
                    placeholder="Enter Cess Amount"
                    className="input-field"
                    value={formData.cessamount}
                    onChange={handleChange}
                    step="any"
                  />
                </div>
              </div>


              {/* Tally Import Status*/}
              <div className="input-container">
                <label className="input-label">Tally Import Status</label>
                <input
                  type="text"
                  name="tallyimportstatus"
                  placeholder="Enter Tally Import Status"
                  className="input-field"
                  value={formData.tallyimportstatus}
                  onChange={handleChange}
                  style={{ width: "200%", height: "20px", marginTop: "7px" }}

                />
              </div>


              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExampleForm;
