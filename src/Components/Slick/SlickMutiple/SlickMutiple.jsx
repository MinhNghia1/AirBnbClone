import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { Component } from "react";
import Slider from "react-slick";
import { TbUfo } from "react-icons/tb";
import { FaMountainCity } from "react-icons/fa6";
import { TbBeach } from "react-icons/tb";
import { GiIsland } from "react-icons/gi";
import { PiSwimmingPoolBold } from "react-icons/pi";
import { MdHome } from "react-icons/md";
import { MdOutlineVilla } from "react-icons/md";
import { FaRegSnowflake } from "react-icons/fa";
import { MdCabin } from "react-icons/md";
import { MdGolfCourse } from "react-icons/md";
import { CiMap } from "react-icons/ci";
import { GiCaveEntrance } from "react-icons/gi";
import { GiSurfBoard } from "react-icons/gi";
import { BiSolidPyramid } from "react-icons/bi";
import { GiUndergroundCave } from "react-icons/gi";
import styled from "./SlickMutipls.scss";
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        backgroundColor: "#FF385C",
        borderRadius: "90px",
        marginRight: "25px",
      }}
      onClick={onClick}
    />
  );
}
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        backgroundColor: "#FF385C",
        borderRadius: "90px",
        marginLeft: "25px",
      }}
      onClick={onClick}
    />
  );
}
export default class SlickMutiple extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    return (
      <div style={{ textAlign: "center", cursor: "pointer" }}>
        <Slider {...settings}>
          <div className={styled.slickItem}>
            <TbUfo fontSize={30} color="#FF385C" />
            <p>Thật Ấn Tượng</p>
          </div>
          <div className={styled.slickItem}>
            <FaMountainCity fontSize={30} color="#FF385C" />
            <p>Công Viên Quốc Gia</p>
          </div>
          <div className={styled.slickItem}>
            <PiSwimmingPoolBold fontSize={30} color="#FF385C" />
            <p>Hồ Bơi Tuyệt Vời</p>
          </div>
          <div className={styled.slickItem}>
            <GiIsland fontSize={30} color="#FF385C" />
            <p>Đảo</p>
          </div>
          <div className={styled.slickItem}>
            <TbBeach fontSize={30} color="#FF385C" />
            <p>Bãi Biển</p>
          </div>
          <div className={styled.slickItem}>
            <MdHome fontSize={30} color="#FF385C" />
            <p>Nhà Nhỏ</p>
          </div>
          <div className={styled.slickItem}>
            <MdOutlineVilla fontSize={30} color="#FF385C" />
            <p>Thiết Kế</p>
          </div>
          <div className={styled.slickItem}>
            <FaRegSnowflake fontSize={30} color="#FF385C" />
            <p>Bắc Cực</p>
          </div>
          <div className={styled.slickItem}>
            <MdCabin fontSize={30} color="#FF385C" />
            <p>Cabin</p>
          </div>

          <div className={styled.slickItem}>
            <TbBeach fontSize={30} color="#FF385C" />
            <p>Ven Hồ</p>
          </div>
          <div className={styled.slickItem}>
            <MdGolfCourse fontSize={30} color="#FF385C" />
            <p>Chơi Golf</p>
          </div>
          <div className={styled.slickItem}>
            <CiMap fontSize={30} color="#FF385C" />
            <p>Khung Cảnh Tuyệt Vời</p>
          </div>
          <div className={styled.slickItem}>
            <GiCaveEntrance fontSize={30} color="#FF385C" />
            <p>Hang Động</p>
          </div>
          <div className={styled.slickItem}>
            <GiSurfBoard fontSize={30} color="#FF385C" />
            <p>Lướt Sóng</p>
          </div>
          <div className={styled.slickItem}>
            <BiSolidPyramid fontSize={30} color="#FF385C" />
            <p>Khung Nhà Chữ A</p>
          </div>
          <div className={styled.slickItem}>
            <GiUndergroundCave fontSize={30} color="#FF385C" />
            <p>Nhà Dưới Lòng Đất</p>
          </div>
        </Slider>
      </div>
    );
  }
}
