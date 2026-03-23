import { Navigate, Outlet } from "react-router";
import { useCheckAuthQuery } from "../../services/auth";

export default function ProtectedRoute() {
  const { data, isLoading, isFetching } = useCheckAuthQuery();

  if (isLoading || isFetching) {
    return <p>Loading...</p>;
  }

  if (!data?.isAuthenticated) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
