import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }:any) => {
    const test = false
  
    return (test ? <Navigate to="/login" replace /> : children)
};

export default PrivateRoute