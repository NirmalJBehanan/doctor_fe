import React from 'react'
import "../../App.css"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login, logout } from '../../slice/Auth'
const Navbars = () => {
  const { role, isAuthenticated } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }
  return (
    <>
      <nav className='navbars_1'>

        <div className='navbar_1_logo'>
          <i className="fa-solid fa-house-chimney-medical fa-xl" style={{ color: "rgb(93, 214, 208)" }}></i>
          <h1 className='footer-medi'>Medislot</h1>
        </div>
        <div className='navbar_1_links'>
          <ul>
            <li>Home</li>
            <Link to="/findDoctors">
              <li>Find Doctor</li>
            </Link>

            {!isAuthenticated && (
              <>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </>
            )}

            {
              isAuthenticated && role === "user" && (
                <>
                  <li>
                    <Link to="/myAppoinment">
                      My Appointments
                    </Link>
                  </li>
                  <li>
                    <Link to="/patient/profile">
                      My Profile
                    </Link>
                  </li>
                </>
              )
            }

            {isAuthenticated && role === "Doctor" && (
              <>
                <li>
                  <Link to="/doctor/dashboard">
                    My Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/doctor/appointments">
                    My Appointments
                  </Link>
                </li>
                <li>
                  <Link to="/ManageSlots">
                    Manage Slots
                  </Link>
                </li>
                <li>
                  <Link to="/doctor/profile">
                    My Profile
                  </Link>
                </li>
              </>
            )}

            {isAuthenticated && role === "admin" && (
              <>
                <li>
                  <Link to="/admin/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/admin/users">
                    Manage Users
                  </Link>
                </li>
                <li>
                  <Link to="/admin/doctors">
                    Manage Doctors
                  </Link>
                </li>
                <li>
                  <Link to="/admin/appointments">
                    Appointments
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>


        <div className='navbar_1_buttons'>
          {!isAuthenticated ? (
            <>
              <Link to="/login">
                <button>Log In</button>
              </Link>

              <Link to="/register">
                <button>Register</button>
              </Link>
            </>
          ) : (
            <button onClick={handleLogout}>
              Logout
            </button>
          )}

        </div>

      </nav>
    </>
  )
}

export default Navbars