import React from "react";
import Example from "../components/Formm/form.jsx"



import Navbar from "../components/Navbar/navbar.jsx";

const Home = () => {
    return (
        <div>

            <Navbar/>
            <Example/>
           
            {/* <Link to="/search">Go to Search Page</Link> */}

        </div>
    );
};

export default Home;
