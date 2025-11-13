import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    // User is not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }

  // User is authenticated, render the child component
  return <>{children}</>;
};

export default ProtectedRoute;
