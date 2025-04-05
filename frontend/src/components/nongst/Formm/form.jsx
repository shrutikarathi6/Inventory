import "./formcss.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/navbar";
import categoryOptions from "../../../../data/categorysub";
import useAutocomplete from "../../../hooks/useAutocomplete"; // Import the custom hook
import PartyNames from "../../../../data/party_name.jsx";
import drledgername from "../../../../data/drledgername.jsx";
import VehicleNos from "../../../../data/vehicleno.jsx";

const ExampleForm = () => {

  const [formData, setFormData] = useState({

    voucherno: "", date: "", drledgername: "", dramount: "", referenceno: "", crledgername: "",
    cramount: "",  narration: "", tallyimportstatus: "", companyname: "", workdate: "", vehicleno: "", km: "",
    category: "", subcategory: "", partno: "", details: ""


  });

    const { filteredOptions: filteredPartyNames, showDropdown: showPartyDropdown, handleInputChange: handlePartyInput, handleSelect: selectParty } =
      useAutocomplete(PartyNames, formData, setFormData, "crledgername");

      const { filteredOptions: filteredDrLedgerNames, showDropdown: showDrLedgerDropdown, handleInputChange: handleDrLedgerInput, handleSelect: selectDrLedger } =
      useAutocomplete(drledgername, formData, setFormData, "drledgername");

      const { filteredOptions: filteredVehicleNames, showDropdown: showVehicleDropdown, handleInputChange: handleVehicleInput, handleSelect: selectVehicle } =
      useAutocomplete(VehicleNos, formData, setFormData, "vehicleno");


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      setFormData({
        ...formData,
        category: value,
        subcategory: "",
      });
    } else {

      setFormData({ ...formData, [name]: value });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/nongst/students/submit", formData);
      alert(response.data.message);
      setFormData({

        voucherno: "", date: "", drledgername: "", dramount: "", referenceno: "", crledgername: "",
    cramount: "",  narration: "", tallyimportstatus: "", companyname: "", workdate: "", vehicleno: "", km: "",
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
            <h2 style={{ marginLeft: "40%", marginRight: "30%" }}>Add Details For NonGST</h2>


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

                {/* voucher type */}
                <div className="input-container">
                  <label className="input-label">Vch Type:</label>
                  <input
                    type="text"
                    className="input-field"
                    value={"Journal"}
                    readOnly
                  />
                </div>


               
              </div>


              <div className="bajubaju">

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

              
                

                {/* Reference No */}
                <div className="input-container">
                  <label className="input-label">Reference No</label>
                  <input
                    type="text"
                    name="referenceno"
                    placeholder="Enter Reference No"
                    className="input-field"
                    value={formData.referenceno}
                    onChange={handleChange}
                    

                  />
                </div>


              </div>


              <div className="bajubaju">
              <div className="input-container">
                  <label className="input-label">Dr Ledger Name:</label>
                  <input
                    type="text"
                    name="drledgername"
                    placeholder="Enter Dr Ledger Name"
                    className="input-field"
                    value={formData.drledgername}
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
                {/* Dr Amount */}
                <div className="input-container">
                  <label className="input-label">Dr Amount</label>
                  <input
                    type="number"
                    name="dramount"
                    placeholder="Enter Amount"
                    className="input-field"
                    value={formData.dramount}
                    onChange={handleChange}
                    step="any" // Allows decimal values
                  
                  />
                </div>

                
              </div>

              {/* Cr Ledger Name*/}
              <div className="bajubaju">
                <div className="input-container">
                  <label className="input-label">Cr Ledger Name</label>
                  <input
                    type="text"
                    name="crledgername"
                    placeholder="Enter Cr Ledger Name"
                    className="input-field"
                    value={formData.crledgername}
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

                {/* Cr Amount*/}
                <div className="input-container">
                  <label className="input-label">Cr Amount</label>
                  <input
                    type="number"
                    name="cramount"
                    placeholder="Enter Cr Amount"
                    className="input-field"
                    value={formData.cramount}
                    onChange={handleChange}

                  />
                </div>
              </div>

              {/* Km */}
              <div className="bajubaju">
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



                {/* category*/}

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
