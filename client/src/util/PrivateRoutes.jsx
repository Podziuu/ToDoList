import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (props.loggedIn) {
    return !isLoggedIn ? <Outlet /> : <Navigate to="/tasks" />;
  }
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
