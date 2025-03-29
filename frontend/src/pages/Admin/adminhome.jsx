import React from 'react'
import Navbar from "../../components/Admin/Navbar/navbar.jsx"
import AdminMaintenance from "../../components/Admin/maintenance/adminmaintenance.jsx"

const adminhome = () => {
  return (
    <div>
      <Navbar/>
      <AdminMaintenance/>
    </div>
  )
}

export default adminhome