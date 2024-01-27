import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
export default function PrivateRoute({}) {
  const currentUser = useSelector((state) => {
    return state.auth.currentUser;
  });
  const location = useLocation();
  if (!currentUser) {
    const url = `/SiginUser?from=${location.pathname}`;
    return <Navigate to={url} replace />;
  }
  return <Outlet />;
}
