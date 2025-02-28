import React from "react";
import Search from "../components/search.jsx";
import { Link } from "react-router-dom";

const SearchPage = () => {
    return (
        <div>
            <Search />
            <Link to="/">Back to Form</Link>
        </div>
    );
};

export default SearchPage;
