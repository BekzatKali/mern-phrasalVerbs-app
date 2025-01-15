import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect based on user role
  if (user) {
    return user.isAdmin ? (
      <Navigate to="/admin-dashboard" replace />
    ) : (
      <Navigate to="/dashboard" replace />
    );
  }

  // If no user, render public routes
  return <Outlet />;
};

export default PublicRoute;
