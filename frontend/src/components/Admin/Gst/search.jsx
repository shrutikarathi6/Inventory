import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./search.css";
import categoryOptions from "../../../../categorysub";

import { useNavigate } from "react-router-dom";
import { FaPlus, FaTimes, FaEdit, FaTrash, FaEye, FaSave } from "react-icons/fa";


const GstAdminsearch = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState([]);
    const [results, setResults] = useState([]);
    const [searchkiya, setSearchkiya] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editedData, setEditedData] = useState(null);
    const inputRefs = useRef([]);


    useEffect(() => {
        if (inputRefs.current.length > 0) {
            inputRefs.current[filters.length - 1]?.focus();
        }
    }, [filters]);

    // Add new filter field
    const handleAddFilter = () => {
        setFilters(prevFilters => [...prevFilters, { type: "", value: "" }]);
    };

    // Handle filter selection & value change
    const handleFilterChange = (index, key, value) => {
        const newFilters = [...filters];
        newFilters[index][key] = value;
        setFilters(newFilters);
    };

    // Remove selected filter
    const handleRemoveFilter = (index) => {
        setFilters(filters.filter((_, i) => i !== index));
    };

    // Perform search query
    const handleSearch = async () => {
        try {
            setSearchkiya(true); // Set search state

            const groupedFilters = filters.reduce((acc, filter) => {
                if (["amount", "km", "total"].includes(filter.type)) {
                    // Handle numerical ranges
                    if (filter.valueFrom) acc[`${filter.type}From`] = filter.valueFrom;
                    if (filter.valueTo) acc[`${filter.type}To`] = filter.valueTo;
                } else if (filter.type === "date") {
                    normaldatefrom = new Date(filter.valueFrom).toISOString();
                    normaldateto = new Date(filter.valueTo).toISOString();
                    if (filter.valueFrom) acc["dateFrom"] = normaldatefrom.split("T")[0];
                    if (filter.valueTo) acc["dateTo"] = normaldateto.split("T")[0];
                } else {
                    // Handle text-based filters
                    if (!acc[filter.type]) acc[filter.type] = [];
                    acc[filter.type].push(filter.value);
                }
                return acc;
            }, {});

            const queryParams = new URLSearchParams(groupedFilters).toString();
            const response = await axios.get(`http://localhost:5000/gst/students/search?${queryParams}`);
            setResults(response.data.results);
        } catch (error) {
            console.error("Error searching data:", error);
        }
    };

    // Delete student
    const handleDelete = async (uniqueid) => {
        if (!window.confirm("Are you sure you want to delete this entry?")) return;
        try {
            await axios.delete(`http://localhost:5000/gst/students/delete/${uniqueid}`);
            alert("Entry deleted successfully!");
            setResults(results.filter(student => student.uniqueid !== uniqueid));
        } catch (error) {
            console.error("Error deleting Entry:", error);
            alert("Failed to delete Entry.");
        }
    };

    // Edit student
    const handleEdit = (student) => {
        setEditingId(student.uniqueid);
        setEditedData({ ...student }); // Ensure editedData is initialized
    };

    const handleEditChange = (e, field) => {
        const value = e.target.value;
    
        setEditedData(prev => {
            const updatedData = { ...prev, [field]: value };
    
            // Ensure numerical values are properly handled
            const amount = parseFloat(updatedData.amount) || 0;
            const cgstPercent = parseFloat(updatedData.cgstpercent) || 0;
            const igstPercent = parseFloat(updatedData.igstpercent) || 0;

            // If date is changed, update suppinvdate
        if (field === "date") {
            updatedData.suppinvdate = value; 
        }

        // If voucherno is changed, update referenceno
        if (field === "voucherno") {
            updatedData.referenceno = value; 
        }
    
            if (field === "cgstpercent") {
                updatedData.sgstpercent = cgstPercent; // SGST Percent mirrors CGST
                updatedData.cgstamount = (amount * cgstPercent) / 100;
                updatedData.sgstamount = updatedData.cgstamount; // SGST Amount mirrors CGST
            }
    
            if (field === "igstpercent") {
                updatedData.igstamount = (amount * igstPercent) / 100;
            }
    
            if (field === "amount" || field === "cgstpercent" || field === "igstpercent") {
                updatedData.total = amount + (2 * (updatedData.cgstamount || 0)) + (updatedData.igstamount || 0);
            }

           
    
            return updatedData;
        });
    };
    

    // Save updated data
    const handleSave = async () => {
        if (!editedData) return; // Prevent errors
        try {
            await axios.put(`http://localhost:5000/gst/students/update/${editedData.uniqueid}`, editedData);
            setResults(prevResults => prevResults.map(student =>
                student.uniqueid === editedData.uniqueid ? { ...editedData } : student
            ));
            setEditingId(null);
        } catch (error) {
            console.error("Error updating entry:", error);
            alert("Failed to update entry.");
        }
    };

    return (
        <div>

            <div className="backgroundsearch">
                <div className="foregroundsearch">
                    <h2>Admin Search Entry For GST</h2>

                    <button className="add-filter-btn" onClick={handleAddFilter}>
                        <FaPlus /> Add Filter
                    </button>

                    {/* Filters */}
                    {filters.map((filter, index) => (
                        <div key={index} className="filter-row">
                            <select
                                value={filter.type}
                                onChange={(e) => handleFilterChange(index, "type", e.target.value)}
                            >
                                <option value="">Select Filter</option>
                                <option value="uniqueid">Unique Id</option>
                                <option value="date">Date</option>
                                <option value="referenceno">Supp Inv No</option>
                                <option value="partyname">Party Name</option>
                                <option value="category">Category</option>
                                <option value="subcategory">SubCategory</option>
                                <option value="companyname">Company Name</option>
                                <option value="vehicleno">Vehicle No</option>
                                <option value="partno">Part No</option>
                                <option value="amount">Amount</option>
                                <option value="km">Kilometers</option>
                                <option value="total">Total</option>
                            </select>

                            {/* Date Range Input */}
                            {filter.type === "date" ? (
                                <div className="range-inputs">
                                    <input
                                        type="date"
                                        placeholder="From"
                                        value={filter.valueFrom || ""}
                                        onChange={(e) => handleFilterChange(index, "valueFrom", e.target.value)}
                                    />
                                    <input
                                        type="date"
                                        placeholder="To"
                                        value={filter.valueTo || ""}
                                        onChange={(e) => handleFilterChange(index, "valueTo", e.target.value)}
                                    />
                                </div>
                            ) :
                                /* Range Input for Numeric Fields */
                                ["amount", "km", "total"].includes(filter.type) ? (
                                    <div className="range-inputs">
                                        <input
                                            type="text"
                                            placeholder="From"
                                            value={filter.valueFrom || ""}
                                            onChange={(e) => handleFilterChange(index, "valueFrom", e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            placeholder="To"
                                            value={filter.valueTo || ""}
                                            onChange={(e) => handleFilterChange(index, "valueTo", e.target.value)}
                                        />
                                    </div>
                                ) : (
                                    <input
                                        type="text"
                                        placeholder="Enter value"
                                        value={filter.value || ""}
                                        onChange={(e) => handleFilterChange(index, "value", e.target.value)}
                                    />
                                )}

                            <button className="remove-filter-btn" onClick={() => handleRemoveFilter(index)}>
                                <FaTimes />
                            </button>
                        </div>
                    ))}

                    <button className="search-btn" onClick={handleSearch}>Search</button>

                    {/* Results Table */}
                    <div className="table-container">
                        {results.length > 0 ? (
                            <table border="1">
                                <thead>
                                    <tr>
                                        <th>Actions</th>
                                        <th>Uniqueid</th>
                                        <th>Company Name</th>
                                        <th>Voucher No</th>
                                        <th>Voucher Type</th>
                                        <th>Date</th>
                                        <th>Supp Inv No</th>
                                        <th>Supp Inv Date</th>
                                        <th>Party Name</th>
                                        <th>Additional Ledge</th>
                                        <th>Amount</th>
    
                                        <th>CGST Legder</th>
                                        <th>CGST Percent</th>
                                        <th>CGST Amount</th>
                                        <th>SGST Ledger</th>
                                        <th>SGST Percent</th>
                                        <th>SGST Amount</th>
                                        <th>IGST Ledger</th>
                                        <th>IGST Percent</th>
                                        <th>IGST Amount</th>
                                        <th>Total Amount</th>

                                        <th>Kilometer</th>
                                        <th>Category</th>
                                        <th>Subcategory</th>
                                        <th>Narration</th>
                                        <th>Details</th>
                                        <th>Work Date</th>

                                        <th>Vehicle No</th>
                                        <th>Part No</th>
                                        
                                   
                                        <th>CESS Ledger</th>
                                        <th>CESS Amount</th>
                                        <th>Tally Import Status</th>


                                    </tr>
                                </thead>
                                <tbody>

                                    {results.map((student) => (
                                        <tr key={student.uniqueid}>
                                            <td>
                                                {editingId === student.uniqueid ? (
                                                    <button onClick={handleSave} className="save-btn"><FaSave /></button>
                                                ) : (
                                                    <>
                                                        <button onClick={() => handleEdit(student)} className="edit-btn"><FaEdit /></button>
                                                        <button onClick={() => handleDelete(student.uniqueid)} className="delete-btn"><FaTrash /></button>
                                                    </>
                                                )}
                                            </td>

                                            <td>{student.uniqueid}</td>
                                            <td>{student.companyname}</td>

                                            <td>
                                                {editingId === student.uniqueid ? (
                                                    <input
                                                        type="text"
                                                        value={editedData?.voucherno || ""}
                                                        onChange={(e) => handleEditChange(e, "voucherno")}
                                                    />
                                                ) : student.voucherno}
                                            </td>
                                            <td>
                                                Purchase
                                            </td>

                                            <td>
                                                {editingId === student.uniqueid ? (
                                                    <input
                                                        type="date"
                                                        value={editedData?.date || ""}
                                                        onChange={(e) => handleEditChange(e, "date")}
                                                    />
                                                ) : student.date}
                                            </td>

                                            


                                            <td>
                                                {editingId === student.uniqueid ? (
                                                    <input
                                                        type="text"
                                                        value={editedData?.referenceno || ""}
                                                        readOnly
                                                    />
                                                ) : student.referenceno}
                                            </td>
                                            

                                            <td>
                                                {editingId === student.uniqueid ? (
                                                    <input
                                                        type="date"
                                                        value={editedData?.suppinvdate || ""}
                                                        readOnly
                                                    
                                                    />
                                                ) : student.suppinvdate}
                                            </td>

                                          
                                           

                                            <td>
                                                {editingId === student.uniqueid ? (
                                                    <input
                                                        type="text"
                                                        value={editedData?.partyname || ""}
                                                        onChange={(e) => handleEditChange(e, "partyname")}
                                                    />
                                                ) : student.partyname}
                                            </td>

                                            <td>
                                                {editingId === student.uniqueid ? (
                                                    <input
                                                        type="text"
                                                        value={editedData?.additionalledge || ""}
                                                        onChange={(e) => handleEditChange(e, "additionalledge")}
                                                    />
                                                ) : student.additionalledge}
                                            </td>


                                            <td>
                                                {editingId === student.uniqueid ? (
                                                    <input
                                                        type="number"
                                                        value={editedData?.amount || ""}
                                                        onChange={(e) => handleEditChange(e, "amount")}
                                                    />
                                                ) : student.amount}
                                            </td>

                                            

                                            <td>
                                                {editingId === student.uniqueid ? (
                                                    <input
                                                        type="text"
                                                        value={editedData?.cgstledger || ""}
                                                        onChange={(e) => handleEditChange(e, "cgstledger")}
                                                    />
                                                ) : student.cgstledger}
                                            </td>
                                            <td>
                                                {editingId === student.uniqueid ? (
                                                    <input
                                                        type="number"
                                                        value={editedData?.cgstpercent || ""}
                                                        onChange={(e) => handleEditChange(e, "cgstpercent")}
                                                    />
                                                ) : student.cgstpercent}
                                            </td>

                                            <td>
                                                {editingId === student.uniqueid ? (
                                                    <input
                                                        type="number"
                                                        value={editedData?.cgstamount || ""}
                                                        readOnly
                                                    />
                                                ) : student.cgstamount}
                                            </td>

                                            {/* <td>{student.cgstamount}</td> */}

                                            <td>
                                                {editingId === student.uniqueid ? (
                                                    <input
                                                        type="text"
                                                        value={editedData?.sgstledger || ""}
                                                        onChange={(e) => handleEditChange(e, "sgstledger")}
                                                    />
                                                ) : student.sgstledger}
                                            </td>

                                            <td>
                                                {editingId === student.uniqueid ? (
                                                    <input
                                                        type="number"
                                                        value={editedData?.sgstpercent || ""}
                                                        onChange={(e) => handleEditChange(e, "sgstpercent")}
                                                    />
                                                ) : student.sgstpercent}
                                            </td>

                                            <td>
                                                {editingId === student.uniqueid ? (
                                                    <input
                                                        type="number"
                                                        value={editedData?.sgstamount || ""}
                                                        readOnly
                                                        
                                    
                                                    />
                                                ) : student.sgstamount}
                                            </td>

                                            <td>
                                                {editingId === student.uniqueid ? (
                                                    <input
                                                        type="text"
                                                        value={editedData?.igstledger || ""}
                                                        onChange={(e) => handleEditChange(e, "igstledger")}
                                                    />
                                                ) : student.igstledger}
                                            </td>

                                            <td>
                                                {editingId === student.uniqueid ? (
                                                    <input
                                                        type="number"
                                                        value={editedData?.igstpercent || ""}
                                                        onChange={(e) => handleEditChange(e, "igstpercent")}
                                                    />
                                                ) : student.igstpercent}
                                            </td>

                                            <td>
                                                {editingId === student.uniqueid ? (
                                                    <input
                                                        type="number"
                                                        value={editedData?.igstamount || ""}
                                                        readOnly
                                    
                                                    />
                                                ) : student.igstamount}
                                            </td>
                                            <td>
                                                {editingId === student.uniqueid ? (
                                                    <input
                                                        type="number"
                                                        value={editedData?.total || ""}
                                                        readOnly
                                    
                                                    />
                                                ) : student.total}
                                            </td>

                                            <td>
                                                {editingId === student.uniqueid ? (
                                                    <input
                                                        type="number"
                                                        value={editedData?.km || ""}
                                                        onChange={(e) => handleEditChange(e, "km")}
                                                    />
                                                ) : student.km}
                                            </td>
                                            
                                            <td>
                                            {editingId === student.uniqueid ? (
                                        <select onChange={(e) => handleEditChange(e, "category")} value={editedData?.category || ""}>
                                            {Object.keys(categoryOptions).map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                          ) : student.category}
                                    </td>
                                    <td>
                                    {editingId === student.uniqueid ? (
                                        <select onChange={(e) => handleEditChange(e, "subcategory")} value={editedData?.subcategory || ""}>
                                            {categoryOptions[editedData?.category] && categoryOptions[editedData?.category].map(sub => (
                                                <option key={sub} value={sub}>{sub}</option>
                                            ))}
                                        </select>
                                             ) : student.subcategory}
                                    </td>
                                           


                                            <td>
                                                {editingId === student.uniqueid ? (
                                                    <input
                                                        type="text"
                                                        value={editedData?.narration || ""}
                                                        onChange={(e) => handleEditChange(e, "narration")}
                                                    />
                                                ) : student.narration}
                                            </td>

                                            <td>
                                                {editingId === student.uniqueid ? (
                                                    <input
                                                        type="text"
                                                        value={editedData?.details || ""}
                                                        onChange={(e) => handleEditChange(e, "details")}
                                                    />
                                                ) : student.details}
                                            </td>

                                            <td>
                                                {editingId === student.uniqueid ? (
                                                    <input
                                                        type="date"
                                                        value={editedData?.workdate || ""}
                                                        onChange={(e) => handleEditChange(e, "workdate")}
                                                    />
                                                ) : student.workdate}
                                            </td>

                                            <td>
                                                {editingId === student.uniqueid ? (
                                                    <input
                                                        type="text"
                                                        value={editedData?.vehicleno || ""}
                                                        onChange={(e) => handleEditChange(e, "vehicleno")}
                                                    />
                                                ) : student.vehicleno}
                                            </td>

                                            <td>
                                                {editingId === student.uniqueid ? (
                                                    <input
                                                        type="text"
                                                        value={editedData?.partno || ""}
                                                        onChange={(e) => handleEditChange(e, "partno")}
                                                    />
                                                ) : student.partno}
                                            </td>


                                            <td>
                                                {editingId === student.uniqueid ? (
                                                    <input
                                                        type="text"
                                                        value={editedData?.cessledger || ""}
                                                        onChange={(e) => handleEditChange(e, "cessledger")}
                                                    />
                                                ) : student.cessledger}
                                            </td>

                                            <td>
                                                {editingId === student.uniqueid ? (
                                                    <input
                                                        type="number"
                                                        value={editedData?.cessamount || ""}
                                                        onChange={(e) => handleEditChange(e, "cessamount")}
                                                    />
                                                ) : student.cessamount}
                                            </td>

                                            <td>
                                                {editingId === student.uniqueid ? (
                                                    <input
                                                        type="text"
                                                        value={editedData?.tallyimportstatus || ""}
                                                        onChange={(e) => handleEditChange(e, "tallyimportstatus")}
                                                    />
                                                ) : student.tallyimportstatus}
                                            </td>

                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        ) : (searchkiya && <p>No results found</p>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GstAdminsearch