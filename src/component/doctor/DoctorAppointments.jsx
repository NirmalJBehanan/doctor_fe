
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbars from "../homeComponets/Navbars";
import "./DoctorAppointments.css";

const DoctorAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);
    const [message, setMessage] = useState("");

    // Selected date
    const [selectedDate, setSelectedDate] = useState("");

    // Get doctor's appointments
    const fetchAppointments = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get("/doctorAppointments", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setAppointments(response.data.appointments || []);

        } catch (error) {
            console.log(error);
            setMessage("Error fetching appointments");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    // Filter appointments based on selected date
    const filteredAppointments = appointments.filter(
        (appointment) => appointment.date === selectedDate
    );

    // Update appointment status
    const handleStatusUpdate = async (slotId, appointmentStatus) => {
        try {
            setUpdatingId(slotId);
            setMessage("");

            const token = localStorage.getItem("token");

            const response = await axios.patch(
                `/updateAppointmentStatus/${slotId}`,
                {
                    appointmentStatus
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage(response.data.message);

            await fetchAppointments();

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Error updating appointment status"
            );
        } finally {
            setUpdatingId(null);
        }
    };

    return (
        <>
            <Navbars />

            <div className="doctor-appointments">

                <h2>Manage Appointments</h2>

                {message && (
                    <p className="appointment-message">{message}</p>
                )}

                {/* Date Selection */}
                <div className="date-filter">

                    <label htmlFor="appointmentDate">
                        Select Appointment Date:
                    </label>

                    <input
                        type="date"
                        id="appointmentDate"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />

                    <button
                        type="button"
                        onClick={() => setSelectedDate("")}
                    >
                        View All
                    </button>

                </div>


                {loading ? (
                    <p className="appointment-loading">
                        Loading appointments...
                    </p>
                ) : !selectedDate ? (
                    <p className="no-appointments">
                        Please select a date to view appointments.
                    </p>
                ) : filteredAppointments.length === 0 ? (
                    <p className="no-appointments">
                        No appointments found for {selectedDate}.
                    </p>
                ) : (
                    <div className="appointments-list">

                        {filteredAppointments.map((appointment) => (

                            <div
                                className="appointment-card"
                                key={appointment._id}
                            >

                                <h3>
                                    Patient: {appointment.patientId?.name || "Unknown"}
                                </h3>

                                <p>
                                    Email: {appointment.patientId?.email || "N/A"}
                                </p>

                                <p>Date: {appointment.date}</p>

                                <p>
                                    Time: {appointment.startTime} - {appointment.endTime}
                                </p>

                                <p>
                                    Status:{" "}
                                    <span className={`appointment-status ${appointment.appointmentStatus || "pending"}`}>
                                        {appointment.appointmentStatus || "pending"}
                                    </span>
                                </p>

                                <div className="appointment-actions">

                                    {appointment.appointmentStatus === "pending" && (
                                        <>
                                            <button
                                                className="confirm-btn"
                                                disabled={updatingId === appointment._id}
                                                onClick={() =>
                                                    handleStatusUpdate(
                                                        appointment._id,
                                                        "confirmed"
                                                    )
                                                }
                                            >
                                                Confirm
                                            </button>

                                            <button
                                                className="cancel-btn"
                                                disabled={updatingId === appointment._id}
                                                onClick={() =>
                                                    handleStatusUpdate(
                                                        appointment._id,
                                                        "cancelled"
                                                    )
                                                }
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    )}

                                    {appointment.appointmentStatus === "confirmed" && (
                                        <>
                                            <button
                                                className="complete-btn"
                                                disabled={updatingId === appointment._id}
                                                onClick={() =>
                                                    handleStatusUpdate(
                                                        appointment._id,
                                                        "completed"
                                                    )
                                                }
                                            >
                                                Complete
                                            </button>

                                            <button
                                                className="cancel-btn"
                                                disabled={updatingId === appointment._id}
                                                onClick={() =>
                                                    handleStatusUpdate(
                                                        appointment._id,
                                                        "cancelled"
                                                    )
                                                }
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    )}

                                </div>
                            </div>
                        ))}
                    </div>
                )}


            </div>
        </>
    );
};

export default DoctorAppointments;
