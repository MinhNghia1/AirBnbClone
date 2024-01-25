import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
export default function PrivateRoute({ children }) {
  const currentUser = useSelector((state) => {
    return state.auth.currentUser;
  });

  if (!currentUser) {
    return <Navigate to={"/SiginUser"} replace />;
  }
  return <Outlet />;
}
