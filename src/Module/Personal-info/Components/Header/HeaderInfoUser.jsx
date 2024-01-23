import React from "react";
import styled from "./HeaderInfo.module.scss";
import { FaAirbnb } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import MenuInfoUser from "../../../../Components/menu/MenuInfoUser/MenuInfoUser";

export default function HeaderInfoUser({ obj }) {
  return (
    <div className={styled.headerInfo}>
      <div className={styled.container}>
        <div className={styled.logoBnb}>
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
