import React, { useState, useRef } from "react";
import "./excelsheet.css";
import axios from "axios";
import { FaPlus, FaTimes } from "react-icons/fa";
import Navbar from "../Navbar/navbar";

const ExcelSheet = () => {
    const [filters, setFilters] = useState([]);
    const inputRefs = useRef([]);

    const handleAddFilter = () => {
        setFilters((prevFilters) => {
            const newFilters = [...prevFilters, { type: "", value: "", valueFrom: "", valueTo: "" }];

            setTimeout(() => {
                if (inputRefs.current.length > 0) {
                    inputRefs.current[newFilters.length - 1]?.focus();
                }
            }, 0);

            return newFilters;
        });
    };

    const handleFilterChange = (index, key, value) => {
        setFilters((prevFilters) =>
            prevFilters.map((filter, i) =>
                i === index ? { ...filter, [key]: value } : filter
            )
        );

        if (key === "type" && value) {
            setTimeout(() => {
                inputRefs.current[index]?.focus();
            }, 0);
        }
    };

    const handleRemoveFilter = (index) => {
        setFilters((prevFilters) => prevFilters.filter((_, i) => i !== index));
    };

    const generateQueryParams = () => {
        const groupedFilters = filters.reduce((acc, filter) => {
            if (!filter.type) return acc; // Ignore empty filters

            if (["amount", "km", "total"].includes(filter.type)) {
                if (filter.valueFrom) acc[`${filter.type}From`] = filter.valueFrom;
                if (filter.valueTo) acc[`${filter.type}To`] = filter.valueTo;
            } else if (filter.type === "date") {
                normaldatefrom=new Date(filter.valueFrom).toISOString();
                normaldateto=new Date(filter.valueTo).toISOString();
                if (filter.valueFrom) acc["dateFrom"] = normaldatefrom.split("T")[0];
                if (filter.valueTo) acc["dateTo"] = normaldateto.split("T")[0];
            } else if (filter.value) {
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
                if (queryParams) url += "?" + queryParams;
            }

            const response = await axios.get(url, { responseType: "blob" });

            if (response.status !== 200) throw new Error("Failed to download Excel file!");

            const blob = new Blob([response.data]);
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.setAttribute("download", isAll ? "all_data.xlsx" : "filtered_data.xlsx");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error downloading Excel file:", error);
            alert("Failed to download Excel file!");
        }
    };

    return (
        <>
        <Navbar/>
        <div className="backgroundexcel">
            <div className="foregroundexcel">
                <h2>Download Filtered Data For NONGST</h2>

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
                            <option value="uniqueid">Unique Id</option>
                            <option value="date">Date</option>
                            <option value="referenceno">Reference No</option>
                            <option value="partyname">Party Name</option>
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
                                    ref={(el) => (inputRefs.current[index] = el)}
                                />
                                <input
                                    type="date"
                                    placeholder="To"
                                    value={filter.valueTo || ""}
                                    onChange={(e) => handleFilterChange(index, "valueTo", e.target.value)}
                                />
                            </div>
                        ) : ["amount", "km", "total"].includes(filter.type) ? (
                            <div className="range-inputs">
                                <input
                                    type="text"
                                    placeholder="From"
                                    value={filter.valueFrom || ""}
                                    onChange={(e) => handleFilterChange(index, "valueFrom", e.target.value)}
                                    ref={(el) => (inputRefs.current[index] = el)}
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
                                ref={(el) => (inputRefs.current[index] = el)}
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
        </>
    );
};

export default ExcelSheet;
