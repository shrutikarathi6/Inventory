import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./search.css";

import { useNavigate } from "react-router-dom";
import { FaPlus, FaTimes, FaEdit, FaTrash, FaEye, FaSave } from "react-icons/fa";
import Navbar from "../Navbar/navbar";

const Search = () => {
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
                console.log
                    if (filter.valueFrom) acc["dateFrom"] = new Date(filter.valueFrom).toISOString();
                    if (filter.valueTo) acc["dateTo"] = new Date(filter.valueTo).toISOString();

                } else {
                    // Handle text-based filters
                    if (!acc[filter.type]) acc[filter.type] = [];
                    acc[filter.type].push(filter.value);
                }
                return acc;
            }, {});

            const queryParams = new URLSearchParams(groupedFilters).toString();
            const response = await axios.get(`http://localhost:5000/gst/students/search?${queryParams}`);
            setResults(response.data.results);
        } catch (error) {
            console.error("Error searching data:", error);
        }
    };


    return (
        <>
            <Navbar />
            <div className="backgroundsearch">
                <div className="foregroundsearch">
                    <h2>Search Entry For GST</h2>

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
                                <option value="referenceno">Supp Inv No</option>
                                <option value="partyname">Party Name</option>
                                <option value="category">Category</option>
                                <option value="subcategory">SubCategory</option>
                                <option value="companyname">Company Name</option>
                                <option value="vehicleno">Vehicle No</option>
                                <option value="partno">Part No</option>
                                <option value="amount">Amount</option>
                                <option value="km">Kilometers</option>
                                <option value="total">Total</option>
                            </select>

                            {/* Date Range Input */}
                            {filter.type === "date" || filter.type==="workdate" ? (
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
                                        <th>Uniqueid</th>
                                        <th>Company Name</th>
                                        <th>Voucher No</th>
                                        <th>Voucher Type</th>
                                        <th>Date</th>
                                        <th>Supp Inv No</th>
                                        <th>Supp Inv Date</th>
                                        <th>Party Name</th>
                                        <th>Additional Ledge</th>
                                        <th>Amount</th>
    
                                        <th>CGST Legder</th>
                                        <th>CGST Percent</th>
                                        <th>CGST Amount</th>
                                        <th>SGST Ledger</th>
                                        <th>SGST Percent</th>
                                        <th>SGST Amount</th>
                                        <th>IGST Ledger</th>
                                        <th>IGST Percent</th>
                                        <th>IGST Amount</th>
                                        <th>Total Amount</th>

                                        <th>Kilometer</th>
                                        <th>Category</th>
                                        <th>Subcategory</th>
                                        <th>Narration</th>
                                        <th>Details</th>
                                        <th>Work Date</th>

                                        <th>Vehicle No</th>
                                        <th>Part No</th>
                                        
                                   
                                        <th>CESS Ledger</th>
                                        <th>CESS Amount</th>
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
                                                Purchase
                                            </td>

                                            <td>{student.date ? new Date(student.date).toISOString().split("T")[0] : ""}</td>


                                            <td>{student.referenceno}</td>
                                            <td>{student.suppinvdate ? new Date(student.suppinvdate).toISOString().split("T")[0] : ""}</td>
                                            <td>{student.partyname}</td>

                                            <td>{student.additionalledge}</td>

                                            <td>
                                                {student.amount}
                                            </td>

                                           

                                            <td>
                                                {student.cgstledger}
                                            </td>
                                            <td>{student.cgstpercent}</td>

                                            <td>{student.cgstamount}</td>

                                            <td>
                                                {student.sgstledger}
                                            </td>
                                            <td>{student.sgstpercent}</td>

                                            <td>{student.sgstamount}</td>

                                            <td>
                                                {student.igstledger}
                                            </td>
                                            <td>{student.igstpercent}</td>

                                            <td>{student.igstamount}</td>
                                            <td>{student.total}</td>

                                            <td>
                                                {student.km}
                                            </td>

                                            <td>
                                                {student.category}
                                            </td>

                                            <td>
                                                {student.subcategory}
                                            </td>

                                            <td>
                                                {student.narration}
                                            </td>

                                            <td>
                                                {student.details}
                                            </td>

                                            
                                            <td>{student.workdate ? new Date(student.workdate).toISOString().split("T")[0] : ""}</td>
                                        

                                            <td>
                                                {student.vehicleno}
                                            </td>

                                            <td>
                                                {student.partno}
                                            </td>


                                            <td>
                                                {student.cessledger}
                                            </td>

                                            <td>
                                                {student.cessamount}
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
        </>

    );
};

export default Search;
