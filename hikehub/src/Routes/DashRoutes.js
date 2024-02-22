import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

function DashRoutes({ isAllowed, children, redirectPath }) {
  const { user, checkUser } = useContext(UserContext);

  if (checkUser) {
    return <div>Loading...</div>;
  }

  if (!user && !checkUser) {
    return <Navigate to={redirectPath} />;
  }

  if (!isAllowed) {
    return <Navigate to={redirectPath} />;
  }

  return children ? children : <Outlet />;
}

export default DashRoutes;