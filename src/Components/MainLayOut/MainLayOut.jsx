import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Pages/Footer";

export default function MainLayOut() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
