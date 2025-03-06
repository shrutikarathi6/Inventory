import React, { useState, useRef } from "react";
import "./excelsheet.css";
import axios from "axios";
import { FaPlus, FaTimes } from "react-icons/fa";

const ExcelSheet = () => {
    const [filters, setFilters] = useState([]);
    const inputRefs = useRef([]);

    // ✅ Add new filter row
    const handleAddFilter = () => {
        setFilters((prevFilters) => {
            const newFilters = [...prevFilters, { type: "", value: "", from: "", to: "" }];

            setTimeout(() => {
                if (inputRefs.current.length > 0) {
                    inputRefs.current[newFilters.length - 1]?.focus();
                }
            }, 0);

            return newFilters;
        });
    };

    // ✅ Handle filter value change
    const handleFilterChange = (index, key, value) => {
        const newFilters = [...filters];
        newFilters[index][key] = value;
        setFilters(newFilters);
    };

    // ✅ Remove a filter row
    const handleRemoveFilter = (index) => {
        setFilters(filters.filter((_, i) => i !== index));
    };

    // ✅ Generate query params for the filters
    const generateQueryParams = () => {
        const queryParams = new URLSearchParams();

        filters.forEach((filter) => {
            if (filter.type === "uniqueid" || filter.type === "roll") {
                if (filter.from || filter.to) {
                    queryParams.append(`${filter.type}From`, filter.from || 0);
                    queryParams.append(`${filter.type}To`, filter.to || 99999);
                }
            } else if (filter.type === "age") {
                if (filter.value) {
                    queryParams.append("age", filter.value);
                }
            } else if (filter.value) {
                queryParams.append(filter.type, filter.value);
            }
        });

        return queryParams.toString();
    };

    // ✅ Download Excel based on filters
    const handleDownload = async (isAll = false) => {
        try {
            let url = "http://localhost:5000/api/students/export/excel";

            if (!isAll) {
                const queryParams = generateQueryParams();
                if (queryParams) {
                    url += `?${queryParams}`;
                }
            }

            const response = await axios.get(url, { responseType: "blob" });
            const blob = new Blob([response.data]);
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.setAttribute("download", "students.xlsx");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error downloading Excel file:", error);
            alert("Failed to download Excel file!");
        }
    };

    return (
        <div className="background">
            <div className="foreground">
                <h2>Download Filtered Data</h2>

                {/* Add Filter Button */}
                <button className="add-filter-btn" onClick={handleAddFilter}>
                    <FaPlus /> Add Filter
                </button>

                {filters.map((filter, index) => (
                    <div key={index} className="filter-row">
                        {/* Dropdown for filter selection */}
                        <select
                            value={filter.type}
                            onChange={(e) => handleFilterChange(index, "type", e.target.value)}
                        >
                            <option value="">Select Filter</option>
                            <option value="name">Name</option>
                            <option value="uniqueid">Unique ID</option>
                            <option value="roll">Roll No</option>
                            <option value="age">Age</option>
                        </select>

                        {/* Input Fields */}
                        {filter.type && (
                            <>
                                {filter.type === "uniqueid" || filter.type === "roll" ? (
                                    <div className="range-inputs">
                                        <input
                                            type="number"
                                            placeholder="From"
                                            value={filter.from}
                                            onChange={(e) => handleFilterChange(index, "from", e.target.value)}
                                        />
                                        <input
                                            type="number"
                                            placeholder="To"
                                            value={filter.to}
                                            onChange={(e) => handleFilterChange(index, "to", e.target.value)}
                                        />
                                    </div>
                                ) : (
                                    <input
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        type="text"
                                        placeholder={`Enter ${filter.type}`}
                                        value={filter.value}
                                        onChange={(e) => handleFilterChange(index, "value", e.target.value)}
                                    />
                                )}
                            </>
                        )}

                        {/* Remove Filter Button */}
                        <button className="remove-filter-btn" onClick={() => handleRemoveFilter(index)}>
                            <FaTimes />
                        </button>
                    </div>
                ))}

                {/* Download Buttons */}
                <div className="modal-buttons">
                    <button onClick={() => handleDownload(false)}>Apply Filters & Download</button>
                    <button onClick={() => handleDownload(true)}>Download All</button>
                </div>
            </div>
        </div>
    );
};

export default ExcelSheet;
