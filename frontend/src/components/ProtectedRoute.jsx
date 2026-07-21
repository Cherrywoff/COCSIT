import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ user, allowedRoles }) => {
  if (!user) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If authenticated but wrong role, redirect to unauthorized/dashboard
    // Fallback to their specific dashboard based on role
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  // If authorized, render children
  return <Outlet />;
};

export default ProtectedRoute;
