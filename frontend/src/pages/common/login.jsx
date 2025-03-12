import React from "react";
import Login from "../../components/common/Userloginregister/login.jsx"
import Navbar from "../../components/common/Navbar/navbar.jsx"


const Loginpage = () => {
    return (
        <div>

            <Navbar/>
            <Login/>
           
            {/* <Link to="/search">Go to Search Page</Link> */}

        </div>
    );
};

export default Loginpage;
