
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyAppointmentHistory.css";
import Navbars from "../homeComponets/Navbars";

const MyAppointmentHistory = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const fetchAppointmentHistory = async () => {
        try {
            setLoading(true);
            setMessage("");

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "/myAppointmentHistory",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Sort appointments by date and creation time,
            // with the newest records first.
            const sortedAppointments = [
                ...(response.data.appointments || [])
            ].sort((a, b) => {
                const dateA = new Date(
                    `${a.date}T${a.startTime || "00:00"}`
                );
                const dateB = new Date(
                    `${b.date}T${b.startTime || "00:00"}`
                );

                return dateB - dateA;
            });

            setAppointments(sortedAppointments);

        } catch (error) {
            console.log("Error fetching appointment history:", error);

            setMessage(
                error.response?.data?.message ||
                "Unable to fetch appointment history"
            );

            setMessageType("error");

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointmentHistory();
    }, []);

    // Format a date for display
    const formatDate = (date) => {
        if (!date) return "Not available";

        const parsedDate = new Date(`${date}T00:00:00`);

        if (Number.isNaN(parsedDate.getTime())) {
            return date;
        }

        return parsedDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    // Format cancellation date and time
    const formatDateTime = (date) => {
        if (!date) return "Not available";

        return new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    if (loading) {
        return (
            <>
                <Navbars />
                <div className="history-container">
                    <h2>Appointment History</h2>
                    <p>Loading appointment history...</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbars />

            <div className="history-container">

                <div className="history-heading">
                    <div>
                        <h2>Appointment History</h2>
                        <p>View all your previous and current appointments.</p>
                    </div>

                    <button
                        className="history-refresh-btn"
                        onClick={fetchAppointmentHistory}
                    >
                        Refresh
                    </button>
                </div>

                {message && (
                    <p className={`history-message ${messageType}`}>
                        {message}
                    </p>
                )}

                {appointments.length === 0 && !message && (
                    <div className="history-empty">
                        <h3>No appointment history found</h3>
                        <p>Your appointments will appear here after booking.</p>
                    </div>
                )}

                <div className="history-list">

                    {appointments.map((appointment) => {
                        const payment = appointment.paymentId;

                        const appointmentStatus =
                            appointment.status || "pending";

                        const paymentStatus =
                            payment?.status || "not available";

                        const refundStatus =
                            payment?.refundStatus || "not requested";

                        return (
                            <div
                                className="history-card"
                                key={appointment._id}
                            >

                                <div className="history-card-header">
                                    <h3>
                                        Dr. {appointment.doctorId?.name || "Doctor"}
                                    </h3>

                                    <span
                                        className={`history-status ${appointmentStatus}`}
                                    >
                                        {appointmentStatus}
                                    </span>
                                </div>

                                <div className="history-details">

                                    <div className="history-detail">
                                        <span>Date</span>
                                        <strong>
                                            {formatDate(appointment.date)}
                                        </strong>
                                    </div>

                                    <div className="history-detail">
                                        <span>Time</span>
                                        <strong>
                                            {appointment.startTime} - {appointment.endTime}
                                        </strong>
                                    </div>

                                    <div className="history-detail">
                                        <span>Appointment ID</span>
                                        <strong>{appointment._id}</strong>
                                    </div>

                                </div>

                                <div className="history-payment">
                                    <h4>Payment Details</h4>

                                    {payment ? (
                                        <>
                                            <div className="history-detail">
                                                <span>Amount</span>
                                                <strong>
                                                    ₹{payment.amount}
                                                </strong>
                                            </div>

                                            <div className="history-detail">
                                                <span>Payment Status</span>
                                                <strong className={`payment-status ${paymentStatus}`}>
                                                    {paymentStatus}
                                                </strong>
                                            </div>

                                            <div className="history-detail">
                                                <span>Refund Status</span>
                                                <strong className={`refund-status ${refundStatus}`}>
                                                    {refundStatus.replace("_", " ")}
                                                </strong>
                                            </div>

                                            {payment.razorpayRefundId && (
                                                <div className="history-detail">
                                                    <span>Razorpay Refund ID</span>
                                                    <strong>
                                                        {payment.razorpayRefundId}
                                                    </strong>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <p>No payment record available.</p>
                                    )}
                                </div>

                                {appointmentStatus === "cancelled" && (
                                    <div className="history-cancellation">
                                        <h4>Cancellation Details</h4>

                                        <div className="history-detail">
                                            <span>Cancelled By</span>
                                            <strong>
                                                {appointment.cancelledBy || "Not available"}
                                            </strong>
                                        </div>

                                        <div className="history-detail">
                                            <span>Cancelled At</span>
                                            <strong>
                                                {formatDateTime(appointment.cancelledAt)}
                                            </strong>
                                        </div>
                                    </div>
                                )}

                            </div>
                        );
                    })}

                </div>
            </div>
        </>
    );
};

export default MyAppointmentHistory;
