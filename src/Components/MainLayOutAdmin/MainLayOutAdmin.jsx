import React from "react";
import { Outlet } from "react-router-dom";
import HeaderAdmin from "../HeaderAdmin/HeaderAdmin";
export default function MainLayOutAdmin() {
  return (
    <div>
      <HeaderAdmin />
      <Outlet />
    </div>
  );
}
