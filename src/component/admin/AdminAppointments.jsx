
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbars from '../homeComponets/Navbars'
import './AdminAppointments.css'

const AdminAppointments = () => {

    const [appointments, setAppointments] = useState([])
    const [status, setStatus] = useState('')
    const [date, setDate] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // Fetch all appointments
    const fetchAppointments = async () => {
        try {
            setLoading(true)
            setError('')

            const token = localStorage.getItem("token")

            const response = await axios.get('/admin/appointments', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    status: status || undefined,
                    date: date || undefined
                }
            })

            setAppointments(response.data.appointments)

        } catch (error) {
            console.log("Get appointments error:", error)

            setError(
                error.response?.data?.message ||
                "Failed to fetch appointments"
            )

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAppointments()
    }, [status, date])

    // Clear filters
    const clearFilters = () => {
        setStatus('')
        setDate('')
    }

    return (
        <>
            <Navbars />

            <div className="admin-appointments">

                <div className="appointments-header">
                    <div>
                        <h2>Manage Appointments</h2>
                        <p>View and manage all patient appointments</p>
                    </div>

                    <div className="appointment-count">
                        Total: {appointments.length}
                    </div>
                </div>

                {/* Filters */}
                <div className="appointment-filters">

                    <div className="filter-group">
                        <label>Filter by Status</label>

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Filter by Date</label>

                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    <button
                        className="clear-filter-btn"
                        onClick={clearFilters}
                    >
                        Clear Filters
                    </button>

                </div>

                {/* Appointment List */}
                <div className="appointments-table-container">

                    {loading ? (
                        <p className="appointment-message">
                            Loading appointments...
                        </p>
                    ) : error ? (
                        <p className="appointment-error">
                            {error}
                        </p>
                    ) : appointments.length === 0 ? (
                        <p className="appointment-message">
                            No appointments found.
                        </p>
                    ) : (

                        <table className="appointments-table">

                            <thead>
                                <tr>
                                    <th>Patient</th>
                                    <th>Doctor</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Appointment Status</th>
                                    <th>Payment</th>
                                    <th>Refund</th>
                                </tr>
                            </thead>

                            <tbody>

                                {appointments.map((appointment) => (

                                    <tr key={appointment._id}>

                                        <td>
                                            <strong>
                                                {appointment.patientId?.name || 'N/A'}
                                            </strong>
                                            <small>
                                                {appointment.patientId?.email || ''}
                                            </small>
                                        </td>

                                        <td>
                                            <strong>
                                                {appointment.doctorId?.name || 'N/A'}
                                            </strong>
                                            <small>
                                                {appointment.doctorId?.email || ''}
                                            </small>
                                        </td>

                                        <td>
                                            {appointment.date ||
                                                appointment.slotId?.date ||
                                                'N/A'}
                                        </td>

                                        <td>
                                            {appointment.startTime ||
                                                appointment.slotId?.startTime ||
                                                'N/A'}
                                            {' - '}
                                            {appointment.endTime ||
                                                appointment.slotId?.endTime ||
                                                'N/A'}
                                        </td>

                                        <td>
                                            <span className={`status-badge ${appointment.status}`}>
                                                {appointment.status}
                                            </span>
                                        </td>

                                        <td>
                                            <span className={`payment-badge ${appointment.paymentId?.status || 'unpaid'}`}>
                                                {appointment.paymentId?.status || 'No payment'}
                                            </span>
                                        </td>

                                        <td>
                                            <span className={`refund-badge ${appointment.paymentId?.refundStatus || 'not_requested'}`}>
                                                {appointment.paymentId?.refundStatus || 'Not requested'}
                                            </span>
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    )}

                </div>

            </div>
        </>
    )
}

export default AdminAppointments
