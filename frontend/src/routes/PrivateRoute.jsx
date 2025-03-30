import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../utils/token'; // ✅ Correct Import


const PrivateRoute = () => {
  return getToken() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
