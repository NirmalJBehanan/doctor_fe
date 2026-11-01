import { useFormik } from 'formik'
import React from 'react'
import * as yup from "yup"
import "./Register.css";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
const Register = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: ""
    },
    validationSchema: yup.object({
      name: yup.string().required("name is required"),
      email: yup.string().email("invalid email").required("email is required"),
      password: yup.string().required("password is required").min(5, "minimum 5 dight")
    })
    ,
    onSubmit: async (values) => {
      try {
        console.log(values)
        const response=await axios.post("/register",values)
        console.log(response)
        formik.resetForm();
        navigate("/login");

      } catch (error) {
        console.log(error)
      }
    }
  })
  return (
    <>
      <div className='mainm'>
        <div className='formRegister'>
          {/* section1 starts*/}
          <div className='section1'>
            <i className="fa-solid fa-circle-user fa-2xl" style={{ color: "rgb(99, 230, 190)" }}></i>
            <h1>Create your account</h1>
            <p>Enter your details to get started with MediSlot.</p>
          </div>
          {/* section1 ends*/}

          {/* section2 starts*/}

          <div className='section2'>
            <form onSubmit={formik.handleSubmit}>
              <div className='divForm'>
                <label>Full Name</label>
                {
                  formik.touched.name && formik.errors.name ?
                    <p style={{ color: "red" }}>{formik.errors.name}</p> : null
                }
                <input placeholder='enter username'{...formik.getFieldProps("name")} />
              </div>

              <div className='divForm'>
                <label>Email</label>
                {
                  formik.touched.email && formik.errors.email ?
                    <p style={{ color: "red" }}>{formik.errors.email}</p> : null
                }
                <input type='email' placeholder='enter email' {...formik.getFieldProps("email")} />
              </div>


              <div className='divForm'>
                <label>Password</label>
                {
                  formik.touched.password && formik.errors.password ?
                    <p style={{ color: "red" }}>{formik.errors.password}</p> : null
                }
                <input type='password' placeholder='enter password'{...formik.getFieldProps("password")} />

              </div>
             <div className='formButton'>
                 <button type='submit'>Create Account <i className="fa-solid fa-arrow-right" style={{color: "rgb(246, 247, 248);"}}></i></button>
             </div>
              
            </form>
            <div className='login'>
              <h6>Already have an account?</h6>
              <Link to='/login'>
                <button>Log in</button>
              </Link>
            </div>
          </div>
          {/* section2 ends*/}
        </div>

      </div>

    </>
  )
}

export default Register