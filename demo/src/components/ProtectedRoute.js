import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element, allowedRoles }) => {
  const role = Cookies.get('role');

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/login" />; // Nếu không có vai trò đúng, quay về đăng nhập
  }

  return element; // Trả về component nếu đã xác thực
};

export default ProtectedRoute;