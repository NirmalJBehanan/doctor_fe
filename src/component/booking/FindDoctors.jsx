import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./FindDoctors.css"
import Navbars from '../homeComponets/Navbars'
import { useFormik } from 'formik'
const FindDoctors = () => {
    const navigate = useNavigate()
    const dummy = [
        { id: 1, name: "Dr. John Doe", specialty: "Cardiologist", experience: "8 years", fee: "$100", location: "New York" },
        { id: 2, name: "Dr. Sarah Smith", specialty: "Dermatologist", experience: "5 years", fee: "$80", location: "Los Angeles" },
        { id: 3, name: "Dr. Michael Johnson", specialty: "Neurologist", experience: "12 years", fee: "$150", location: "Chicago" },
        { id: 4, name: "Dr. Emily Davis", specialty: "Pediatrician", experience: "6 years", fee: "$90", location: "Houston" },
        { id: 5, name: "Dr. Robert Wilson", specialty: "Cardiologist", experience: "10 years", fee: "$120", location: "Miami" },
        { id: 6, name: "Dr. fed rambo Wilson", specialty: "Cardiologist", experience: "10 years", fee: "$120", location: "Miami" },

    ]
    const [doctors, setdoctors] = useState(dummy)
    const [hassearched, setsearch] = useState(false)
    const formik = useFormik({
        initialValues: {
            name: ""
        },
        onSubmit: async (values) => {
            try {
                
                const word = values.name.trim().toLowerCase()
                const filter = dummy.filter((doc) => (
                    doc.name.trim().toLowerCase().includes(word) ||
                    doc.specialty.trim().toLowerCase().includes(word)
                ))
                
                setdoctors(filter)
                setsearch(true)
                formik.resetForm()


            } catch (error) {
                console.log(error)

            } finally {

            }
        }
    })
    return (
        <>
            <Navbars />
            <div className='findFirst'>
                <h1>Find Your Doctor</h1>
                <p>Search and book appointments with verified healthcare specialists.</p>
                <div className='form11'>
                    <form className='form12' onSubmit={formik.handleSubmit}>
                        <input className='in'
                            type='text'
                            placeholder='Search by doctor name, specialty, or condition...'
                            {...formik.getFieldProps("name")}
                        />
                        <button className='form12-btn' type='submit'>Search Doctors</button>
                    </form>
                </div>
            </div>
            <div>
            </div>
            {hassearched && (
                <div className="search-result">
                    <div className="card1">
                        <h2>Results ({doctors.length})</h2>

                        {doctors.length > 0 ? (
                            <div className="doctor-flex-container">
                                {doctors.map((doc) => (
                                    <div className="doctor-card-item" key={doc.id}>
                                        <h3>{doc.name}</h3>
                                        <p><strong>Specialty:</strong> {doc.specialty}</p>
                                        <p><strong>Location:</strong> {doc.location}</p>
                                        <p><strong>Fee:</strong> {doc.fee}</p>
                                        <button
                                            className='form22-btn'
                                            onClick={() => navigate(`/profileDoctor/${doc.id}`)}>
                                            see profile
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="no-results">No doctors found matching your search.</p>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default FindDoctors