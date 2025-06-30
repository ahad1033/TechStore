import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, requiredRole = null }) {
  const { user } = useSelector((state) => state.auth).user;

  console.log("USER: ", user);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    if (user?.role === "admin") {
      return <Navigate to="/dashboard/analytics" replace />;
    } else {
      return <Navigate to="/dashboard/orders" replace />;
    }
  }

  return children;
}
