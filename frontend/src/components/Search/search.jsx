import React, { useState, useRef } from "react";
import axios from "axios";
import "./search.css";
import { FaPlus, FaTimes } from "react-icons/fa";

const Search = () => {
    const [filters, setFilters] = useState([]);
    const [results, setResults] = useState([]);
    const [searchkiya, setsearchkiya] = useState(false);
    
    const inputRefs = useRef([]); // 🔥 Store references for input fields

    // Add a new filter row
    const handleAddFilter = () => {
        setFilters((prevFilters) => {
            const newFilters = [...prevFilters, { type: "", value: "" }];

            setTimeout(() => {
                if (inputRefs.current.length > 0) {
                    inputRefs.current[newFilters.length - 1]?.focus();
                }
            }, 0);

            return newFilters;
        });
    };

    // Update a filter's value
    const handleFilterChange = (index, key, value) => {
        const newFilters = [...filters];
        newFilters[index][key] = value;
        setFilters(newFilters);

        // 🔥 Jaise hi filter select karega, next input field focus ho jayega
        if (key === "type" && value) {
            setTimeout(() => {
                inputRefs.current[index]?.focus();
            }, 0);
        }
    };

    // Remove a filter row
    const handleRemoveFilter = (index) => {
        setFilters(filters.filter((_, i) => i !== index));
    };

    // Perform search based on filters
    const handleSearch = async () => {
        try {
            setsearchkiya(true);
            
            // Construct query string
            const queryParams = filters
                .filter(f => f.type && f.value)
                .map(f => `${f.type}=${encodeURIComponent(f.value)}`)
                .join("&");

            if (!queryParams) return;

            const response = await axios.get(`http://localhost:5000/search?${queryParams}`);
            setResults(response.data.results);
        } catch (error) {
            console.error("Error searching data:", error);
        }
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
                            <option value="roll">Roll No</option>
                            <option value="age">Age</option>
                        </select>
                        
                        {filter.type && (
                            <input
                                ref={(el) => (inputRefs.current[index] = el)} // 🔥 Store reference
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
                
                {results.length > 0 ? (
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Roll No</th>
                                <th>Age</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((student, index) => (
                                <tr key={index}>
                                    <td>{student.name}</td>
                                    <td>{student.roll}</td>
                                    <td>{student.age}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    searchkiya ? <p>No results found</p> : <p></p>
                )}
            </div>
        </div>
    );
};

export default Search;
