import React from "react";
import Exampleform from "../components/exampleform.jsx";

import Navbar from "../components/Navbar/navbar.jsx";

const Home = () => {
    return (
        <div>

            <Navbar/>
            <Exampleform />
            {/* <Link to="/search">Go to Search Page</Link> */}

        </div>
    );
};

export default Home;
