import React from 'react'
import { useParams } from 'react-router-dom'

const ProfileDoctor = () => {
    const { id } = useParams()
    console.log("Captured Doctor ID:", id)
    return (
        <div>
            <h2>Doctor Profile</h2>
            <p>Showing profile for Doctor ID: {id}</p>
        </div>
    )
}

export default ProfileDoctor