import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./adminmaintennance.css";
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

    const handleSearch = async () => {
        try {
            setSearchkiya(true); // Set search state
    
            const groupedFilters = filters.reduce((acc, filter) => {
                if (["km"].includes(filter.type)) {
                    // Handle numerical ranges
                    if (filter.valueFrom) acc[`${filter.type}From`] = filter.valueFrom;
                    if (filter.valueTo) acc[`${filter.type}To`] = filter.valueTo;
                } else if (filter.type === "workdate") {
                    let normaldatefrom = new Date(filter.valueFrom).toISOString();
                    let normaldateto = new Date(filter.valueTo).toISOString();
                    if (filter.valueFrom) acc["dateFrom"] = normaldatefrom.split("T")[0];
                    if (filter.valueTo) acc["dateTo"] = normaldateto.split("T")[0];
                } else {
                    // Handle text-based filters
                    if (!acc[filter.type]) acc[filter.type] = [];
                    acc[filter.type].push(filter.value);
                }
                return acc;
            }, {});
    
            // Convert filters to query string
            const queryParams = new URLSearchParams(groupedFilters).toString();
    
            // Make both API calls simultaneously
            const [gstResponse, nongstResponse] = await Promise.all([
                axios.get(`http://localhost:5000/gst/students/search?${queryParams}`),
                axios.get(`http://localhost:5000/nongst/students/search?${queryParams}`)
            ]);
    
            // Combine both results into a single array
            const combinedResults = [...gstResponse.data.results, ...nongstResponse.data.results];
    
            // Update state with the merged results
            setResults(combinedResults);
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
            return updatedData;
        });
    };
    

    const handleSave = async () => {
        if (!editedData) return; // Prevent errors
    
        try {
            const baseURL = editedData.uniqueid.startsWith('G') 
                ? 'http://localhost:5000/gst/students/update/' 
                : 'http://localhost:5000/nongst/students/update/';
            
            await axios.put(`${baseURL}${editedData.uniqueid}`, editedData);
    
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
                    <h2>Admin Search Entry For Maintenance</h2>

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
                                    <option value="workdate">Work Date</option>
                                    <option value="voucherno">Voucher No</option>
                                    <option value="km">Kilometers</option>
                                    <option value="companyname">Company Name</option>
                                    <option value="vehicleno">Vehicle No</option>
                                    <option value="partno">Part No</option>
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
                                ["km"].includes(filter.type) ? (
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
                                            
                                            <th>Work Date</th>
                                            <th>Kilometer</th>
                                            <th>Vehicle No</th>
                                            <th>Part No</th>
                                            
                                            <th>Narration</th>
                                            <th>Details</th>
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
                                                {editingId === student.uniqueid ? (
                                                    <input
                                                        type="date"
                                                        value={editedData?.workdate || ""}
                                                        onChange={(e) => handleEditChange(e, "date")}
                                                    />
                                                ) : student.workdate}
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