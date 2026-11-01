import React from 'react'
import "./Forgot.css"
import { useFormik } from 'formik'
import * as yup from "yup"
import { Link } from 'react-router-dom'
const Reset = () => {
    const formik = useFormik(
        {
            initialValues: {
                password: "",
                confirmPassword: ""
            },
            validationSchema: yup.object({
                password: yup.string().required("Password is required"),

                confirmPassword: yup.string()
                    .oneOf(
                        [yup.ref("password")],
                        "Passwords must match"
                    )
                    .required("Please confirm your password")
            })
            ,
            onSubmit: (values) => {
                console.log(values)
            }
        }
    )
    return (
        <>
            <div className='forgot'>
                <div className='fSection'>
                    <p><i className="fa-solid fa-envelope fa-2xl" style={{ color: "rgb(45, 194, 149)" }}></i></p>
                    <h1>Change Password</h1>
                    <p>Enter your new password below . <br></br>Make sure its strong and secure.</p>
                    <div className='fInside'>
                        <form className='form1' onSubmit={formik.handleSubmit}>
                            <label>New Password</label>
                            {
                                formik.touched.password && formik.errors.password ?
                                    <p className="error-message">
                                        {formik.errors.password}
                                    </p> : null
                            }
                            <input
                                type='password'
                                placeholder="Password"
                                {...formik.getFieldProps("password")}
                            />

                            <label>Confirm Password</label>
                            {
                                formik.touched.confirmPassword && formik.errors.confirmPassword ?
                                    <p className="error-message">
                                        {formik.errors.confirmPassword}
                                    </p> : null
                            }
                            <input
                                type='password'
                                placeholder="confirm Password"
                                {...formik.getFieldProps("confirmPassword")}
                            />
                            <button type='submit'>Reset Password</button>
                             
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reset