import "./formcss.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/navbar";
import CategorySubcategoryDropdown from "../dropdown";



const ExampleForm = () => {


  const [formData, setFormData] = useState({

    voucherno: "", date: "", drledgername: "", dramount: "", referenceno: "", referenceamount: "", drcostcenter: "", drcostcenteramount: "", crledgername: "",
    cramount: "", crcostcenter: "", crcostcenteramount: "", narration: "", tallyimportstatus: "", companyname: "", workdate: "", vehicleno: "", km: "",
    category: "", subcategory: "", partno: "", details: ""


  });


  const categoryOptions = {
    ACCESSORIES: ["Cover", "Horn", "Lights", "Wipers"],
    BATTERY: ["Battery A", "Battery B", "Battery C", "Battery D"],
    BEARING: ["Front Bearing", "Rear Bearing", "Wheel Bearing", "Engine Bearing"],
    BRAKE: ["Brake Pads", "Brake Fluid", "Brake Disc", "Brake Drum"],
    CLUTCH: ["Clutch Plate", "Clutch Cable", "Clutch Spring", "Clutch Cover"],
    CROWN: ["Crown Gear", "Crown Shaft", "Crown Nut", "Crown Cover"],
    ELECTRIC: ["Wiring", "Switches", "Lights", "Sensors"],
    ENGINE: ["Engine Oil", "Engine Filter", "Engine Valve", "Engine Pump"],
    "FUEL PUMP": ["Fuel Injector", "Fuel Pipe", "Fuel Valve", "Fuel Filter"],
    "GEAR BOX": ["Gear Lever", "Gear Shaft", "Gear Oil", "Gear Knob"],
    GREASING: ["Grease Gun", "Grease Pump", "Grease Hose", "Grease Nozzle"],
    HYDRAULIC: ["Hydraulic Oil", "Hydraulic Pump", "Hydraulic Cylinder", "Hydraulic Valve"],
    INSURANCE: ["Third Party", "Comprehensive", "Own Damage", "Theft"],
    PAINT: ["Primer", "Top Coat", "Base Coat", "Clear Coat"],
    PAPERS: ["RC Book", "Permit", "Insurance", "Pollution Certificate"],
    RADIATOR: ["Radiator Cap", "Radiator Fan", "Radiator Hose", "Radiator Coolant"],
    SUSPENSION: ["Shock Absorber", "Suspension Bush", "Suspension Arm", "Coil Spring"],
    TYRE: ["Front Tyre", "Rear Tyre", "Spare Tyre", "Tyre Tube"],
    UREA: ["Urea Pump", "Urea Injector", "Urea Filter", "Urea Sensor"],
    WELDING: ["Welding Rod", "Welding Torch", "Welding Helmet", "Welding Wire"],
  };

  const [namesuggestions, namesetSuggestions] = useState([]);
  const [nameshowSuggestions, namesetShowSuggestions] = useState(false);
  const [crsuggestions, crsetSuggestions] = useState([]);
  const [crshowSuggestions, crsetShowSuggestions] = useState(false);
  const [costsuggestions, costsetSuggestions] = useState([]);
  const [costshowSuggestions, costsetShowSuggestions] = useState(false);
  const [subsuggestions, subsetSuggestions] = useState([]);
  const [subshowSuggestions, subsetShowSuggestions] = useState(false);
  const [categorymData, setcategoryData] = useState({ category: "", subcategory: "" });


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

        voucherno: "", date: "", drledgername: "", dramount: "", referenceno: "", referenceamount: "", drcostcenter: "", drcostcenteramount: "", crledgername: "",
        cramount: "", crcostcenter: "", crcostcenteramount: "", narration: "", tallyimportstatus: "", companyname: "", workdate: "", vehicleno: "", km: "",
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
                    className="input-field1"
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
                    required

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
                    placeholder="Enter Vehicle No"
                    className="input-field"
                    value={formData.vehicleno}
                    onChange={handleChange}
                    required

                  />
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
                    required

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
