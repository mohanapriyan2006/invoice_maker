import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import DataContext from '../context/DataContest';

const ProtectedRoute = ({ children }) => {
    const { loginPage, token } = useContext(DataContext);
    
    // If user is not logged in or no token, redirect to login
    if (loginPage.isActive || !token) {
        return <Navigate to="/" replace />;
    }
    
    return children;
};

export default ProtectedRoute;