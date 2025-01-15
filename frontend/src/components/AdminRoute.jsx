import React from "react";
import { useAuth } from "../context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

const AdminRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user || !user.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
