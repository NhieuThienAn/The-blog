import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, allowedRoles }) => {
  const role = localStorage.getItem('role');

  // Check if the user's role is allowed
  if (allowedRoles.includes(role)) {
    return element; // Render the requested component if allowed
  }
<<<<<<< HEAD

=======
  
>>>>>>> 086163e (74% done)
  return <Navigate to="/login" />; // Redirect to login if not authorized
};

export default ProtectedRoute;