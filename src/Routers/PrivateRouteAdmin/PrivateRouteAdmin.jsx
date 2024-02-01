import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
export default function PrivateRouteAdmin() {
  const currentUser = useSelector((state) => {
    return state.auth.currentUser;
  });
  if (currentUser?.user?.role !== "ADMIN") {
    return <Navigate to={"/"} replace />;
  }
  return <Outlet />;
}
