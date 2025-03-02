import React from "react";
import Navbar from "../components/Navbar/navbar.jsx";
import Search from "../components/Search/search.jsx";
import { Link } from "react-router-dom";

const SearchPage = () => {
    return (
        <div>
            <Navbar/>
            <Search />
            
        </div>
    );
};

export default SearchPage;
