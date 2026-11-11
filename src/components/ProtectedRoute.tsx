import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth, type UserRole } from "../contexts/AuthContext";

type ProtectedRouteProps = {
  allowedRoles?: UserRole[];
};

export default function ProtectedRoute({
  allowedRoles,
}: ProtectedRouteProps) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <Navigate
        to={user.role === "dependente" ? "/ajustes" : "/"}
        replace
      />
    );
  }

  return <Outlet />;
}
