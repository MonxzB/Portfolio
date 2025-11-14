import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    // Optional: show a loading spinner while checking auth state
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    // User is not authenticated or not an admin, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // User is authenticated and is an admin, render the child component
  return <>{children}</>;
};

export default ProtectedRoute;