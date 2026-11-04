
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "./FindDoctors.css"
import Navbars from '../homeComponets/Navbars'
import { useFormik } from 'formik'

const FindDoctors = () => {

    const navigate = useNavigate()

    const [doctors, setdoctors] = useState([])
    const [filteredDoctors, setFilteredDoctors] = useState([])
    const [hassearched, setsearch] = useState(false)

    // Fetch all doctors from backend
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get("/getAllDoctors");

                setdoctors(response.data.doctors);
                setFilteredDoctors(response.data.doctors);

            } catch (error) {
                console.log("Error fetching doctors:", error);
            }
        };

        fetchDoctors();
    }, []);

    // Search doctors
    const formik = useFormik({
        initialValues: {
            name: ""
        },

        onSubmit: async (values) => {
            try {

                const word = values.name.trim().toLowerCase()

                const filter = doctors.filter((doc) => (
                    doc.doctorId.name.toLowerCase().includes(word) ||
                    doc.specialization.toLowerCase().includes(word)
                ))

                setFilteredDoctors(filter)
                setsearch(true)

            } catch (error) {
                console.log(error)
            }
        }
    })

    return (
        <>
            <Navbars />

            <div className='findFirst'>
                <h1>Find Your Doctor</h1>

                <p>
                    Search and book appointments with verified healthcare specialists.
                </p>

                <div className='form11'>
                    <form className='form12' onSubmit={formik.handleSubmit}>

                        <input
                            className='in'
                            type='text'
                            placeholder='Search by doctor name or specialty...'
                            {...formik.getFieldProps("name")}
                        />

                        <button className='form12-btn' type='submit'>
                            Search Doctors
                        </button>

                    </form>
                </div>
            </div>

            {hassearched && (
                <div className="search-result">

                    <div className="card1">

                        <h2>Results ({filteredDoctors.length})</h2>

                        {filteredDoctors.length > 0 ? (

                            <div className="doctor-flex-container">

                                {filteredDoctors.map((doc) => (

                                    <div className="doctor-card-item" key={doc._id}>

                                        <h3>{doc.doctorId.name}</h3>

                                        <p>
                                            <strong>Specialty:</strong> {doc.specialization}
                                        </p>

                                        <p>
                                            <strong>Experience:</strong> {doc.experience} years
                                        </p>

                                        <p>
                                            <strong>Fee:</strong> ₹{doc.consultationFee}
                                        </p>

                                        <button
                                            className="form22-btn"
                                            onClick={() => navigate(`/profileDoctor/${doc.doctorId._id}`)}
                                        >
                                            See Profile
                                        </button>

                                    </div>

                                ))}

                            </div>

                        ) : (

                            <p className="no-results">
                                No doctors found matching your search.
                            </p>

                        )}

                    </div>

                </div>
            )}

        </>
    )
}

export default FindDoctors
