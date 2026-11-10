import React from 'react'
import derma from "../../assets/homeImages/dermatology.jpg"
import cardio from "../../assets/homeImages/cardio.jpg"
import general from "../../assets/homeImages/general.jpg"
import pedia from "../../assets/homeImages/pedia.jpg"
import neuro from "../../assets/homeImages/neuro.jpg"
import ortho from "../../assets/homeImages/ortho.jpg"
import "../../App.css"
import { Link } from 'react-router-dom'
const Head = () => {
    return (
        <>
            <div className='main-head'>
                <div className='main-center'>
                    <div className='main-center1'>
                        <h2>Quality HealthCare,</h2>
                        <h2>Just a Click Away .</h2>
                        <p>Discover trusted doctors, book appointments at your convenience,<br></br> and manage your healthcare in one seamless, HIPAA-compliant<br></br> space.</p>
                        <div className='main-center1-buttons'>
                            <Link to="/findDoctors"><button>Find a Doctor</button></Link>
                            <Link><button>How It Works</button></Link>
                        </div>
                        <div className='main-center1-three'>
                            <div>
                                <h4>15,000+</h4>
                                <p>verified Doctors</p>
                            </div>
                            <div>
                                <h4>99.2%</h4>
                                <p>Positive Reviews</p>
                            </div>
                            <div>
                                <h4>Instant</h4>
                                <p>Confirmed Slots</p>
                            </div>
                        </div>
                    </div>
                    <div className='main-center2'>
                        <img src='/pic1.png' />
                    </div>
                </div>
            </div>


            {/* middle section */}

            <div className='middle'>
                <div className='middle-center'>
                    <div className='middle-first'>
                        <h2>Explore by Specialization</h2>
                        <p>Find experienced specialists across verified clinical disciplines ready for immediate consultations.</p>
                    </div>
                    <div className="middle-second">

                        <div className="card" style={{ width: "21rem" }}>
                            <img src={derma} className="card-img-top" alt="Doctor" />

                            <div className="card-body">
                                <h4>Dermatologist</h4>
                                <p className="card-text">
                                    Clinical skin assessments, laser therapies,
                                    eczema management, and cosmetic dermatology.
                                </p>
                            </div>
                        </div>

                        <div className="card" style={{ width: "21rem" }}>
                            <img src={cardio} className="card-img-top" alt="Doctor" />

                            <div className="card-body">
                                <h4>Cardiologist</h4>
                                <p className="card-text">
                                    Cardiovascular disease management, ECG evaluation, hypertension, and heart surgery care.
                                </p>
                            </div>
                        </div>

                        <div className="card" style={{ width: "21rem" }}>
                            <img src={general} className="card-img-top" alt="Doctor" />

                            <div className="card-body">
                                <h4>General Physician</h4>
                                <p className="card-text">
                                    Preventative checkups, acute illness care, diagnostics, and routine health screenings.
                                </p>
                            </div>
                        </div>

                        <div className="card" style={{ width: "21rem" }}>
                            <img src={pedia} className="card-img-top" alt="Doctor" />

                            <div className="card-body">
                                <h4>Pediatrician</h4>
                                <p className="card-text">
                                    Child wellness monitoring, growth milestones, vaccinations, and adolescent medicine.
                                </p>
                            </div>
                        </div>

                        <div className="card" style={{ width: "21rem" }}>
                            <img src={neuro} className="card-img-top" alt="Doctor" />

                            <div className="card-body">
                                <h4>Neurologist</h4>
                                <p className="card-text">
                                    Central nervous system disorders, migraines, neuromuscular assessments, and memory care.
                                </p>
                            </div>
                        </div>

                        <div className="card" style={{ width: "21rem" }}>
                            <img src={ortho} className="card-img-top" alt="Doctor" />

                            <div className="card-body">
                                <h4>Orthopedic Specialist</h4>
                                <p className="card-text">
                                    Bone fractures, joint replacements, sports injuries, and spinal rehabilitation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <footer className="footer">
                <div className="footer-container">

                    {/* Brand */}
                    <div className="footer-brand">
                        <h2 className="footer-medi">MediSlot</h2>
                        <p>
                            Your healthcare, made simple.
                            Find trusted doctors and book appointments easily.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-links">
                        <h3>Quick Links</h3>
                        <Link to="/">Home</Link>
                        <Link to="/findDoctors">Find Doctors</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>

                    {/* Contact */}
                    <div className="footer-contact">
                        <h3>Contact Us</h3>
                        <a href="mailto:nirmalbehanan2025@mca.ajce.in">
                            support@medislot.health
                        </a>
                    </div>

                </div>

                <div className="footer-bottom">
                    <p>©MediSlot. All rights reserved.</p>
                </div>
            </footer>


        </>
    )
}

export default Head