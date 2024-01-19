import { useState } from "react";
import styled from "./Header.module.scss";
import { FaAirbnb } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import FormHeader from "../Form/FormHeader";
import { TbWorld } from "react-icons/tb";

import MenuRegister from "../menu/MenuRegister/MenuRegister";

export default function Header() {
  const [isShow, setIsShow] = useState(true);

  return (
    <div className={styled.header}>
      <div className={styled.container}>
        <div className={styled.logoBnb}>
          <FaAirbnb fontSize={40} color="#FF385C" />
          <span>airbnb</span>
        </div>
        <div
          onClick={() => {
            setIsShow(!isShow);
          }}
          className={styled.findRoomDrop}
        >
          {isShow ? (
            <div className={styled.findRoomUp}>
              <div className={styled.textFindHeader1}>Địa điểm bất kỳ</div>

              <div className={styled.textFindHeader2}>Tuần bất kỳ</div>

              <div className={styled.textFindHeader3}>Thêm khách</div>
              <div className={styled.searchLogo}>
                <IoSearch fontSize={20} style={{ color: "white" }} />
              </div>
            </div>
          ) : (
            <div className={styled.findRoomDown}>
              <div>Chỗ Ở</div>
              <div>Trải Nghiệm</div>
              <div>Trải Nghiệm Trực Tiếp</div>
            </div>
          )}
        </div>

        <div className={!isShow ? styled.formInputDropdownBlock : styled.formInputDropdown}>
          <FormHeader />
        </div>

        <div className={styled.InfoUser}>
          <p>Trở Thành Chủ Nhà</p>

          <TbWorld
            fontSize={25}
            style={{ padding: "0px 10px", cursor: "pointer", color: "#FF385C" }}
          />
          <MenuRegister />
        </div>
      </div>
    </div>
  );
}
