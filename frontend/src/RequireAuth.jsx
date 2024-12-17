import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const RequireAuth = ({ role }) => {
  // Cek token di localStorage dan sessionStorage
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role && user?.role !== role) {
    alert("Anda tidak memiliki izin untuk mengakses halaman ini.");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

RequireAuth.propTypes = {
  role: PropTypes.string,
};

export default RequireAuth;
