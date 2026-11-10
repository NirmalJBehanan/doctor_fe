import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbars from '../homeComponets/Navbars'
import './AdminDoctors.css'

const AdminDoctors = () => {

    const [doctors, setDoctors] = useState([])
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")

    // Create doctor form
    const [doctorData, setDoctorData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [showCreateForm, setShowCreateForm] = useState(false)

    // Edit doctor form
    const [editingDoctor, setEditingDoctor] = useState(null)

    const [editData, setEditData] = useState({
        name: "",
        description: "",
        specialization: "",
        qualification: "",
        experience: "",
        consultationFee: ""
    })

    const token = localStorage.getItem("token")

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    // Fetch all doctors
    const fetchDoctors = async () => {
        try {
            setLoading(true)

            const response = await axios.get(
                "/admin/doctors",
                config
            )

            setDoctors(response.data.doctors)

        } catch (error) {
            console.log(error)
            setError(
                error.response?.data?.message || "Failed to fetch doctors"
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDoctors()
    }, [])

    // Handle create doctor input
    const handleCreateChange = (e) => {
        setDoctorData({
            ...doctorData,
            [e.target.name]: e.target.value
        })
    }

    // Create doctor account
    const handleCreateDoctor = async (e) => {
        e.preventDefault()

        try {
            setMessage("")
            setError("")

            const response = await axios.post(
                "/admin/doctors",
                doctorData,
                config
            )

            setMessage(response.data.message)

            setDoctorData({
                name: "",
                email: "",
                password: ""
            })

            setShowCreateForm(false)

            fetchDoctors()

        } catch (error) {
            console.log(error)

            setError(
                error.response?.data?.message || "Failed to create doctor"
            )
        }
    }

    // Activate or deactivate doctor
    const handleDoctorStatus = async (doctorId, currentStatus) => {
        try {
            setMessage("")
            setError("")

            const response = await axios.patch(
                `/admin/doctors/${doctorId}/status`,
                {
                    isActive: !currentStatus
                },
                config
            )

            setMessage(response.data.message)

            fetchDoctors()

        } catch (error) {
            console.log(error)

            setError(
                error.response?.data?.message || "Failed to update doctor status"
            )
        }
    }

    // Open edit form
    const handleEditClick = (item) => {

        if (!item.profile) {
            setError("This doctor has not created a professional profile yet.")
            return
        }

        setError("")
        setMessage("")

        setEditingDoctor(item.doctor._id)

        setEditData({
            name: item.doctor.name || "",
            description: item.profile.description || "",
            specialization: item.profile.specialization || "",
            qualification: item.profile.qualification || "",
            experience: item.profile.experience ?? "",
            consultationFee: item.profile.consultationFee ?? ""
        })
    }

    // Handle edit input
    const handleEditChange = (e) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value
        })
    }

    // Update doctor profile
    const handleUpdateDoctor = async (e) => {
        e.preventDefault()

        try {
            setMessage("")
            setError("")

            const updatedData = {
                ...editData,
                experience: Number(editData.experience),
                consultationFee: Number(editData.consultationFee)
            }

            const response = await axios.put(
                `/admin/doctors/${editingDoctor}`,
                updatedData,
                config
            )

            setMessage(response.data.message)

            setEditingDoctor(null)

            fetchDoctors()

        } catch (error) {
            console.log(error)

            setError(
                error.response?.data?.message || "Failed to update doctor"
            )
        }
    }

    return (
        <>
            <Navbars />

            <div className="admin-doctors-container">

                <div className="admin-doctors-header">
                    <div>
                        <h2>Manage Doctors</h2>
                        <p>View and manage doctor accounts</p>
                    </div>

                    <button
                        className="add-doctor-btn"
                        onClick={() => {
                            setShowCreateForm(!showCreateForm)
                            setEditingDoctor(null)
                            setError("")
                            setMessage("")
                        }}
                    >
                        {showCreateForm ? "Close Form" : "+ Add Doctor"}
                    </button>
                </div>

                {message && (
                    <div className="admin-success-message">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="admin-error-message">
                        {error}
                    </div>
                )}

                {/* Create Doctor Form */}

                {showCreateForm && (
                    <div className="doctor-form-card">

                        <h3>Create Doctor Account</h3>

                        <form onSubmit={handleCreateDoctor}>

                            <div className="doctor-form-grid">

                                <div className="doctor-form-group">
                                    <label>Doctor Name</label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={doctorData.name}
                                        onChange={handleCreateChange}
                                        placeholder="Enter doctor name"
                                        required
                                    />
                                </div>

                                <div className="doctor-form-group">
                                    <label>Email</label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={doctorData.email}
                                        onChange={handleCreateChange}
                                        placeholder="Enter email"
                                        required
                                    />
                                </div>

                                <div className="doctor-form-group">
                                    <label>Password</label>

                                    <input
                                        type="password"
                                        name="password"
                                        value={doctorData.password}
                                        onChange={handleCreateChange}
                                        placeholder="Enter password"
                                        required
                                    />
                                </div>

                            </div>

                            <button
                                type="submit"
                                className="save-doctor-btn"
                            >
                                Create Doctor
                            </button>

                        </form>

                    </div>
                )}

                {/* Edit Doctor Form */}

                {editingDoctor && (
                    <div className="doctor-form-card">

                        <h3>Edit Doctor Profile</h3>

                        <form onSubmit={handleUpdateDoctor}>

                            <div className="doctor-form-grid">

                                <div className="doctor-form-group">
                                    <label>Doctor Name</label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={editData.name}
                                        onChange={handleEditChange}
                                        required
                                    />
                                </div>

                                <div className="doctor-form-group">
                                    <label>Specialization</label>

                                    <input
                                        type="text"
                                        name="specialization"
                                        value={editData.specialization}
                                        onChange={handleEditChange}
                                    />
                                </div>

                                <div className="doctor-form-group">
                                    <label>Qualification</label>

                                    <input
                                        type="text"
                                        name="qualification"
                                        value={editData.qualification}
                                        onChange={handleEditChange}
                                    />
                                </div>

                                <div className="doctor-form-group">
                                    <label>Experience (Years)</label>

                                    <input
                                        type="number"
                                        name="experience"
                                        min="0"
                                        value={editData.experience}
                                        onChange={handleEditChange}
                                    />
                                </div>

                                <div className="doctor-form-group">
                                    <label>Consultation Fee (₹)</label>

                                    <input
                                        type="number"
                                        name="consultationFee"
                                        min="0"
                                        value={editData.consultationFee}
                                        onChange={handleEditChange}
                                    />
                                </div>

                                <div className="doctor-form-group full-width">
                                    <label>Description</label>

                                    <textarea
                                        name="description"
                                        value={editData.description}
                                        onChange={handleEditChange}
                                        rows="4"
                                    />
                                </div>

                            </div>

                            <div className="doctor-form-actions">

                                <button
                                    type="submit"
                                    className="save-doctor-btn"
                                >
                                    Update Doctor
                                </button>

                                <button
                                    type="button"
                                    className="cancel-doctor-btn"
                                    onClick={() => setEditingDoctor(null)}
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>

                    </div>
                )}

                {/* Doctors List */}

                <div className="doctors-list-section">

                    <h3>All Doctors ({doctors.length})</h3>

                    {loading ? (
                        <p className="doctor-loading">Loading doctors...</p>
                    ) : doctors.length === 0 ? (
                        <p className="doctor-empty">No doctors found.</p>
                    ) : (

                        <div className="doctors-table-wrapper">

                            <table className="doctors-table">

                                <thead>
                                    <tr>
                                        <th>Doctor</th>
                                        <th>Specialization</th>
                                        <th>Qualification</th>
                                        <th>Experience</th>
                                        <th>Fee</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {doctors.map((item) => (

                                        <tr key={item.doctor._id}>

                                            <td>
                                                <div className="doctor-name">
                                                    <strong>
                                                        {item.doctor.name}
                                                    </strong>

                                                    <span>
                                                        {item.doctor.email}
                                                    </span>
                                                </div>
                                            </td>

                                            <td>
                                                {item.profile?.specialization || "Not added"}
                                            </td>

                                            <td>
                                                {item.profile?.qualification || "Not added"}
                                            </td>

                                            <td>
                                                {item.profile
                                                    ? `${item.profile.experience} years`
                                                    : "Not added"}
                                            </td>

                                            <td>
                                                {item.profile
                                                    ? `₹${item.profile.consultationFee}`
                                                    : "Not added"}
                                            </td>

                                            <td>
                                                <span
                                                    className={
                                                        item.doctor.isActive
                                                            ? "doctor-status active"
                                                            : "doctor-status inactive"
                                                    }
                                                >
                                                    {item.doctor.isActive
                                                        ? "Active"
                                                        : "Inactive"}
                                                </span>
                                            </td>

                                            <td>
                                                <div className="doctor-action-buttons">

                                                    <button
                                                        className="edit-doctor-btn"
                                                        onClick={() => handleEditClick(item)}
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        className={
                                                            item.doctor.isActive
                                                                ? "deactivate-doctor-btn"
                                                                : "activate-doctor-btn"
                                                        }
                                                        onClick={() =>
                                                            handleDoctorStatus(
                                                                item.doctor._id,
                                                                item.doctor.isActive
                                                            )
                                                        }
                                                    >
                                                        {item.doctor.isActive
                                                            ? "Deactivate"
                                                            : "Activate"}
                                                    </button>

                                                </div>
                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>
                    )}

                </div>

            </div>
        </>
    )
}

export default AdminDoctors