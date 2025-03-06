import React from "react";
import ExcelSheet from "../components/ExcelSheet/excelsheet.jsx";

import Navbar from "../components/Navbar/navbar.jsx";

const Home = () => {
    return (
        <div>

            <Navbar/>
            <ExcelSheet />
            {/* <Link to="/search">Go to Search Page</Link> */}

        </div>
    );
};

export default Home;
