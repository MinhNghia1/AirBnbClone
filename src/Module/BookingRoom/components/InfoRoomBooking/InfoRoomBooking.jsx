import { useState, useEffect } from "react";
import styled from "./InfoRoomBooking.module.scss";
import { infoRoomBooking } from "../../../../Apis/bookingRoom";
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";
import { useNavigate } from "react-router-dom";
import { FaWifi } from "react-icons/fa";
import { LuDoorClosed } from "react-icons/lu";
import { PiTelevisionSimpleBold, PiThermometerSimpleBold } from "react-icons/pi";
import { FaUmbrellaBeach } from "react-icons/fa";
export default function InfoRoomBooking({ idUser }) {
  const navigate = useNavigate();
  const [bookedRoom, setBookedRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getListBookingRoom(idUser);
  }, []);

  const getListBookingRoom = async (idUser) => {
    try {
      const resp = await infoRoomBooking(idUser);
      setBookedRoom(resp);
      setLoading(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleBackHome = () => {
    navigate("/");
  };
  if (loading) {
    return <LoadingPage />;
  }
  if (!bookedRoom) {
    return;
  }
  return (
    <div className={styled.infoRoomBooking}>
      <div className={styled.container}>
        <div className={styled.titlePage}>Chuyến đi</div>
        <div className={styled.content}>
          <div className={styled.bookingLeft}>
            {bookedRoom.map((room, index) => (
              <div key={index} className={styled.cardBooking}>
                <div className={styled.cardBookingTop}>
                  <img
                    src="https://airbnb.cybersoft.edu.vn/public/images/room/1658417426651_dirtiest-1170x650.jpg"
                    alt="hotel"
                  />
                </div>
                <div className={styled.cardBookingBody}>
                  <div className={styled.cardBookingBodyTitle}>
                    <div className={styled.cardBookingBodyTitleLeft}>
                      <h2>KHÁCH SẠN PALACE</h2>
                      <p>2023-10-09T00:00:00 - 2023-10-13T00:00:00</p>
                    </div>
                    <div className={styled.cardBookingBodyTitleRight}>
                      <h2>3000</h2>
                      <p> $/4 ngày</p>
                    </div>
                  </div>
                  <div className={styled.cardBookingBodyContent}>
                    <h3>Tiện ích</h3>
                    <div className={styled.cardBookingBodyContentItem}>
                      <div className={styled.itemIcon}>
                        <FaWifi />
                      </div>
                      <div className={styled.itemIcon}>
                        <LuDoorClosed />
                      </div>
                      <div className={styled.itemIcon}>
                        <PiTelevisionSimpleBold />
                      </div>
                      <div className={styled.itemIcon}>
                        <PiThermometerSimpleBold />
                      </div>
                      <div className={styled.itemIcon}>
                        <FaUmbrellaBeach />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styled.bookingRight}>
            <div className={styled.bookingRightCard}>
              <div className={styled.bookingRightCardTop}>
                <p>Khám phá các địa điểm thú vị</p>
              </div>
              <div className={styled.bookingRightCardBody}>
                <p>
                  Đã đến lúc phủi bụi hành lý và bắt đầu chuẩn bị cho chuyến phiêu lưu tiếp theo của
                  bạn rồi
                </p>
              </div>
              <div className={styled.bookingRightCardBottom}>
                <button onClick={handleBackHome}>Bắt đầu tìm kiếm</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
