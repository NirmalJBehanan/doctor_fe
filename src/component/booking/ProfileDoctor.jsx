
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

            // Get JWT token from localStorage
            const token = localStorage.getItem("token");

            const response = await axios.post(
                `/bookAppointment/${slotId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Remove the booked slot from available slots
            setSlots((previousSlots) =>
                previousSlots.filter(
                    (slot) => slot._id !== slotId
                )
            );

            setMessage(response.data.message);
            setMessageType("success");

        } catch (error) {
            console.log("Booking error:", error);

            setMessage(
                error.response?.data?.message ||
                "Unable to book appointment"
            );

            setMessageType("error");

        } finally {
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
                                src={`http://localhost:3000/api/doctor-image/${doctor.profileImage}`}
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
                                            ? "Booking..."
                                            : "Book Appointment"}
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
