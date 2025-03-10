import "./formcss.css";
import React, { useState, useEffect } from "react";
import axios from "axios";


const ExampleForm = () => {

  const [cgstpercent, setCgstPercent] = useState("");
  const [sgstpercent, setSgstPercent] = useState("");
  const [igstpercent, setIgstPercent] = useState("");

  const [formData, setFormData] = useState({

    voucherno: "", date:"", referenceno:"", partyname:"", ledgergroup:"", registrationtype:"", gstinno:"",
  country:"", state:"", pincode:"", address1:"", address2:"", address3:"", purchaseledger:"",
  amount: "", salescostcenter:"", purchaseamount:"", additionalledge:"", ledgeamount:"",
  cgstledger:"", cgstamount:"", sgstledger:"", sgstamount:"", igstledger:"", igstamount:"",
  cessledger:"", cessamount:"", total:"", narration:"", tallyimportstatus:"", km:"",
  category:"", subcategory:"", details:""


    });
  
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);


  // useEffect(() => {
  //   const fetchNames = async () => {
  //     try {
  //       if (formData.name.length > 0) {
  //         const response = await axios.get(`http://localhost:5000/api/suggestions/names?q=${formData.name}`);
  //         setSuggestions(response.data);
  //         setShowSuggestions(true);
  //       } else {
  //         setSuggestions([]);
  //         setShowSuggestions(false);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching names:", error);
  //     }
  //   };
  //   fetchNames();
  // }, [formData.name]);


  useEffect(() => {

    const newcgstamount = (parseFloat(formData.amount) * parseFloat(cgstpercent)) / 100 || 0;
      if (!isNaN(newcgstamount)) {
        setFormData((prev) => ({ ...prev, cgstamount: newcgstamount }));
      }
    
  }, [formData.amount, cgstpercent]);


   useEffect(() => {

    const newsgstamount = (parseFloat(formData.amount) * parseFloat(sgstpercent)) / 100 || 0;
      if (!isNaN(newsgstamount)) {
        setFormData((prev) => ({ ...prev, sgstamount: newsgstamount }));
      }
    
  }, [formData.amount, sgstpercent]);

  useEffect(() => {

    formData.purchaseamount=formData.amount;
  
}, [formData.amount]);


  useEffect(() => {

    const newigstamount = (parseFloat(formData.amount) * parseFloat(igstpercent)) / 100 || 0;
    if (!isNaN(newigstamount)) {
      setFormData((prev) => ({ ...prev, igstamount: newigstamount }));
    }
  
}, [formData.amount, igstpercent]);


useEffect(() => {

  const newamount =(parseFloat(formData.amount)+parseFloat(formData.sgstamount)+parseFloat(formData.cgstamount)+parseFloat(formData.igstamount));
  if (!isNaN(newamount)) {
    setFormData((prev) => ({ ...prev, total: newamount }));
  }

}, [formData.amount, formData.sgstamount,formData.cgstamount,formData.igstamount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({ ...formData, [name]: value });

    if (name === "cgstpercent") {
      setCgstPercent(Number(value));  // Convert input to number before setting
    }
    if (name === "sgstpercent") {
      setSgstPercent(Number(value));
    }
    if (name === "igstpercent") {
      setIgstPercent(Number(value));

    }
  };

  const handleSuggestionClick = (selectedName) => {
    setFormData({ ...formData, name: selectedName });
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/students/submit", formData);
      alert(response.data.message);
      setFormData({
        voucherno: "", date:"", referenceno:"", partyname:"", ledgergroup:"", 
        registrationtype:"", gstinno:"", country:"", state:"", pincode:"",
        address1:"", address2:"", address3:"", purchaseledger:"",
        amount: "", salescostcenter:"", purchaseamount:"", additionalledge:"",
        ledgeamount:"", cgstledger:"", cgstamount:"", sgstledger:"", sgstamount:"", 
        igstledger:"", igstamount:"", cessledger:"", cessamount:"", total:"", 
        narration:"", tallyimportstatus:"", km:"", category:"", subcategory:"",
        details:""
      });
      
      
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit data!");
    }
  };

  return (
    <div className="backgroundhome">
      <div className="foregroundhome">
        <div className='scroll-container'>
        <h2 style={{ marginLeft: "40%", marginRight: "40%" }}>Add Details</h2>

       
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
              value={"Purchase"}
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

          {/* Party Name */}
           <div className="input-container">
            <label className="input-label">Party Name:</label>
            <input
              type="text"
              name="partyname"
              placeholder="Enter Party Name"
              className="input-field"
              value={formData.partyname}
              onChange={handleChange}
              required
            />
            </div>
            </div>


          {/* purchaseledger*/}
          <div className="bajubaju">
          <div className="input-container">
            <label className="input-label">Purchase Ledger</label>
            <input
              type="text"
              name="purchaseledger"
              placeholder="Enter Purchase Ledger"
              className="input-field"
              value={formData.purchaseledger}
              onChange={handleChange}
              required
      
            />
          </div>

          {/* Sales cost center */}
          <div className="input-container">
              <label className="input-label">Sales cost center</label>
              <input
                type="text"
                name="salescostcenter"
                placeholder="Enter Sales cost center"
                className="input-field"
                value={formData.salescostcenter}
                onChange={handleChange}

              />
            </div>
            </div>


            
            <div className="bajubaju">
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
            

           {/* Purchase cost center */}
           <div className="input-container">
              <label className="input-label">Purchase cost center</label>
              <input
                type="number"
                name="purchaseamount"
                className="input-field"
                value={formData.purchaseamount}
                read only
                 step="any"
              />
            </div>
            </div>
            
        
            {/* Cgst Ledger*/}
            <div className="bajubaju">
          <div className="input-container">
            <label className="input-label">Cgst Ledger</label>
            <input
              type="text"
              name="cgstledger"
              placeholder="Enter Cgst Ledger"
              className="input-field"
              value={formData.cgstledger}
              onChange={handleChange}
      
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
              value={cgstpercent}
              onChange={handleChange}
      
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
          <div className="input-container">
            <label className="input-label">Sgst Ledger</label>
            <input
              type="text"
              name="sgstledger"
              placeholder="Enter Sgst Ledger"
              className="input-field"
              value={formData.sgstledger}
              onChange={handleChange}
      
            />
          </div>


          {/* Sgst percentage*/}
          <div className="input-container">
            <label className="input-label">Sgst in %</label>
            <input
              type="number"
              name="sgstpercent"
              placeholder="Enter Sgst Percent"
              className="input-field"
              value={sgstpercent}
              onChange={handleChange}
      
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
          <div className="input-container">
            <label className="input-label">Igst Ledger</label>
            <input
              type="text"
              name="igstledger"
              placeholder="Enter Igst Ledger"
              className="input-field"
              value={formData.igstledger}
              onChange={handleChange}
      
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
              value={igstpercent}
              onChange={handleChange}
      
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
                className="input-field1"
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
            <input
              type="text"
              name="category"
              placeholder="Enter Category"
              className="input-field1"
              value={formData.category}
              onChange={handleChange}
      
            />
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
      
            />
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

           {/* Ledger Group */}
           <div className="bajubaju">
           <div className="input-container">
            <label className="input-label">Ledger Group</label>
            <input
              type="text"
              name="ledgergroup"
              placeholder="Enter Ledger Group"
              className="input-field2"
              value={formData.ledgergroup}
              onChange={handleChange}
              
      
            />
          </div>


          {/* Registration Type*/}
          <div className="input-container">
            <label className="input-label">Registration  </label>
            <input
              type="text"
              name="registrationtype"
              placeholder="Enter Registration Type"
              className="input-field2"
              value={formData.registrationtype}
              onChange={handleChange}
      
            />
          </div>

          {/* GSTIN No*/}
          <div className="input-container">
            <label className="input-label">GSTIN No</label>
            <input
              type="text"
              name="gstinno"
              placeholder="Enter GSTIN No"
              className="input-field2"
              value={formData.gstinno}
              onChange={handleChange}
      
            />
          </div>
          </div>

          
          {/* address1*/}
          
          <div className="input-container">
  <label className="input-label">Address 1</label>
  <input
    type="text"
    name="address1"
    placeholder="Enter Address 1"
    className="input-field"
    value={formData.address1}
    onChange={handleChange}
    style={{ width: "250%", height: "20px", marginTop: "7px" }}
    
  />
  
</div>



          {/* address2*/}
          <div className="bajubaju">
          <div className="input-container">
            <label className="input-label">Address 2</label>
            <input
              type="text"
              name="address2"
              placeholder="Enter Address 2"
              className="input-field1"
              value={formData.address2}
              onChange={handleChange}
      
            />
          </div>


          {/* address3*/}
          <div className="input-container">
            <label className="input-label">Address 3</label>
            <input
              type="text"
              name="address3"
              placeholder="Enter Address 3"
              className="input-field1"
              value={formData.address3}
              onChange={handleChange}
      
            />
          </div>
          </div>

          {/* Country*/}
          <div className="bajubaju">
          <div className="input-container">
            <label className="input-label">Country</label>
            <input
              type="text"
              name="country"
              placeholder="Enter Country"
              className="input-field"
              value={formData.country}
              onChange={handleChange}
      
            />
          </div>

          {/* State*/}
          <div className="input-container">
            <label className="input-label">State</label>
            <input
              type="text"
              name="state"
              placeholder="Enter State"
              className="input-field"
              value={formData.state}
              onChange={handleChange}
      
            />
          </div>


          {/* Pincode*/}
          <div className="input-container">
            <label className="input-label">Pincode</label>
            <input
              type="number"
              name="pincode"
              placeholder="Enter Pincode"
              className="input-field"
              value={formData.pincode}
              onChange={handleChange}
      
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
              onChange={handleChange}
      
            />
          </div>


           {/* Ledge Amount */}
           <div className="input-container">
              <label className="input-label">Ledge Amount</label>
              <input
                type="number"
                name="ledgeamount"
                placeholder="Enter Ledge Amount"
                className="input-field"
                value={formData.ledgeamount}
                onChange={handleChange}
                step="any" // Allows decimal values
                
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
  );
};

export default ExampleForm;
