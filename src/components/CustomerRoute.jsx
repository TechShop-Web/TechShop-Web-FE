import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const CustomerRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default CustomerRoute;
