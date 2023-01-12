import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <h3>Checking status...</h3>;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
