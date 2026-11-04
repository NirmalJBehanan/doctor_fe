
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./ManageSlots.css";
import Navbars from "../homeComponets/Navbars";

const ManageSlots = () => {

    const [slots, setSlots] = useState([]);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [deletingId, setDeletingId] = useState(null);
    const [loading, setLoading] = useState(false);

    // Store the ID of the slot being edited
    const [editingSlotId, setEditingSlotId] = useState(null);

    // Get today's date
    const getTodayDate = () => {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    // Selected date for displaying slots
    const [selectedDate, setSelectedDate] = useState(getTodayDate());

    // Get token
    const token = localStorage.getItem("token");

    // Axios headers
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    // Fetch slots for selected date
    const fetchSlots = async (date) => {
        try {
            setLoading(true);

            const response = await axios.get(
                `/getSlots?date=${date}`,
                config
            );

            setSlots(response.data.slots);

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Unable to fetch slots"
            );

            setMessageType("error");

        } finally {
            setLoading(false);
        }
    };

    // Fetch slots whenever selected date changes
    useEffect(() => {
        if (selectedDate) {
            fetchSlots(selectedDate);
        }
    }, [selectedDate]);

    // Formik form
    const formik = useFormik({

        initialValues: {
            date: "",
            startTime: "",
            endTime: ""
        },

        // Form validation
        validationSchema: Yup.object({

            date: Yup.string()
                .required("Please select a date"),

            startTime: Yup.string()
                .required("Please select start time"),

            endTime: Yup.string()
                .required("Please select end time")
                .test(
                    "time-check",
                    "End time must be greater than start time",
                    function (value) {

                        const { startTime } = this.parent;

                        if (!startTime || !value) {
                            return true;
                        }

                        return value > startTime;
                    }
                )

        }),

        // Submit form
        onSubmit: async (values, { resetForm }) => {

            try {
                setMessage("");
                setMessageType("");

                let response;

                // Check whether doctor is updating or adding
                if (editingSlotId) {

                    // UPDATE SLOT
                    response = await axios.put(
                        `/updateSlot/${editingSlotId}`,
                        values,
                        config
                    );

                    setMessage(response.data.message);
                    setMessageType("success");

                    setEditingSlotId(null);

                } else {

                    // CREATE SLOT
                    response = await axios.post(
                        "/createSlot",
                        values,
                        config
                    );

                    setMessage(response.data.message);
                    setMessageType("success");
                }

                // Clear form
                resetForm();

                // Refresh slots
                if (selectedDate === values.date) {
                    await fetchSlots(values.date);
                } else {
                    setSelectedDate(values.date);
                }

            } catch (error) {
                setMessage(
                    error.response?.data?.message ||
                    "Unable to save slot"
                );

                setMessageType("error");
            }
        }
    });

    // Edit slot
    const handleEdit = (slot) => {

        // Store slot ID
        setEditingSlotId(slot._id);

        // Fill form with existing slot details
        formik.setValues({
            date: slot.date,
            startTime: slot.startTime,
            endTime: slot.endTime
        });

        // Clear previous message
        setMessage("");
        setMessageType("");

        // Scroll to form
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // Cancel editing
    const handleCancelEdit = () => {

        setEditingSlotId(null);

        formik.resetForm();

        setMessage("");
        setMessageType("");
    };

    // Delete slot
    const handleDelete = async (slotId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this slot?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            setDeletingId(slotId);
            setMessage("");

            const response = await axios.delete(
                `/deleteSlot/${slotId}`,
                config
            );

            setMessage(response.data.message);
            setMessageType("success");

            // Remove deleted slot from frontend
            setSlots((previousSlots) =>
                previousSlots.filter(
                    (slot) => slot._id !== slotId
                )
            );

            // If the deleted slot was being edited, clear the form
            if (editingSlotId === slotId) {
                handleCancelEdit();
            }

        } catch (error) {
            setMessage(
                error.response?.data?.message ||
                "Unable to delete slot"
            );

            setMessageType("error");

        } finally {
            setDeletingId(null);
        }
    };

    return (

        <>
           <Navbars />
            <div className="manage-slots-container">

                <h2>Manage Appointment Slots</h2>

                {/* Success or error message */}
                {message && (
                    <p className={
                        messageType === "success"
                            ? "success-message"
                            : "error-message"
                    }>
                        {message}
                    </p>
                )}

                {/* Add or Update Slot Form */}
                <form
                    className="slot-form"
                    onSubmit={formik.handleSubmit}
                >

                    <div className="form-group">

                        <label>Date</label>

                        <input
                            type="date"
                            name="date"
                            value={formik.values.date}
                            min={getTodayDate()}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {formik.touched.date &&
                            formik.errors.date && (
                                <p className="error-message">
                                    {formik.errors.date}
                                </p>
                            )}

                    </div>

                    <div className="form-group">

                        <label>Start Time</label>

                        <input
                            type="time"
                            name="startTime"
                            value={formik.values.startTime}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {formik.touched.startTime &&
                            formik.errors.startTime && (
                                <p className="error-message">
                                    {formik.errors.startTime}
                                </p>
                            )}

                    </div>

                    <div className="form-group">

                        <label>End Time</label>

                        <input
                            type="time"
                            name="endTime"
                            value={formik.values.endTime}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {formik.touched.endTime &&
                            formik.errors.endTime && (
                                <p className="error-message">
                                    {formik.errors.endTime}
                                </p>
                            )}

                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="submit-button"
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting
                            ? "Please wait..."
                            : editingSlotId
                                ? "Update Slot"
                                : "Add Slot"}
                    </button>

                    {/* Cancel Editing Button */}
                    {editingSlotId && (
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={handleCancelEdit}
                        >
                            Cancel Editing
                        </button>
                    )}

                </form>

                {/* Display Slots */}
                <div className="my-slots-section">

                    <h3>My Appointment Slots</h3>

                    {/* Date Filter */}
                    <div className="date-filter">

                        <label>Select Date</label>

                        <input
                            type="date"
                            value={selectedDate}
                            min={getTodayDate()}
                            onChange={(e) =>
                                setSelectedDate(e.target.value)
                            }
                        />

                    </div>

                    {/* Loading */}
                    {loading ? (

                        <p>Loading slots...</p>

                    ) : slots.length === 0 ? (

                        <p>No slots available for this date.</p>

                    ) : (

                        <div className="slots-list">

                            {slots.map((slot) => (

                                <div
                                    className="slot-card"
                                    key={slot._id}
                                >

                                    <p>
                                        <strong>Date:</strong>{" "}
                                        {slot.date}
                                    </p>

                                    <p>
                                        <strong>Time:</strong>{" "}
                                        {slot.startTime} - {slot.endTime}
                                    </p>

                                    <p>
                                        <strong>Status:</strong>{" "}

                                        <span className={
                                            String(slot.status || "").toLowerCase() === "available"
                                                ? "available-status"
                                                : "booked-status"
                                        }>
                                            {slot.status}
                                        </span>

                                    </p>

                                    {/* Edit and Delete buttons */}
                                    {String(slot.status || "").toLowerCase() !== "booked" && (

                                        <div className="slot-actions">

                                            <button
                                                type="button"
                                                className="edit-button"
                                                onClick={() =>
                                                    handleEdit(slot)
                                                }
                                            >
                                                Edit Slot
                                            </button>

                                            <button
                                                type="button"
                                                className="delete-button"
                                                onClick={() =>
                                                    handleDelete(slot._id)
                                                }
                                                disabled={deletingId !== null}
                                            >
                                                {deletingId === slot._id
                                                    ? "Deleting..."
                                                    : "Delete Slot"}
                                            </button>

                                        </div>

                                    )}

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>
        </>

    );
};

export default ManageSlots;
