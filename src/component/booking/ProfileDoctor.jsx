
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProfileDoctor.css";
import Navbars from "../homeComponets/Navbars";

const ProfileDoctor = () => {
    const { id } = useParams();

    const [doctor, setDoctor] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [slots, setSlots] = useState([]);

    const [loadingDoctor, setLoadingDoctor] = useState(true);
    const [loadingSlots, setLoadingSlots] = useState(false);

    // Booking states
    const [bookingSlotId, setBookingSlotId] = useState(null);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    // Get today's date in YYYY-MM-DD format
    const today = (() => {
        const now = new Date();

        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    })();

    // Fetch selected doctor's profile
    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                setLoadingDoctor(true);

                const response = await axios.get("/getAllDoctors");

                const selectedDoctor = response.data.doctors.find(
                    (item) => item.doctorId?._id === id
                );

                setDoctor(selectedDoctor || null);

            } catch (error) {
                console.log("Error fetching doctor profile:", error);
            } finally {
                setLoadingDoctor(false);
            }
        };

        fetchDoctor();

    }, [id]);

    // Fetch available slots when patient selects a date
    useEffect(() => {
        if (!selectedDate) {
            setSlots([]);
            return;
        }

        const fetchSlots = async () => {
            try {
                setLoadingSlots(true);

                const response = await axios.get(
                    `/availableSlots/${id}?date=${selectedDate}`
                );

                setSlots(response.data.slots);

            } catch (error) {
                console.log("Error fetching available slots:", error);
                setSlots([]);
            } finally {
                setLoadingSlots(false);
            }
        };

        fetchSlots();

    }, [id, selectedDate]);

    // Book appointment

    const handleBooking = async (slotId) => {
        try {
            setBookingSlotId(slotId);
            setMessage("");
            setMessageType("");

            const token = localStorage.getItem("token");

            const headers = {
                Authorization: `Bearer ${token}`
            };

            // 1. Create Razorpay order through backend
            const response = await axios.post(
                `/createPaymentOrder/${slotId}`,
                {},
                { headers }
            );

            const {
                orderId,
                amount,
                currency,
                keyId
            } = response.data;

            // 2. Check whether Razorpay script is loaded
            if (!window.Razorpay) {
                throw new Error("Razorpay Checkout is not loaded");
            }

            // 3. Configure Razorpay Checkout
            const options = {
                key: keyId,
                amount: amount,
                currency: currency,
                name: "Doctor Appointment",
                description: "Consultation Fee",
                order_id: orderId,

                // 4. This function runs after successful payment
                handler: async function (paymentResponse) {
                    try {
                        // Send payment details to backend
                        const verifyResponse = await axios.post(
                            "/verifyPayment",
                            paymentResponse,
                            { headers }
                        );

                        // Remove booked slot from available slots
                        setSlots((previousSlots) =>
                            previousSlots.filter(
                                (slot) => slot._id !== slotId
                            )
                        );

                        setMessage(verifyResponse.data.message);
                        setMessageType("success");

                    } catch (error) {
                        console.log("Payment verification error:", error);

                        setMessage(
                            error.response?.data?.message ||
                            "Payment verification failed. Please contact support if money was deducted."
                        );

                        setMessageType("error");

                    } finally {
                        setBookingSlotId(null);
                    }
                },

                // 5. When patient closes checkout
                modal: {
                    ondismiss: async function () {
                        try {
                            await axios.patch(
                                `/cancelPendingPayment/${slotId}`,
                                {},
                                { headers }
                            );

                            setMessage("Payment cancelled. Slot is available again.");
                            setMessageType("error");

                            // Refresh available slots
                            const slotsResponse = await axios.get(
                                `/availableSlots/${id}?date=${selectedDate}`
                            );

                            setSlots(slotsResponse.data.slots);

                        } catch (error) {
                            console.log(
                                "Cancel pending payment error:",
                                error.response?.data || error
                            );

                            setMessage(
                                error.response?.data?.message ||
                                "Could not release the reserved slot"
                            );

                            setMessageType("error");
                        } finally {
                            setBookingSlotId(null);
                        }
                    }
                },
                theme: {
                    color: "#3399cc"
                }
            };

            // 6. Open Razorpay Checkout
            const razorpay = new window.Razorpay(options);

            // Handle payment failure
            razorpay.on("payment.failed", function (paymentError) {
                console.log("Payment failed:", paymentError);

                setMessage(
                    paymentError.error?.description ||
                    "Payment failed. Please try again."
                );

                setMessageType("error");
                setBookingSlotId(null);
            });

            razorpay.open();

        } catch (error) {
            console.log("Booking error:", error);

            setMessage(
                error.response?.data?.message ||
                error.message ||
                "Unable to start payment"
            );

            setMessageType("error");
            setBookingSlotId(null);
        }
    };


    if (loadingDoctor) {
        return (
            <div className="profile-container">
                <div className="profile-card">
                    <p className="info-message">
                        Loading doctor profile...
                    </p>
                </div>
            </div>
        );
    }

    if (!doctor) {
        return (
            <div className="profile-container">
                <div className="profile-card">
                    <p className="info-message">
                        Doctor profile not found.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbars />

            <div className="profile-container">

                <div className="profile-card">

                    {/* Doctor Profile Section */}
                    <div className="doctor-profile">

                        <div className="doctor-image">

                            {doctor.profileImage ? (
                                <img
                                    src={`https://doctor-be-gbwe.onrender.com/api/doctor-image/${doctor.profileImage}`}
                                    alt={doctor.doctorId.name}
                                />
                            ) : (
                                <div className="no-image">
                                    No Image
                                </div>
                            )}

                        </div>

                        <div className="doctor-details">

                            <h2>Dr. {doctor.doctorId.name}</h2>

                            <p className="specialization">
                                {doctor.specialization}
                            </p>

                            <p>
                                <strong>Qualification:</strong>{" "}
                                {doctor.qualification}
                            </p>

                            <p>
                                <strong>Experience:</strong>{" "}
                                {doctor.experience} years
                            </p>

                            <p>
                                <strong>Consultation Fee:</strong>{" "}
                                ₹{doctor.consultationFee}
                            </p>

                            <p className="doctor-description">
                                {doctor.description}
                            </p>

                        </div>
                    </div>

                    {/* Appointment Date Section */}
                    <div className="date-section">

                        <h3>Select an appointment date</h3>

                        <input
                            className="date-input"
                            type="date"
                            min={today}
                            value={selectedDate}
                            onChange={(e) => {
                                setSelectedDate(e.target.value);
                                setMessage("");
                            }}
                        />

                    </div>

                    {/* Available Slots Section */}
                    <div className="slots-section">

                        <h3>Available time slots</h3>

                        {!selectedDate && (
                            <p className="info-message">
                                Please select a date to see available slots.
                            </p>
                        )}

                        {loadingSlots && (
                            <p className="loading-message">
                                Loading available slots...
                            </p>
                        )}

                        {/* Booking response message */}
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

                        {!loadingSlots &&
                            selectedDate &&
                            slots.length === 0 && (
                                <p className="info-message">
                                    No available slots on this date.
                                </p>
                            )}

                        <div className="slots-container">

                            {!loadingSlots &&
                                slots.map((slot) => (

                                    <div
                                        className="slot-card"
                                        key={slot._id}
                                    >

                                        <span className="slot-time">
                                            {slot.startTime} - {slot.endTime}
                                        </span>

                                        <button
                                            className="book-btn"
                                            onClick={() =>
                                                handleBooking(slot._id)
                                            }
                                            disabled={bookingSlotId !== null}
                                        >
                                            {bookingSlotId === slot._id
                                                ? "Processing..."
                                                : "Book & Pay"}
                                        </button>

                                    </div>

                                ))}

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
};

export default ProfileDoctor;
