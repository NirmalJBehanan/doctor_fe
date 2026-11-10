import React, { useEffect, useState } from 'react'
import Navbars from '../homeComponets/Navbars'
import axios from 'axios'
import './AdminDash.css'
const AdminDash = () => {

  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    totalAppointments: 0
  })

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token")

        const response = await axios.get(
          "/admin/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        setDashboard(response.data)

      } catch (error) {
        console.log(error)
      }
    }

    fetchDashboard()
  }, [])

  return (
    <>
      <Navbars />

      <div className="admin-dashboard">
        <h2>Admin Dashboard</h2>

        <div className="dashboard-cards">

          <div className="dashboard-card patients">
            <h3>Total Patients</h3>
            <p>{dashboard.totalUsers}</p>
          </div>

          <div className="dashboard-card doctors">
            <h3>Total Doctors</h3>
            <p>{dashboard.totalDoctors}</p>
          </div>

          <div className="dashboard-card appointments">
            <h3>Total Appointments</h3>
            <p>{dashboard.totalAppointments}</p>
          </div>

        </div>
      </div>
    </>
  )
}

export default AdminDash