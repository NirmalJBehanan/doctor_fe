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
import MyAppointments from './component/patient/MyAppointments'
import ManageSlots from './component/doctor/ManageSlots'
import DoctorAppointments from './component/doctor/DoctorAppointments'
import MyAppointmentHistory from './component/patient/MyAppointmentHistory'
import AdminUsers from './component/admin/AdminUsers'
import AdminDoctors from './component/admin/AdminDoctors'
import AdminAppointments from './component/admin/AdminAppointments'
import About from './component/homeComponets/About'
import Contact from './component/homeComponets/Contact'
import DoctorProfile from './component/doctor/DoctorProfile'
import PatientProfile from './component/patient/PatientProfile'
import PublicRoute from './component/PublicRoute'
import ProtectedRoute from './component/ProtectedRoute'

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
    // Public routes
    {
        element: <PublicRoute />,
        children: [
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/forgot",
                element: <Forgot />
            },
            {
                path: "/reset/:token",
                element: <Reset />
            }
        ]
    },

    // Routes accessible without login
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/activate/:token",
        element: <Activate />
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
        path: "/about",
        element: <About />
    },
    {
        path: "/contact",
        element: <Contact />
    },

    // Patient routes
    {
        element: <ProtectedRoute allowedRoles={["user"]} />,
        children: [
            {
                path: "/patient/dashboard",
                element: <PatientDashboard />
            },
            {
                path: "/myAppoinment",
                element: <MyAppointments />
            },
            {
                path: "/myAppointmentHistory",
                element: <MyAppointmentHistory />
            },
            {
                path: "/patientProfile",
                element: <PatientProfile />
            }
        ]
    },

    // Doctor routes
    {
        element: <ProtectedRoute allowedRoles={["doctor"]} />,
        children: [
            {
                path: "/doctor/dashboard",
                element: <DoctorDash />
            },
            {
                path: "/ManageSlots",
                element: <ManageSlots />
            },
            {
                path: "/doctorAppointments",
                element: <DoctorAppointments />
            },
            {
                path: "/doctor/profile",
                element: <DoctorProfile />
            }
        ]
    },

    // Admin routes
    {
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [
            {
                path: "/admin/dashboard",
                element: <AdminDash />
            },
            {
                path: "/admin/users",
                element: <AdminUsers />
            },
            {
                path: "/admin/doctors",
                element: <AdminDoctors />
            },
            {
                path: "/admin/appointments",
                element: <AdminAppointments />
            }
        ]
    }
]);

  return (
    <>
      <RouterProvider router={router}>

      </RouterProvider>

    </>
  )
}

export default App