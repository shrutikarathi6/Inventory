


import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./search.css";

import { useNavigate } from "react-router-dom";
import { FaPlus, FaTimes, FaEdit, FaTrash, FaEye, FaSave } from "react-icons/fa";


const NongstAdminsearch = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState([]);
    const [results, setResults] = useState([]);
    const [searchkiya, setSearchkiya] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editedData, setEditedData] = useState(null);
    const inputRefs = useRef([]);

    // Focus newly added filter input
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
                if (["dramount", "km"].includes(filter.type)) {
                    // Handle numerical ranges
                    if (filter.valueFrom) acc[`${filter.type}From`] = filter.valueFrom;
                    if (filter.valueTo) acc[`${filter.type}To`] = filter.valueTo;
                } else if (filter.type === "date") {
                    normaldatefrom=new Date(filter.valueFrom).toISOString();
                    normaldateto=new Date(filter.valueTo).toISOString();
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
            const response = await axios.get(`http://103.146.240.119:5000/nongst/students/search?${queryParams}`);
            setResults(response.data.results);
        } catch (error) {
            console.error("Error searching data:", error);
        }
    };

    // Delete student
    const handleDelete = async (uniqueid) => {
        if (!window.confirm("Are you sure you want to delete this entry?")) return;
        try {
            await axios.delete(`http://103.146.240.119:5000/nongst/students/delete/${uniqueid}`);
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

    // Handle edit input change
    const handleEditChange = (e, field) => {
        setEditedData(prev => ({ ...prev, [field]: e.target.value }));
    };

    // Save updated data
    const handleSave = async () => {
        if (!editedData) return; // Prevent errors
        try {
            await axios.put(`http://103.146.240.119:5000/nongst/students/update/${editedData.uniqueid}`, editedData);
            setResults(prevResults => prevResults.map(student => 
                student.uniqueid === editedData.uniqueid ? { ...editedData } : student
            ));
            setEditingId(null);
        } catch (error) {
            console.error("Error updating entry:", error);
            alert("Failed to update entry.");
        }
    };

    const handleView = (student) => {
        setSelectedStudent(student);
        setDivopen(true);
    };

    return (
        <>
        
        <div className="backgroundsearch">
    <div className="foregroundsearch">
        <h2>Search Entry For NonGST</h2>

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
                    <option value="referenceno">Reference No</option>
                    <option value="drledgername">Dr Ledger Name</option>
                    <option value="category">Category</option>
                    <option value="subcategory">SubCategory</option>
                    <option value="dramount">Dr Amount</option>
                    <option value="km">Kilometers</option>
                    
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
                ["dramount", "km"].includes(filter.type) ? (
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
                            <th>Voucher No</th>
                            <th>Voucher Type</th>
                            <th>Date</th>
                            <th>Dr Ledger Name</th>
                            <th>Reference No</th>
                            <th>Dr Amount</th>
                        
                            <th>Reference Amount</th>
                            <th>Cr Ledger Name</th>
                            <th>Cr Amount</th>
                            <th>Cr Cost Center</th>
                            <th>Cr Cost Center Amount</th>
                            
                            <th>Kilometer</th>
                            <th>Category</th>
                            <th>Subcategory</th>
                            <th>Narration</th>
                            <th>Details</th>
                            <th>Dr Cost Center</th>
                            <th>Dr Cost Center Amount</th>
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
                                 

                                 
                                <td>
                                    {editingId === student.uniqueid ? (
                                        <input 
                                            type="number" 
                                            value={editedData?.voucherno || ""} 
                                            onChange={(e) => handleEditChange(e, "voucherno")} 
                                        />
                                    ) : student.voucherno}
                                </td>
                                <td>
                                    Journal
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
                                

                                <td>{student.drledgername}</td>
                                <td>{student.referenceno}</td>
                                 

                                 <td>
                                    {editingId === student.uniqueid ? (
                                        <input 
                                            type="number" 
                                            value={editedData?.dramount || ""} 
                                            onChange={(e) => handleEditChange(e, "dramount")} 
                                        />
                                    ) : student.dramount}
                                </td>

                                <td>
                                    {editingId === student.uniqueid ? (
                                        <input 
                                            type="number" 
                                            value={editedData?.referenceamount || ""} 
                                            onChange={(e) => handleEditChange(e, "referenceamount")} 
                                        />
                                    ) : student.referenceamount}
                                </td>

                                 <td>
                                    {editingId === student.uniqueid ? (
                                        <input 
                                            type="text" 
                                            value={editedData?.crledgername || ""} 
                                            onChange={(e) => handleEditChange(e, "crledgername")} 
                                        />
                                    ) : student.crledgername}
                                </td>

                                <td>
                                    {editingId === student.uniqueid ? (
                                        <input 
                                            type="number" 
                                            value={editedData?.cramount || ""} 
                                            onChange={(e) => handleEditChange(e, "cramount")} 
                                        />
                                    ) : student.cramount}
                                </td>

                                <td>
                                    {editingId === student.uniqueid ? (
                                        <input 
                                            type="text" 
                                            value={editedData?.crcostcenter|| ""} 
                                            onChange={(e) => handleEditChange(e, "crcostcenter")} 
                                        />
                                    ) : student.crcostcenter}
                                </td>

                                

                                <td>
                                    {editingId === student.uniqueid ? (
                                        <input 
                                            type="number" 
                                            value={editedData?.crcostcenteramount || ""} 
                                            onChange={(e) => handleEditChange(e, "crcostcenteramount")} 
                                        />
                                    ) : student.crcostcenteramount}
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
                                        <input 
                                            type="text" 
                                            value={editedData?.category || ""} 
                                            onChange={(e) => handleEditChange(e, "category")} 
                                        />
                                    ) : student.category}
                                </td>

                                <td>
                                    {editingId === student.uniqueid ? (
                                        <input 
                                            type="text" 
                                            value={editedData?.subcategory || ""} 
                                            onChange={(e) => handleEditChange(e, "subcategory")} 
                                        />
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
                                            type="text" 
                                            value={editedData?.drcostcenter || ""} 
                                            onChange={(e) => handleEditChange(e, "drcostcenter")} 
                                        />
                                    ) : student.drcostcenter}
                                </td>

                                <td>
                                    {editingId === student.uniqueid ? (
                                        <input 
                                            type="number" 
                                            value={editedData?.drcostcenteramount || ""} 
                                            onChange={(e) => handleEditChange(e, "drcostcenteramount")} 
                                        />
                                    ) : student.drcostcenteramount}
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
</>

    );
};

export default NongstAdminsearch;
