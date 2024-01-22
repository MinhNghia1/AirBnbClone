import React from "react";
import styled from "./SignIn.module.scss";
import { useNavigate } from "react-router-dom";
import FormSigin from "../../../Components/Form/FormSigin";
import { ToastContainer } from "react-toastify";
export default function SignIn() {
  const navigate = useNavigate();

  return (
    <div className={styled.signIn}>
      <ToastContainer />
      <div className={styled.signInContent}>
        <div className={styled.signInCard}>
          <div className={styled.signInHeader}>
            <h2>Đăng nhập</h2>
          </div>
          <div className={styled.signInBody}>
            <FormSigin />
          </div>
          <div className={styled.signInFooter}>
            <div className={styled.signInFooterLeft}>Quên Mật Khẩu</div>
            <div className={styled.signInFooterRight}>
              <p>Chưa Có Tài Khoản?</p>
              <div onClick={() => navigate("/SigupUser")} className={styled.sigupText}>
                Đăng Ký Ngay
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
