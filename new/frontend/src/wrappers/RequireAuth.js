import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

function RequireAuth({ children }) {
    const { currentUser, loading } = useAuth();
    let location = useLocation();

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (!currentUser) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
}
export default RequireAuth;