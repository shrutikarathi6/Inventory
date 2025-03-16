import { Navigate } from "react-router-dom";

const PrivateAdminRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("adminAuth") === "true";

    return isAuthenticated ? children : <Navigate to="/adminlogin" />;
};

export default PrivateAdminRoute;
