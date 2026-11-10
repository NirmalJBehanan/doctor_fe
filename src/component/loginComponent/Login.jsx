import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from "yup"
import "./Login.css";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../slice/Auth';
import axios from 'axios';
const Login = () => {
    const { token, role } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: yup.object({
            email: yup.string().email("invalid email").required("email is required"),
            password: yup.string().required("password is required").min(5, "minimum 5 dight")
        }),
        onSubmit: async (values) => {
            try {
                console.log(values)
                const response = await axios.post("/login", values)
                const { token, role } = response.data
                dispatch(login({ token, role }))
                formik.resetForm()
                if (role === "user") {
                    navigate("/patient/dashboard");
                } else if (role === "doctor") {
                    navigate("/doctor/dashboard");
                } else if (role === "admin") {
                    navigate("/admin/dashboard");
                }


            } catch (error) {
                console.log(error)

            } finally {

            }
        }
    })


    return (
        <div className="main">
            <div className='main-sections'>

                {/* Section 1 starts */}
                <div className='main-section1'>
                    <h1>Compassionate care backed by clinical precision.</h1>
                    <p>
                        Experience seamless coordination with board-certified
                        physicians, instantaneous real-time scheduling, and
                        enterprise-grade health record encryption.
                    </p>
                    <div className='imgFrame'>
                        <img src="/loginImage.jpg" alt="Healthcare login" />
                    </div>

                </div>
                {/* Section 1 ends */}

                {/* Section 2 starts */}
                <div className='main-section2'>

                    <form onSubmit={formik.handleSubmit}>
                        <h1>Welcome back to MediSlot</h1>
                        <div className='main-email'>
                            <label>email</label>

                            {formik.touched.email && formik.errors.email ? (
                                <p style={{ color: "red" }}>
                                    {formik.errors.email}
                                </p>
                            ) : null}

                            <input
                                type="email"
                                placeholder="enter email"
                                {...formik.getFieldProps("email")}
                            />
                        </div>

                        <div className='main-email'>
                            <label>password</label>

                            {formik.touched.password && formik.errors.password ? (
                                <p style={{ color: "red" }}>
                                    {formik.errors.password}
                                </p>
                            ) : null}

                            <input
                                type="password"
                                placeholder="enter password"
                                {...formik.getFieldProps("password")}
                            />
                        </div>

                        <div className="buttonSubmit">
                            <button type="submit">Sign In to Portal</button>
                        </div>

                        <div className="loginButtons">
                            <Link to="/forgot">
                                <button type="button">forget password?</button>
                            </Link>

                            <Link to="/register">
                                <button type="button">Register</button>
                            </Link>
                        </div>

                    </form>
                </div>
                {/* Section 2 ends */}

            </div>


        </div>
    );

}

export default Login