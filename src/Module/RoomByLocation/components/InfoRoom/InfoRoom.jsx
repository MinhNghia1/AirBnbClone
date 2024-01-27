import { useEffect, useState } from "react";
import styled from "./InfoRoom.module.scss";
import { getRoomByLocation } from "../../../../Apis/room";
import LoadingPage from "../../../../Components/LoadingPage";
import "swiper/css";
import "swiper/package.json";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "./InfoRoom.scss";

export default function InfoRoom({ IdLocation }) {
  const [rooms, setRooms] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    handleGetRoomByLocation(IdLocation);
  }, [IdLocation]);

  const handleGetRoomByLocation = async (id) => {
    try {
      const resp = await getRoomByLocation(id);
      setRooms(resp);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <LoadingPage />;
  }
  if (!rooms) {
    return;
  }
  return (
    <div className={styled.infoRoom}>
      <div className={styled.container}>
        <div className={styled.infoRoomLeft}>
          <div className={styled.titlePage}>Chỗ ở hiện tại của bạn đã chọn</div>
          {rooms.map((room, index) => (
            <div key={index} className={styled.cardItem}>
              <div className={styled.cardTop}>
                <Swiper
                  modules={[Pagination, Navigation]}
                  className={styled.roomSwiper}
                  spaceBetween={0}
                  slidesPerView={1}
                  navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
                  pagination={{ clickable: true }}
                >
                  <SwiperSlide>
                    <img src={room.hinhAnh} alt="Room Slide" className="w-full" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={room.hinhAnh} alt="Room Slide" className="w-full" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={room.hinhAnh} alt="Room Slide" className="w-full" />
                  </SwiperSlide>
                  <div class="swiper-button-prev"></div>
                  <div class="swiper-button-next"></div>
                </Swiper>
              </div>
              <div className={styled.cardBody}>
                <div className={styled.titleCard}>
                  <h3>{room.tenPhong}</h3>
                </div>
                <div className={styled.infoCard}>
                  {room.giuong && `Giường: ${room.giuong}, `}
                  {room.khach && `Khách: ${room.khach}, `}
                  {room.banLa && "Bàn là, "}
                  {room.banUi && "Bàn ủi, "}
                  {room.bep && "Bếp, "}
                  {room.dieuHoa && "Điều hòa, "}
                  {room.doXe && "Đỗ xe, "}
                  {room.hoBoi && "Hồ bơi, "}
                  {room.mayGiat && "Máy giặt, "}
                  {room.phongNgu && "Phòng ngu, "}
                  {room.phongTam && "Phòng tắm, "}
                  {room.tivi && "Ti vi, "}
                  {room.wifi && "Wifi, "}
                </div>
                <div className={styled.price}>{room.giaTien}$/Ngày</div>
              </div>
              <button className={styled.logoHeart}>
                <svg
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                >
                  <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className={styled.InfoMap}>
          <div className={styled.map}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15745517.975649437!2d95.18945211775045!3d15.531664308744194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31157a4d736a1e5f%3A0xb03bb0c9e2fe62be!2sVietnam!5e0!3m2!1sfr!2s!4v1706190815828!5m2!1sfr!2s"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
