import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element }) => {
  const role = Cookies.get('role');

  // Define allowed roles here or pass them as a prop
  const allowedRoles = [ 'admin']; // Adjust as necessary

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/posts" />;
  }

  return element; // Return the element directly
};

export default ProtectedRoute;