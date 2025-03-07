import React, { useState, useRef } from "react";
import axios from "axios";
import "./search.css";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTimes, FaEdit, FaTrash } from "react-icons/fa";

const Search = () => {


    const navigate = useNavigate();
    const [filters, setFilters] = useState([]);
    const [results, setResults] = useState([]);
    const [searchkiya, setsearchkiya] = useState(false);
    const inputRefs = useRef([]);

    const handleAddFilter = () => {
        setFilters(prevFilters => {
            const newFilters = [...prevFilters, { type: "", value: "" }];
            setTimeout(() => {
                if (inputRefs.current.length > 0) {
                    inputRefs.current[newFilters.length - 1]?.focus();
                }
            }, 0);
            return newFilters;
        });
    };

    const handleFilterChange = (index, key, value) => {
        const newFilters = [...filters];
        newFilters[index][key] = value;
        setFilters(newFilters);
        if (key === "type" && value) {
            setTimeout(() => {
                inputRefs.current[index]?.focus();
            }, 0);
        }
    };
    

    const handleRemoveFilter = (index) => {
        setFilters(filters.filter((_, i) => i !== index));
    };

    const handleSearch = async () => {
        try {
            const groupedFilters = filters.reduce((acc, filter) => {
                if (filter.type === "uniqueid" || filter.type === "roll" || filter.type === "age" ) {
                    if (filter.valueFrom || filter.valueTo) {
                        if (filter.valueFrom) acc[`${filter.type}From`] = encodeURIComponent(filter.valueFrom);
                        if (filter.valueTo) acc[`${filter.type}To`] = encodeURIComponent(filter.valueTo);
                    } else if (filter.value) {
                        acc[filter.type] = encodeURIComponent(filter.value);
                    }
                } else {
                    if (!acc[filter.type]) acc[filter.type] = [];
                    acc[filter.type].push(filter.value);
                }
                return acc;
            }, {});
    
            const queryParams = Object.keys(groupedFilters)
                .map(type => `${type}=${Array.isArray(groupedFilters[type]) ? groupedFilters[type].map(val => encodeURIComponent(val)).join(",") : encodeURIComponent(groupedFilters[type])}`)
                .join("&");
    
            const response = await axios.get(`http://localhost:5000/api/students/search?${queryParams}`);
            setResults(response.data.results);
        } catch (error) {
            console.error("Error searching data:", error);
        }
    };
    

    const handleDelete = async (uniqueid) => {
        if (!window.confirm("Are you sure you want to delete this student?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/students/delete/${uniqueid}`);
            alert("Student deleted successfully!");
            setResults(results.filter(student => student.uniqueid !== uniqueid)); // Update state after deletion
        } catch (error) {
            console.error("Error deleting student:", error);
            alert("Failed to delete student.");
        }
    };

    const handleEdit = (student) => {
        navigate("/update-form", { state: { student } });
      };

    return (
        <div className="background">
            <div className="foreground">
                <h2>Search Student</h2>
                <button className="add-filter-btn" onClick={handleAddFilter}>
                    <FaPlus /> Add Filter
                </button>

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

                        {filter.type && (filter.type === "uniqueid" || filter.type === "roll" || filter.type==="age") ? (
                            <div className="range-inputs">
                                <input
                                    type="text"
                                    placeholder={`From ${filter.type}`}
                                    value={filter.valueFrom}
                                    onChange={(e) => handleFilterChange(index, "valueFrom", e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder={`To ${filter.type}`}
                                    value={filter.valueTo}
                                    onChange={(e) => handleFilterChange(index, "valueTo", e.target.value)}
                                />
                            </div>
                        ) : (
                            <input
                                type="text"
                                placeholder={`Enter ${filter.type}`}
                                value={filter.value}
                                onChange={(e) => handleFilterChange(index, "value", e.target.value)}
                            />
                        )}


                       

                        <button className="remove-filter-btn" onClick={() => handleRemoveFilter(index)}>
                            <FaTimes />
                        </button>
                    </div>
                ))}

                <button className="search-btn" onClick={handleSearch}>Search</button>

                <div className="table-container">
                    {results.length > 0 ? (
                        <div className="table-scroll">
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
                                    {results.map((student, index) => (
                                        <tr key={index}>
                                            <td>{student.name}</td>
                                            <td>{student.uniqueid}</td>
                                            <td>{student.roll}</td>
                                            <td>{student.age}</td>
                                            <td>
                                            <button onClick={() => handleEdit(student)} className="edit-btn">
                                                <FaEdit />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(student.uniqueid)} 
                                                    className="delete-btn"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        searchkiya && <p>No results found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;
