import React, { useEffect } from 'react'
import Home from './component/Home'
import { createBrowserRouter, RouterProvider, useRoutes } from 'react-router-dom'
import Login from './component/loginComponent/Login'
import Register from './component/register/Register'
import Activate from './component/accountActivate/Activate'
import Forgot from './component/changePassword/Forgot'
import Reset from './component/changePassword/Reset'
import FindDoctors from './component/booking/FindDoctors'

import ProfileDoctor from './component/booking/ProfileDoctor'
import PatientDashboard from './component/patient/PatientDashboard'
import DoctorDash from './component/doctor/DoctorDash'
import AdminDash from './component/admin/AdminDash'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { login, logout } from './slice/Auth'

const App = () => {
   const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!token) return;

        const checkUser = async () => {
            try {
                const response = await axios.get("/me", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                dispatch(login({
                    token,
                    role: response.data.user.role
                }));

            } catch (error) {
                dispatch(logout());
                console.log("Authentication check failed");
            }
        };

        checkUser();
    }, [token, dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/activate/:token",
      element: <Activate />
    },
    {
      path: "/forgot",
      element: <Forgot />
    },
    {
      path: "/reset",
      element: <Reset />
    },
    {
      path: "/findDoctors",
      element: <FindDoctors />
    },
    {
      path: "/profileDoctor/:id",
      element: <ProfileDoctor />
    },
    {
      path: "/patient/dashboard",
      element: <PatientDashboard />
    },
    {
      path: "/doctor/dashboard",
      element: <DoctorDash />
    },
    {
      path: "/admin/dashboard",
      element: <AdminDash />
    }
  ])
  return (
    <>
      <RouterProvider router={router}>

      </RouterProvider>

    </>
  )
}

export default App