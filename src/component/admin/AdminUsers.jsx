import React, { useEffect, useState } from 'react'
import Navbars from '../homeComponets/Navbars'
import axios from 'axios'
import './AdminUsers.css'

const AdminUsers = () => {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    // Get all patients
    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token")

            const response = await axios.get("/admin/users", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setUsers(response.data.users)

        } catch (error) {
            console.log(error)
            setError(
                error.response?.data?.message || "Failed to fetch patients"
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    // Activate or deactivate patient
    const handleStatusChange = async (userId, currentStatus) => {
        try {
            const token = localStorage.getItem("token")

            const response = await axios.patch(
                `/admin/users/${userId}/status`,
                {
                    isActive: !currentStatus
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            // Update the patient status in frontend
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === userId
                        ? { ...user, isActive: response.data.user.isActive }
                        : user
                )
            )

        } catch (error) {
            console.log(error)
            alert(
                error.response?.data?.message || "Failed to update patient status"
            )
        }
    }

    return (
        <>
            <Navbars />

            <div className="admin-users-container">

                <div className="admin-users-header">
                    <div>
                        <h2>Patient Management</h2>
                        <p>View and manage registered patients</p>
                    </div>

                    <div className="total-patients">
                        Total Patients: {users.length}
                    </div>
                </div>

                {loading ? (
                    <p className="users-message">Loading patients...</p>
                ) : error ? (
                    <p className="users-error">{error}</p>
                ) : users.length === 0 ? (
                    <p className="users-message">No patients found.</p>
                ) : (

                    <div className="users-table-container">

                        <table className="users-table">

                            <thead>
                                <tr>
                                    <th>Sl No.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Joined Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>

                                {users.map((user, index) => (

                                    <tr key={user._id}>

                                        <td>{index + 1}</td>

                                        <td>{user.name}</td>

                                        <td>{user.email}</td>

                                        <td>
                                            {user.createdAt
                                                ? new Date(user.createdAt).toLocaleDateString()
                                                : "N/A"}
                                        </td>

                                        <td>
                                            <span
                                                className={
                                                    user.isActive
                                                        ? "user-status active"
                                                        : "user-status inactive"
                                                }
                                            >
                                                {user.isActive ? "Active" : "Inactive"}
                                            </span>
                                        </td>

                                        <td>
                                            <button
                                                className={
                                                    user.isActive
                                                        ? "user-action-btn deactivate"
                                                        : "user-action-btn activate"
                                                }
                                                onClick={() =>
                                                    handleStatusChange(
                                                        user._id,
                                                        user.isActive
                                                    )
                                                }
                                            >
                                                {user.isActive ? "Deactivate" : "Activate"}
                                            </button>
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>
        </>
    )
}

export default AdminUsers