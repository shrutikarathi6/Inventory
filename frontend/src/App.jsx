import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import GstHome from "./pages/gst/home.jsx";
import NongstHome from "./pages/nongst/home.jsx"
import GstSearchPage from "./pages/gst/searchpage.jsx";
import NongstSearchPage from "./pages/nongst/searchpage.jsx";
import GstExcelSheet from "./pages/gst/excelsheet.jsx";
import NongstExcelSheet from "./pages/nongst/excelsheet.jsx";
import Register from "./pages/common/register.jsx";
import Login from "./pages/common/login.jsx";
import AdminLogin from "./pages/Admin/adminlogin.jsx"
import AdminHome from "./pages/Admin/adminhome.jsx";
import AdminGSTSearch from "./pages/Admin/admingstsearch.jsx";
import AdminNONGSTSearch from "./pages/Admin/adminnongstsearch.jsx"
import CheckgstNongst from "./pages/common/checkgstornongst.jsx"

import PrivateAdminRoute from "./components/common/privateadminRoute.jsx";

const PrivateRoute = ({ element }) => {
  return localStorage.getItem("token") ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      
      <Routes>
        

        {/* gst */}
        <Route path="/gst/search" element={<PrivateRoute element={<GstSearchPage />} />} />
        <Route path="/gst/excel" element={<PrivateRoute element={<GstExcelSheet />} />} />
        <Route path="/gst/home" element={<PrivateRoute element={<GstHome />} />} />
        

        {/* nongst */}
        <Route path="/nongst/search" element={<PrivateRoute element={<NongstSearchPage />} />} />
        <Route path="/nongst/excel" element={<PrivateRoute element={<NongstExcelSheet />} />} />
        <Route path="/nongst/home" element={<PrivateRoute element={<NongstHome />} />} />



        {/* common */}
        <Route path="/" element={<PrivateRoute element={<CheckgstNongst />} />} />
        <Route path="/adminlogin"  element={<AdminLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />


        {/* adminroutes */}
        <Route path="/admin" element={<PrivateAdminRoute> element={<AdminHome />}</PrivateAdminRoute>} />
        <Route path="/admin/search/gst" element={<PrivateAdminRoute> element={<AdminGSTSearch />}</PrivateAdminRoute>} />
        <Route path="/admin/search/nongst" element={<PrivateAdminRoute> element={<AdminNONGSTSearch />}</PrivateAdminRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
