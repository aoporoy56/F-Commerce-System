// PrivateRoute.js
import React, { useEffect } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "./UseUserContenxt";
import Login from "../Pages/Login";

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
