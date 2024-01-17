import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ token, children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  return children;
};

export default ProtectedRoute;
