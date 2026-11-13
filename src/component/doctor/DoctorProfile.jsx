
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import "./DoctorProfile.css";
import Navbars from "../homeComponets/Navbars";

const DoctorProfile = () => {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [message, setMessage] = useState("");
    const [image, setImage] = useState(null);

    const token = localStorage.getItem("token");

    // Fetch doctor profile
    const getProfile = async () => {
        try {
            const response = await axios.get("/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setProfile(response.data.doctorProfile);

        } catch (error) {
            console.log(error);
            setMessage("Unable to fetch profile");

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    // Form validation
    const validationSchema = yup.object({
        description: yup.string().required("Description is required"),
        specialization: yup.string().required("Specialization is required"),
        qualification: yup.string().required("Qualification is required"),
        experience: yup.number().min(0).required("Experience is required"),
        consultationFee: yup.number().min(1).required("Fee is required")
    });

    // Formik
    const formik = useFormik({
        enableReinitialize: true,

        initialValues: {
            description: profile?.description || "",
            specialization: profile?.specialization || "",
            qualification: profile?.qualification || "",
            experience: profile?.experience ?? "",
            consultationFee: profile?.consultationFee ?? ""
        },

        validationSchema,

        onSubmit: async (values) => {
            try {
                const formData = new FormData();

                Object.keys(values).forEach((key) => {
                    formData.append(key, values[key]);
                });

                if (image) {
                    formData.append("image", image);
                }

                let response;

                if (profile) {

                    // Existing profile: Update
                    response = await axios.put(
                        "/updateDoctorProfile",
                        formData,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );

                } else {

                    // First-time profile: Create
                    response = await axios.post(
                        "/createDoctorProfile",
                        formData,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );
                }

                setMessage(response.data.message);

                setImage(null);
                setEditMode(false);

                // Fetch updated profile
                setLoading(true);
                await getProfile();

            } catch (error) {
                console.log(error);

                setMessage(
                    error.response?.data?.message ||
                    "Profile operation failed"
                );
            }
        }
    });

    // Loading state
    if (loading) {
        return (
            <>
                <Navbars />
                <h3>Loading doctor profile...</h3>
            </>
        );
    }

    // Profile fetch failed or token unavailable
    if (!token && !profile) {
        return (
            <>
                <Navbars />
                <h3>Please login to continue.</h3>
            </>
        );
    }

    return (
        <>
            <Navbars />

            <div className="doctor-profile-container">

                <h2>
                    {profile ? "My Doctor Profile" : "Create Doctor Profile"}
                </h2>

                {message && <p>{message}</p>}

                {profile && !editMode ? (

                    // Display existing profile
                    <div className="doctor-profile-card">

                        {profile.profileImage && (
                            <img
                                src={`https://doctor-be-gbwe.onrender.com/api/doctor-image/${profile.profileImage}`}
                                alt="Doctor"
                                className="doctor-profile-image"
                            />
                        )}

                        <h3>{profile.specialization}</h3>

                        <p>
                            <strong>Qualification:</strong> {profile.qualification}
                        </p>

                        <p>
                            <strong>Experience:</strong> {profile.experience} years
                        </p>

                        <p>
                            <strong>Consultation Fee:</strong> ₹{profile.consultationFee}
                        </p>

                        <p>
                            <strong>Description:</strong> {profile.description}
                        </p>

                        <button onClick={() => setEditMode(true)}>
                            Edit Profile
                        </button>

                    </div>

                ) : (

                    // Create or edit profile form
                    <form
                        onSubmit={formik.handleSubmit}
                        className="doctor-profile-form"
                    >

                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {formik.touched.description && formik.errors.description && (
                            <p>{formik.errors.description}</p>
                        )}

                        <label>Specialization</label>
                        <input
                            type="text"
                            name="specialization"
                            value={formik.values.specialization}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {formik.touched.specialization && formik.errors.specialization && (
                            <p>{formik.errors.specialization}</p>
                        )}

                        <label>Qualification</label>
                        <input
                            type="text"
                            name="qualification"
                            value={formik.values.qualification}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {formik.touched.qualification && formik.errors.qualification && (
                            <p>{formik.errors.qualification}</p>
                        )}

                        <label>Experience</label>
                        <input
                            type="number"
                            name="experience"
                            value={formik.values.experience}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {formik.touched.experience && formik.errors.experience && (
                            <p>{formik.errors.experience}</p>
                        )}

                        <label>Consultation Fee</label>
                        <input
                            type="number"
                            name="consultationFee"
                            value={formik.values.consultationFee}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {formik.touched.consultationFee && formik.errors.consultationFee && (
                            <p>{formik.errors.consultationFee}</p>
                        )}

                        <label>Profile Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />

                        <button type="submit" disabled={formik.isSubmitting}>
                            {formik.isSubmitting
                                ? "Please wait..."
                                : profile
                                    ? "Update Profile"
                                    : "Create Profile"}
                        </button>

                        {profile && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditMode(false);
                                    setImage(null);
                                    formik.resetForm();
                                }}
                            >
                                Cancel
                            </button>
                        )}

                    </form>
                )}

            </div>
        </>
    );
};

export default DoctorProfile;
