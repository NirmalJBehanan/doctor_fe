
import React from 'react'
import { Link } from 'react-router-dom'
import Navbars from '../homeComponets/Navbars'
import './Contact.css'

const Contact = () => {
    return (
        <>
            <Navbars />

            <div className="contact-page">

                <section className="contact-hero">
                    <h1>Contact Us</h1>
                    <p>
                        Have questions or need help?
                        We are here to help you.
                    </p>
                </section>

                <section className="contact-container">

                    <div className="contact-info">
                        <h2>Get in Touch</h2>

                        <p>
                            If you have questions about finding doctors,
                            booking appointments, or managing your account,
                            feel free to contact us.
                        </p>

                        <div className="contact-item">
                            <i className="fa-solid fa-envelope"></i>
                            <div>
                                <h4>Email</h4>
                                <a href="mailto:nirmalibehanan2025@mca.ajce.in?subject=MediSlot%20Support">
                                    support@medislot.health
                                </a>
                            </div>
                        </div>

                        <div className="contact-item">
                            <i className="fa-solid fa-clock"></i>
                            <div>
                                <h4>Availability</h4>
                                <p>Monday - Saturday</p>
                            </div>
                        </div>
                    </div>

                    <div className="contact-message">
                        <h2>Need Assistance?</h2>
                        <p>
                            Visit our doctor directory to find a suitable
                            specialist and book an appointment.
                        </p>

                        <Link to="/findDoctors" className="contact-button">
                            Find a Doctor
                        </Link>
                    </div>

                </section>

            </div>

            <footer className="contact-footer">
                <h3>MediSlot</h3>
                <p>Making doctor appointments easier.</p>
                <p>
                    © {new Date().getFullYear()} MediSlot. All rights reserved.
                </p>
            </footer>
        </>
    )
}

export default Contact
