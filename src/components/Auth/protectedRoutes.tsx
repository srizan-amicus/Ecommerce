import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";

function ProtectedRoute() {
  const { isLoggedIn } = useAuthContext();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
