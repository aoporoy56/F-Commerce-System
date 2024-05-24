// PrivateRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({role}) => {
  
  const user = JSON.parse(localStorage.getItem("user"));
  const isAuthenticated = user && role.includes(user.role);
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
