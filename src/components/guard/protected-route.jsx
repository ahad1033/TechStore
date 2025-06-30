import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useCurrentUser } from "@/store/slices/authSlice";

export default function ProtectedRoute({ children, requiredRole = null }) {
  const user = useSelector(useCurrentUser)?.user;

  if (!user) {
    console.log("no user");
    return <Navigate to="/login" />;
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
