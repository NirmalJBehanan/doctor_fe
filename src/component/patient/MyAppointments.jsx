
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyAppointments.css";
import Navbars from "../homeComponets/Navbars";

const MyAppointments = () => {

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancellingId, setCancellingId] = useState(null);

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    // Get appointments of the logged-in patient
    const fetchAppointments = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "/myAppointments",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setAppointments(response.data.appointments);

        } catch (error) {
            console.log("Error fetching appointments:", error);

            setMessage(
                error.response?.data?.message ||
                "Unable to fetch appointments"
            );

            setMessageType("error");

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    // Cancel appointment
    const handleCancel = async (slotId) => {

        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this appointment?"
        );

        if (!confirmCancel) {
            return;
        }

        try {
            setCancellingId(slotId);
            setMessage("");
            setMessageType("");

            const token = localStorage.getItem("token");

            const response = await axios.patch(
                `/cancelAppointment/${slotId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Remove cancelled appointment from the screen
            setAppointments((previousAppointments) =>
                previousAppointments.filter(
                    (appointment) => appointment._id !== slotId
                )
            );

            setMessage(response.data.message);
            setMessageType("success");

        } catch (error) {
            console.log("Cancel appointment error:", error);

            setMessage(
                error.response?.data?.message ||
                "Unable to cancel appointment"
            );

            setMessageType("error");

        } finally {
            setCancellingId(null);
        }
    };

    if (loading) {
        return (
            <div className="appointments-container">
                <h2>My Appointments</h2>
                <p>Loading appointments...</p>
            </div>
        );
    }

    return (
        <>
            <Navbars />
            <div className="appointments-container">

                <h2>My Appointments</h2>

                {/* Response message */}
                {message && (
                    <p
                        className={
                            messageType === "success"
                                ? "success-message"
                                : "error-message"
                        }
                    >
                        {message}
                    </p>
                )}

                {/* No appointments */}
                {appointments.length === 0 && (
                    <p className="empty-message">
                        You don't have any booked appointments.
                    </p>
                )}

                {/* Appointment list */}
                <div className="appointments-list">

                    {appointments.map((appointment) => (

                        <div
                            className="appointment-card"
                            key={appointment._id}
                        >

                            <h3>
                                 {appointment.doctorId?.name || "Doctor"}
                            </h3>

                            <p>
                                <strong>Date:</strong>{" "}
                                {appointment.date}
                            </p>

                            <p>
                                <strong>Time:</strong>{" "}
                                {appointment.startTime} - {appointment.endTime}
                            </p>

                            <p>
                                <strong>Appointment Status:</strong>{" "}
                                <span className={`appointment-status ${appointment.appointmentStatus}`}>
                                    {appointment.appointmentStatus || "pending"}
                                </span>
                            </p>

                            {["pending", "confirmed"].includes(appointment.appointmentStatus) && (
                                <button
                                    className="cancel-btn"
                                    onClick={() => handleCancel(appointment._id)}
                                    disabled={cancellingId !== null}
                                >
                                    {cancellingId === appointment._id
                                        ? "Cancelling..."
                                        : "Cancel Appointment"}
                                </button>
                            )}
                        </div>

                    ))}

                </div>

            </div>
        </>
    );
};

export default MyAppointments;
