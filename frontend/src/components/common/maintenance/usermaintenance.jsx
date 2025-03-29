import React, { useState, useRef, useEffect } from "react";
import "./usermaintenance.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTimes, FaEdit, FaTrash, FaEye, FaSave } from "react-icons/fa";

// uniqueid,voucherno,workdate,km,companyname,vehicleno,partno,details,narration,tallyimportstatus
const usermaintenance = () => {
  const navigate = useNavigate();
      const [filters, setFilters] = useState([]);
      const [results, setResults] = useState([]);
      const [searchkiya, setSearchkiya] = useState(false);
  
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


  return (
                <div className="backgroundsearch">
                    <div className="foregroundsearch">
                        <h2>Search Entry For Maintenance</h2>
    
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
                                    )
                                    }
    
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
                                            <tr>
                                                <td>{student.uniqueid}</td>
                                                <td>{student.companyname}</td>
                                                <td>
                                                    {student.voucherno}
                                                </td>
              
                                                <td>
                                                    {student.workdate}
                                                </td>
    
                                                <td>
                                                    {student.km}
                                                </td>
                                                <td>
                                                    {student.vehicleno}
                                                </td>
    
                                                <td>
                                                    {student.partno}
                                                </td>
                                                
    
                                                <td>
                                                    {student.narration}
                                                </td>
    
                                                <td>
                                                    {student.details}
                                                </td>
    
    
                                                <td>
                                                    {student.tallyimportstatus}
                                                </td>
    
    
    
                                            </tr>
                                        ))}
    
                                    </tbody>
                                </table>
                            ) : (searchkiya && <p>No results found</p>)}
                        </div>
                    </div>
                </div>
  )
}

export default usermaintenance