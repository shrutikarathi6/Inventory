import React, { useState, useRef } from "react";
import "./excelsheet.css";
import axios from "axios";
import { FaPlus, FaTimes } from "react-icons/fa";

const ExcelSheet = () => {
    const [filters, setFilters] = useState([]);
    const inputRefs = useRef([]);

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

    const generateQueryParams = () => {
        const groupedFilters = filters.reduce((acc, filter) => {
            if (["uniqueid", "roll", "age"].includes(filter.type)) {
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

        return Object.keys(groupedFilters)
            .map(type =>
                `${type}=${
                    Array.isArray(groupedFilters[type])
                        ? groupedFilters[type].map(val => encodeURIComponent(val)).join(",")
                        : encodeURIComponent(groupedFilters[type])
                }`
            )
            .join("&");
    };

    const handleDownload = async (isAll = false) => {
        try {
            let url = "http://localhost:5000/api/excel/export";

            if (!isAll) {
                const queryParams = generateQueryParams();
                if (queryParams) {
                    url += "?" + queryParams;
                }
            }

            const response = await axios.get(url, { responseType: "blob" });

            if (response.status !== 200) {
                throw new Error("Failed to download Excel file!");
            }

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
                            <option value="uniqueid">Unique ID</option>
                            <option value="roll">Roll No</option>
                            <option value="age">Age</option>
                        </select>

                        {["uniqueid", "roll", "age"].includes(filter.type) ? (
                            <div className="range-inputs">
                                <input
                                    type="text"
                                    placeholder={"From " + filter.type}
                                    value={filter.valueFrom || ""}
                                    onChange={(e) => handleFilterChange(index, "valueFrom", e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder={"To " + filter.type}
                                    value={filter.valueTo || ""}
                                    onChange={(e) => handleFilterChange(index, "valueTo", e.target.value)}
                                />
                            </div>
                        ) : (
                            <input
                                type="text"
                                placeholder={"Enter " + filter.type}
                                value={filter.value || ""}
                                onChange={(e) => handleFilterChange(index, "value", e.target.value)}
                            />
                        )}

                        <button className="remove-filter-btn" onClick={() => handleRemoveFilter(index)}>
                            <FaTimes />
                        </button>
                    </div>
                ))}

                <div className="modal-buttons">
                    <button onClick={() => handleDownload(false)}>Apply Filters & Download</button>
                    <button onClick={() => handleDownload(true)}>Download All</button>
                </div>
            </div>
        </div>
    );
};

export default ExcelSheet;
