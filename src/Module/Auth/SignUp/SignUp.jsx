import React from "react";
import styled from "./SignUp.module.scss";
import FormSignUp from "../../../Components/Form/FormSignUp/FormSignUp";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function SignUp() {
  const navigate = useNavigate();
  return (
    <div className={styled.signIn}>
      <ToastContainer />
      <div className={styled.signInContent}>
        <div className={styled.signInCard}>
          <div className={styled.signInHeader}>
            <h2>Đăng Ký</h2>
          </div>
          <div className={styled.signInBody}>
            <FormSignUp />
          </div>
          <div onClick={() => navigate("/SiginUser")} className={styled.signInFooter}>
            <div className={styled.signInFooterText}>Đăng Nhập Ngay</div>
          </div>
        </div>
      </div>
    </div>
  );
}
