import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {

    const { token, role } = useSelector((state) => state.auth);

    // Check login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Check user role
    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;