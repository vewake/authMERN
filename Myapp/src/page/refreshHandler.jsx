import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


export default function PrivateRoute({ children }) {

  const location = useLocation();
  if (!localStorage.getItem('token')) {
    return window.location.href = '/login';
  }

  return children;
}
