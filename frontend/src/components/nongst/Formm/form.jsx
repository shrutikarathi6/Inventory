import "./formcss.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/navbar";


const ExampleForm = () => {


  const [formData, setFormData] = useState({

    voucherno: "", date: "", drledgername: "", dramount: "", referenceno: "", referenceamount: "", drcostcenter: "", drcostcenteramount: "", crledgername: "",
    cramount: "", crcostcenter: "", crcostcenteramount: "", narration: "", tallyimportstatus: "", km: "",
    category: "", subcategory: "", details: ""


  });

  const [namesuggestions, namesetSuggestions] = useState([]);
  const [nameshowSuggestions, namesetShowSuggestions] = useState(false);
  const [crsuggestions, crsetSuggestions] = useState([]);
  const [crshowSuggestions, crsetShowSuggestions] = useState(false);
  const [costsuggestions, costsetSuggestions] = useState([]);
  const [costshowSuggestions, costsetShowSuggestions] = useState(false);
  const [subsuggestions, subsetSuggestions] = useState([]);
  const [subshowSuggestions, subsetShowSuggestions] = useState(false);


  useEffect(() => {
    const fetchNames = async () => {
      try {
        if (formData.drledgername.length > 0) {
          const response = await axios.get(`http://localhost:5000/nongst/suggestions/drledgername?q=${formData.drledgername}`);
          namesetSuggestions(response.data);
          namesetShowSuggestions(true);
        } else {
          namesetSuggestions([]);
          namesetShowSuggestions(false);
        }
      } catch (error) {
        console.error("Error fetching names:", error);
      }
    };
    fetchNames();
  }, [formData.drledgername]);

  useEffect(() => {
    const fetchNames = async () => {
      try {
        if (formData.crledgername.length > 0) {
          const response = await axios.get(`http://localhost:5000/nongst/suggestions/crledgername?q=${formData.crledgername}`);
          crsetSuggestions(response.data);
          crsetShowSuggestions(true);
        } else {
          crsetSuggestions([]);
          crsetShowSuggestions(false);
        }
      } catch (error) {
        console.error("Error fetching names:", error);
      }
    };
    fetchNames();
  }, [formData.crledgername]);

  useEffect(() => {
    const fetchNames = async () => {
      try {
        if (formData.crcostcenter.length > 0) {
          const response = await axios.get(`http://localhost:5000/nongst/suggestions/crcostcenter?q=${formData.crcostcenter}`);
          costsetSuggestions(response.data);
          costsetShowSuggestions(true);
        } else {
          costsetSuggestions([]);
          costsetShowSuggestions(false);
        }
      } catch (error) {
        console.error("Error fetching names:", error);
      }
    };
    fetchNames();
  }, [formData.crcostcenter]);

  useEffect(() => {
    const fetchNames = async () => {
      try {
        if (formData.subcategory.length > 0) {
          const response = await axios.get(`http://localhost:5000/gst/suggestions/subcategory?q=${formData.subcategory}`);
          subsetSuggestions(response.data);
          subsetShowSuggestions(true);
        } else {
          subsetSuggestions([]);
          subsetShowSuggestions(false);
        }
      } catch (error) {
        console.error("Error fetching names:", error);
      }
    };
    fetchNames();
  }, [formData.subcategory]);



  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });


  };

  const handleSuggestionClickName = (selectedName) => {
    setFormData({ ...formData, drledgername: selectedName });
    namesetSuggestions([]);
    namesetShowSuggestions(false);
  };

  const handleSuggestionClickNameCr = (selectedName) => {
    setFormData({ ...formData, crledgername: selectedName });
    crsetSuggestions([]);
    crsetShowSuggestions(false);
  };

  const handleSuggestionClickNameCost = (selectedName) => {
    setFormData({ ...formData, crcostcenter: selectedName });
    costsetSuggestions([]);
    costsetShowSuggestions(false);
  };

  const handleSuggestionClickSub = (selectedName) => {
    setFormData({ ...formData, subcategory: selectedName });
    subsetSuggestions([]);
    subsetShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/nongst/students/submit", formData);
      alert(response.data.message);
      setFormData({
        voucherno: "", date: "", referenceno: "", partyname: "", ledgergroup: "",
        registrationtype: "", gstinno: "", country: "", state: "", pincode: "",
        address1: "", address2: "", address3: "", purchaseledger: "",
        amount: "", salescostcenter: "", purchaseamount: "", additionalledge: "",
        ledgeamount: "", cgstledger: "", cgstamount: "", sgstledger: "", sgstamount: "",
        igstledger: "", igstamount: "", cessledger: "", cessamount: "", total: "",
        narration: "", tallyimportstatus: "", km: "", category: "", subcategory: "",
        details: ""
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
                    type="number"
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
                    required

                  />
                </div>
              </div>


              <div className="bajubaju">

                {/* <div className="input-container">
          <div className="input-container" style={{ position: "relative" }}>
>>>>>>> b662c2c78c76adf2f9ea01ded599c74d71a1c8cc
            <label className="input-label">Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              className="input-field"
              value={formData.name}
              onChange={handleChange}
              required
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="suggestions-dropdown">
                {suggestions.map((s, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(s)}>
                    {s}
                  </li>
                ))}
              </ul>
            )
          </div> */}

                {/* Ledger Name */}
                <div className="input-container">
                  <label className="input-label">Dr Ledger Name:</label>
                  <input
                    type="text"
                    name="drledgername"
                    placeholder="Enter Dr Ledger Name"
                    className="input-field"
                    value={formData.drledgername}
                    onChange={handleChange}
                    required
                    onFocus={() => namesetShowSuggestions(true)}
                    onBlur={() => setTimeout(() => namesetShowSuggestions(false), 200)}
                  />
                  {nameshowSuggestions && namesuggestions.length > 0 && (
                    <ul className="suggestions-dropdown">
                      {namesuggestions.map((s, index) => (
                        <li key={index} onClick={() => handleSuggestionClickName(s)}>
                          {s}
                        </li>
                      ))}
                    </ul>
                  )}
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
                    required

                  />
                </div>


              </div>


              <div className="bajubaju">
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
                    required
                  />
                </div>

                <div className="input-container">
                  <label className="input-label">Reference Amount</label>
                  <input
                    type="number"
                    name="referenceamount"
                    placeholder="Enter Reference Amount"
                    className="input-field"
                    value={formData.referenceamount}
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
                    className="input-field1"
                    value={formData.crledgername}
                    onChange={handleChange}
                    onFocus={() => crsetShowSuggestions(true)}
                    onBlur={() => setTimeout(() => crsetShowSuggestions(false), 200)}

                  />
                  {crshowSuggestions && crsuggestions.length > 0 && (
                    <ul className="suggestions-dropdown">
                      {crsuggestions.map((s, index) => (
                        <li key={index} onClick={() => handleSuggestionClickNameCr(s)}>
                          {s}
                        </li>
                      ))}
                    </ul>
                  )}

                </div>

                {/* Cr Amount*/}
                <div className="input-container">
                  <label className="input-label">Cr Amount</label>
                  <input
                    type="number"
                    name="cramount"
                    placeholder="Enter Cr Amount"
                    className="input-field1"
                    value={formData.cramount}
                    onChange={handleChange}

                  />
                </div>
              </div>

              {/* Cr Cost center*/}
              <div className="bajubaju">
                <div className="input-container">
                  <label className="input-label">Cr Cost Center</label>
                  <input
                    type="text"
                    name="crcostcenter"
                    placeholder="Enter Cr Cost Center"
                    className="input-field1"
                    value={formData.crcostcenter}
                    onChange={handleChange}
                    onFocus={() => costsetShowSuggestions(true)}
                    onBlur={() => setTimeout(() => costsetShowSuggestions(false), 200)}

                  />
                  {costshowSuggestions && costsuggestions.length > 0 && (
                    <ul className="suggestions-dropdown">
                      {costsuggestions.map((s, index) => (
                        <li key={index} onClick={() => handleSuggestionClickNameCost(s)}>
                          {s}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* CrCost Center Amount*/}
                <div className="input-container">
                  <label className="input-label">Cr Cost Center Amount</label>
                  <input
                    type="number"
                    name="crcostcenteramount"
                    placeholder="Enter Cr Cost Center Amount"
                    className="input-field1"
                    value={formData.crcostcenteramount}
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
                    className="input-field1"
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
                    {[
                      "ACCESSORIES", "BATTERY", "BEARING", "BRAKE", "CLUTCH", "CROWN", "ELECTRIC", "ENGINE",
                      "FUEL PUMP", "GEAR BOX", "GREASING", "HYDRAULIC", "INSURANCE", "PAINT", "PAPERS",
                      "RADIATOR", "SUSPENSION", "TYRE", "UREA", "WELDING"
                    ].map((item, index) => (
                      <option key={index} value={item}>{item}</option>
                    ))}
                  </select>
                </div>



                {/* Subcategory*/}
                <div className="input-container">
                  <label className="input-label">Subcategory</label>
                  <input
                    type="text"
                    name="subcategory"
                    placeholder="Enter Subcategory"
                    className="input-field1"
                    value={formData.subcategory}
                    onChange={handleChange}
                    onFocus={() => subsetShowSuggestions(true)}
                    onBlur={() => setTimeout(() => subsetShowSuggestions(false), 200)}

                  />
                  {subshowSuggestions && subsuggestions.length > 0 && (
                    <ul className="suggestions-dropdown">
                      {subsuggestions.map((s, index) => (
                        <li key={index} onClick={() => handleSuggestionClickSub(s)}>
                          {s}
                        </li>
                      ))}
                    </ul>
                  )}
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
                    className="input-field1"
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
                    className="input-field1"
                    value={formData.details}
                    onChange={handleChange}

                  />
                </div>
              </div>

              {/* Dr Cost center*/}
              <div className="bajubaju">
                <div className="input-container">
                  <label className="input-label">Dr Cost Center</label>
                  <input
                    type="text"
                    name="drcostcenter"
                    placeholder="Enter Dr Cost Center"
                    className="input-field1"
                    value={formData.drcostcenter}
                    onChange={handleChange}

                  />
                </div>
                {/* Dr Cost center Amount*/}
                <div className="input-container">
                  <label className="input-label">Dr Cost Center Amount</label>
                  <input
                    type="text"
                    name="drcostcenteramount"
                    placeholder="Enter Dr Cost Center Amount"
                    className="input-field1"
                    value={formData.drcostcenteramount}
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








              {/* <div className="input-container">
          <div className="input-container" style={{ position: "relative" }}>
>>>>>>> b662c2c78c76adf2f9ea01ded599c74d71a1c8cc
            <label className="input-label">Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              className="input-field"
              value={formData.name}
              onChange={handleChange}
              required
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="suggestions-dropdown">
                {suggestions.map((s, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(s)}>
                    {s}
                  </li>
                ))}
              </ul>
            )
          </div> */}




              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExampleForm;
