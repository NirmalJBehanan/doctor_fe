import React from 'react'
import derma from "../../assets/homeImages/dermatology.jpg"
import cardio from "../../assets/homeImages/cardio.jpg"
import general from "../../assets/homeImages/general.jpg"
import pedia from "../../assets/homeImages/pedia.jpg"
import neuro from "../../assets/homeImages/neuro.jpg"
import ortho from "../../assets/homeImages/ortho.jpg"

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
                            <button>Find a Doctor</button>
                            <button>How It Works</button>
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


            <div className='footer'>
                <div className='footer-1'>
                    <h2 className='footer-medi'>MediSlot</h2>
                    <p>MediSlot is a modern healthcare access platform connecting patients with trusted,
                         verified medical professionals nationwide.</p>
                </div>
                <div className='footer-1'>
                    <h3>Quick Links</h3>
                    <p>Find Doctor</p>
                    <p>Specialties</p>
                    <p>Hospitals & Clinics</p>
                    <p>Video Consultations</p>
                </div>
                <div className='footer-1'>
                    <h3>For Providers</h3>
                    <p>Join as a Doctor</p>
                    <p>Provider Portal</p>
                    <p>Practice Management</p>
                </div>
                <div className='footer-1'>
                    <h3>Company</h3>
                    <p>About Us</p>
                    <p>Contact & Support</p>
                    <p>Careers</p>
                    <p>Press</p>
                </div>
                <div className='footer-1'>
                    <h3>Contact</h3>
                    <p>support@medislot.health</p>
                    <p>+1(800)555-SLOT</p>
                    <p>100 Health Plaza, San Francisco, CA</p>
                </div>
            </div>
        </>
    )
}

export default Head