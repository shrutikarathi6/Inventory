import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./search.css";

import { useNavigate } from "react-router-dom";
import { FaPlus, FaTimes, FaEdit, FaTrash, FaEye, FaSave } from "react-icons/fa";

const Search = () => {
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
                if (["amount", "km", "total"].includes(filter.type)) {
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
            const response = await axios.get(`http://localhost:5000/api/students/search?${queryParams}`);
            setResults(response.data.results);
        } catch (error) {
            console.error("Error searching data:", error);
        }
    };

    // Delete student
    const handleDelete = async (uniqueid) => {
        if (!window.confirm("Are you sure you want to delete this entry?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/students/delete/${uniqueid}`);
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
            await axios.put(`http://localhost:5000/api/students/update/${editedData.uniqueid}`, editedData);
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
        <div className="backgroundsearch">
    <div className="foregroundsearch">
        <h2>Search Entry</h2>

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
                    <option value="partyname">PartyName </option>
                    <option value="category">Category</option>
                    <option value="subcategory">SubCategory</option>
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
                            <th>Ref No</th>
                            <th>Party</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((student) => (
                            <tr key={student.uniqueid}>
                                 <td>{student.referenceno}</td>
                                 <td>{student.partyname}</td>
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
                                            type="number" 
                                            value={editedData?.amount || ""} 
                                            onChange={(e) => handleEditChange(e, "amount")} 
                                        />
                                    ) : student.amount}
                                </td>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (searchkiya && <p>No results found</p>)}
        </div>
    </div>
</div>

    );
};

export default Search;
