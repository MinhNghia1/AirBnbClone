import React from "react";
import ManagaeUser from "../Components/ManageUser/ManagaeUser";
import { ToastContainer } from "react-toastify";
export default function AdminUser() {
  return (
    <div style={{ width: "90%", marginLeft: "-30px" }}>
      <ToastContainer />
      <ManagaeUser />
    </div>
  );
}
