import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
export default function PrivateRouteAdmin() {
  const user = useSelector((state) => {
    return state.auth.currentUser;
  });

  if (user.user.role !== "ADMIN") {
    return <Navigate to={"/"} replace />;
  }
  return <Outlet />;
}
