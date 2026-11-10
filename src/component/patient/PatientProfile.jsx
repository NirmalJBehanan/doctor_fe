
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PatientProfile.css";
import Navbars from "../homeComponets/Navbars";

const PatientProfile = () => {

    const [profile, setProfile] = useState(null);

    const token = localStorage.getItem("token");

    const getProfile = async () => {
        try {
            const response = await axios.get("/patientProfile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setProfile(response.data.profile);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    if (!profile) {
        return <h3>Loading patient profile...</h3>;
    }

    return (
        <>
        <Navbars />
        <div className="patient-profile-container">

            <h2>My Profile</h2>

            <div className="patient-profile-card">

                <h3>{profile.name}</h3>

                <p>
                    <strong>Email:</strong> {profile.email}
                </p>

                <p>
                    <strong>Role:</strong> Patient
                </p>

            </div>

        </div>
        </>
    );
};

export default PatientProfile;
