/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useApp } from "../context/AppContext";

const ProtectedRoute = () => {
  const { token, logoutContext } = useApp();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      logoutContext();
    }
  }, [token]);

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
