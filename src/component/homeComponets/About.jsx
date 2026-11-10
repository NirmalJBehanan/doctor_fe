
import React from 'react'
import { Link } from 'react-router-dom'
import Navbars from '../homeComponets/Navbars'
import './About.css'

const About = () => {
    return (
        <>
            <Navbars />

            <div className="about-page">

                {/* Hero Section */}
                <section className="about-hero">
                    <h1>About MediSlot</h1>
                    <p>
                        Making healthcare access simple, convenient,
                        and easier for everyone.
                    </p>
                    <Link to="/findDoctors" className="about-button">
                        Find a Doctor
                    </Link>
                </section>

                {/* About Section */}
                <section className="about-content">
                    <div className="about-text">
                        <h2>Who We Are</h2>
                        <p>
                            MediSlot is a doctor appointment booking
                            platform designed to connect patients with
                            doctors through a simple online experience.
                        </p>
                        <p>
                            Patients can explore doctors, check available
                            appointment slots, book appointments, and
                            manage their bookings from one place.
                        </p>
                    </div>

                    <div className="about-image">
                        <img src="/pic1.png" alt="Healthcare services" />
                    </div>
                </section>

                {/* Features Section */}
                <section className="about-features">
                    <h2>What We Offer</h2>

                    <div className="about-cards">

                        <div className="about-card">
                            <i className="fa-solid fa-user-doctor"></i>
                            <h3>Find Doctors</h3>
                            <p>
                                Explore doctors from different medical
                                specializations.
                            </p>
                        </div>

                        <div className="about-card">
                            <i className="fa-solid fa-calendar-check"></i>
                            <h3>Easy Booking</h3>
                            <p>
                                Check available time slots and book
                                appointments conveniently.
                            </p>
                        </div>

                        <div className="about-card">
                            <i className="fa-solid fa-clipboard-list"></i>
                            <h3>Manage Appointments</h3>
                            <p>
                                View your appointments and manage your
                                booking history.
                            </p>
                        </div>

                    </div>
                </section>

                {/* Bottom Section */}
                <section className="about-bottom">
                    <h2>Your Healthcare Journey Starts Here</h2>
                    <p>
                        Take the next step towards convenient appointment
                        management with MediSlot.
                    </p>
                    <Link to="/findDoctors" className="about-button">
                        Explore Doctors
                    </Link>
                </section>

            </div>

            <footer className="about-footer">
                <h3>MediSlot</h3>
                <p>Making doctor appointments easier.</p>
                <p>© {new Date().getFullYear()} MediSlot. All rights reserved.</p>
            </footer>
        </>
    )
}

export default About
