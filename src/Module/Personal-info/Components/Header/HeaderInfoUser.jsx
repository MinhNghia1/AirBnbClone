import React from "react";
import styled from "./HeaderInfo.module.scss";
import { FaAirbnb } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import MenuInfoUser from "../../../../Components/menu/MenuInfoUser/MenuInfoUser";
import { useNavigate } from "react-router-dom";

export default function HeaderInfoUser({ obj }) {
  const navigate = useNavigate();

  return (
    <div className={styled.headerInfo}>
      <div className={styled.container}>
        <div onClick={() => navigate("/")} className={styled.logoBnb}>
          <FaAirbnb fontSize={40} color="#FF385C" />
          <span>airbnb</span>
        </div>
        <div className={styled.InfoUser}>
          <TbWorld
            fontSize={25}
            style={{ padding: "0px 10px", cursor: "pointer", color: "#FF385C" }}
          />
          <MenuInfoUser obj={obj} />
        </div>
      </div>
    </div>
  );
}
