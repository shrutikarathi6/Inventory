import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./search.css";
import "./popcard.css";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTimes, FaEdit, FaTrash, FaEye, FaSave } from "react-icons/fa";

const Search = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState([]);
    const [results, setResults] = useState([]);
    const [divopen, setDivopen] = useState(false);
    const [searchkiya, setSearchkiya] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
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
                if (["uniqueid", "roll", "age"].includes(filter.type)) {
                    if (filter.valueFrom || filter.valueTo) {
                        if (filter.valueFrom) acc[`${filter.type}From`] = filter.valueFrom;
                        if (filter.valueTo) acc[`${filter.type}To`] = filter.valueTo;
                    } else if (filter.value) {
                        acc[filter.type] = filter.value;
                    }
                } else {
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
        if (!window.confirm("Are you sure you want to delete this student?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/students/delete/${uniqueid}`);
            alert("Student deleted successfully!");
            setResults(results.filter(student => student.uniqueid !== uniqueid));
        } catch (error) {
            console.error("Error deleting student:", error);
            alert("Failed to delete student.");
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
            console.error("Error updating student:", error);
            alert("Failed to update student.");
        }
    };

    const handleView = (student) => {
        setSelectedStudent(student);
        setDivopen(true);
    };

    return (
        <div className="background">
            <div className="foreground">
                <h2>Search Student</h2>

                <button className="add-filter-btn" onClick={handleAddFilter}>
                    <FaPlus /> Add Filter
                </button>

                {/* Pop-up Card */}
                {divopen && (
                    <div className="overlay" onClick={() => setDivopen(false)}>
                        <div className="popup-card" onClick={(e) => e.stopPropagation()}>
                            <button className="close-icon" onClick={() => setDivopen(false)}>
                                <FaTimes />
                            </button>
                            <h2>Student Details</h2>
                            <p><strong>Name:</strong> {selectedStudent.name}</p>
                            <p><strong>UniqueID:</strong> {selectedStudent.uniqueid}</p>
                            <p><strong>Roll No:</strong> {selectedStudent.roll}</p>
                            <p><strong>Age:</strong> {selectedStudent.age}</p>
                            <button className="close-btn" onClick={() => setDivopen(false)}>Close</button>
                        </div>
                    </div>
                )}

                {/* Filters */}
                {filters.map((filter, index) => (
                    <div key={index} className="filter-row">
                        <select
                            value={filter.type}
                            onChange={(e) => handleFilterChange(index, "type", e.target.value)}
                        >
                            <option value="">Select Filter</option>
                            <option value="name">Name</option>
                            <option value="uniqueid">UniqueID</option>
                            <option value="roll">Roll No</option>
                            <option value="age">Age</option>
                        </select>

                        {/* Range Input for Numeric Fields */}
                        {["uniqueid", "roll", "age"].includes(filter.type) ? (
                            <div className="range-inputs">
                                <input type="text" placeholder="From" value={filter.valueFrom || ""} onChange={(e) => handleFilterChange(index, "valueFrom", e.target.value)} />
                                <input type="text" placeholder="To" value={filter.valueTo || ""} onChange={(e) => handleFilterChange(index, "valueTo", e.target.value)} />
                            </div>
                        ) : (
                            <input type="text" placeholder="Enter value" value={filter.value || ""} onChange={(e) => handleFilterChange(index, "value", e.target.value)} />
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
                                    <th>Name</th>
                                    <th>UniqueID</th>
                                    <th>Roll No</th>
                                    <th>Age</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((student) => (
                                    <tr key={student.uniqueid}>
                                        <td>{editingId === student.uniqueid ? <input type="text" value={editedData?.name || ""} onChange={(e) => handleEditChange(e, "name")} /> : student.name}</td>
                                        <td>{student.uniqueid}</td>
                                        <td>{editingId === student.uniqueid ? <input type="number" value={editedData?.roll || ""} onChange={(e) => handleEditChange(e, "roll")} /> : student.roll}</td>
                                        <td>{editingId === student.uniqueid ? <input type="number" value={editedData?.age || ""} onChange={(e) => handleEditChange(e, "age")} /> : student.age}</td>
                                        <td>
                                            {editingId === student.uniqueid ? <button onClick={handleSave} className="save-btn"><FaSave /></button> : <>
                                                <button onClick={() => handleEdit(student)} className="edit-btn"><FaEdit /></button>
                                                <button onClick={() => handleDelete(student.uniqueid)} className="delete-btn"><FaTrash /></button>
                                            </>}
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
