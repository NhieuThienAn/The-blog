import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element }) => {
  const role = Cookies.get('role');

  const allowedRoles = [ 'admin']; 

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/posts" />;
  }

  return element; 
};

export default ProtectedRoute;