import React from 'react'
import "./Forgot.css"
import { useFormik } from 'formik'
import * as yup from "yup"
import { Link } from 'react-router-dom'
import axios from 'axios'
const Forgot = () => {
    const formik = useFormik(
        {
            initialValues: {
                email: ""
            },
            validationSchema: yup.object({
                email: yup.string().email("invalid email").required("email is required")
            })
            ,
            onSubmit: async (values) => {
                try {
                    const response = await axios.post("/forgotPassword", values);

                    alert(response.data.message);

                } catch (error) {
                    alert(
                        error.response?.data?.message ||
                        "Something went wrong"
                    );
                }
            }
        }
    )
    return (
        <>
            <div className='forgot'>
                <div className='fSection'>
                    <p><i className="fa-solid fa-envelope fa-2xl" style={{ color: "rgb(45, 194, 149)" }}></i></p>
                    <h1>Forgot Password</h1>
                    <p>Enter your email address and we'll send you <br></br>a password reset link .</p>
                    <div className='fInside'>
                        <form className='form1' onSubmit={formik.handleSubmit}>
                            <label>Email Address</label>
                            {
                                formik.touched.email && formik.errors.email ?
                                    <p className="error-message">
                                        {formik.errors.email}
                                    </p> : null
                            }
                            <input
                                type='email'
                                placeholder="enter email"
                                {...formik.getFieldProps("email")}
                            />
                            <button type='submit'>Send Reset Link</button>
                            <Link to="/login">
                                <i className="fa-solid fa-arrow-left fa-fade fa-sm" style={{ color: "rgb(45, 194, 149);" }}></i> Back to Log In
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Forgot