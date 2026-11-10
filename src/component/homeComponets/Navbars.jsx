import React, { useState } from 'react';
import "./Navbar.css";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../slice/Auth';

const Navbars = () => {

    const { role, isAuthenticated } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [menuOpen, setMenuOpen] = useState(false)

    const handleLogout = () => {
        dispatch(logout())
        setMenuOpen(false)
        navigate("/login")
    }

    const closeMenu = () => {
        setMenuOpen(false)
    }

    return (
        <nav className='navbars_1'>

            {/* Logo */}
            <div className='navbar_1_logo'>
                <i
                    className="fa-solid fa-house-chimney-medical fa-xl"
                    style={{ color: "rgb(93, 214, 208)" }}
                ></i>

                <h1 className='footer-medi'>Medislot</h1>
            </div>

            {/* Hamburger button */}
            <button
                className="navbar_menu_button"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
            >
                <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`}></i>
            </button>

            {/* Navigation links */}
            <div className={`navbar_1_links ${menuOpen ? "show-menu" : ""}`}>
                <ul>

                    <li>
                        <Link to="/" onClick={closeMenu}>Home</Link>
                    </li>

                    <li>
                        <Link to="/findDoctors" onClick={closeMenu}>
                            Find Doctor
                        </Link>
                    </li>

                    {!isAuthenticated && (
                        <>
                            <li>
                                <Link to="/about" onClick={closeMenu}>
                                    About Us
                                </Link>
                            </li>

                            <li>
                                <Link to="/contact" onClick={closeMenu}>
                                    Contact
                                </Link>
                            </li>
                        </>
                    )}

                    {isAuthenticated && role === "user" && (
                        <>
                            <li>
                                <Link to="/myAppoinment" onClick={closeMenu}>
                                    My Appointments
                                </Link>
                            </li>

                            <li>
                                <Link to="/myAppointmentHistory" onClick={closeMenu}>
                                    Appointment History
                                </Link>
                            </li>

                            <li>
                                <Link to="/patient/profile" onClick={closeMenu}>
                                    My Profile
                                </Link>
                            </li>
                        </>
                    )}

                    {isAuthenticated && role === "doctor" && (
                        <>
                            <li>
                                <Link to="/doctor/dashboard" onClick={closeMenu}>
                                    My Dashboard
                                </Link>
                            </li>

                            <li>
                                <Link to="/doctorAppointments" onClick={closeMenu}>
                                    My Appointments
                                </Link>
                            </li>

                            <li>
                                <Link to="/ManageSlots" onClick={closeMenu}>
                                    Manage Slots
                                </Link>
                            </li>

                            <li>
                                <Link to="/doctor/profile" onClick={closeMenu}>
                                    My Profile
                                </Link>
                            </li>
                        </>
                    )}

                    {isAuthenticated && role === "admin" && (
                        <>
                            <li>
                                <Link to="/admin/dashboard" onClick={closeMenu}>
                                    Dashboard
                                </Link>
                            </li>

                            <li>
                                <Link to="/admin/users" onClick={closeMenu}>
                                    Manage Users
                                </Link>
                            </li>

                            <li>
                                <Link to="/admin/doctors" onClick={closeMenu}>
                                    Manage Doctors
                                </Link>
                            </li>

                            <li>
                                <Link to="/admin/appointments" onClick={closeMenu}>
                                    Appointments
                                </Link>
                            </li>
                        </>
                    )}

                </ul>
            </div>

            {/* Login / Logout buttons */}
            <div className={`navbar_1_buttons ${menuOpen ? "show-buttons" : ""}`}>

                {!isAuthenticated ? (
                    <>
                        <Link to="/login" onClick={closeMenu}>
                            <button>Log In</button>
                        </Link>

                        <Link to="/register" onClick={closeMenu}>
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
    )
}

export default Navbars