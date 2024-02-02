import { useState, useEffect } from "react";
import styled from "./InfoRoomBooking.module.scss";
import { infoRoomBooking } from "../../../../Apis/bookingRoom";
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";
import { useNavigate } from "react-router-dom";
import { FaWifi } from "react-icons/fa";
import { MdBedroomParent } from "react-icons/md";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { MdOutlineIron } from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";
import { GiWashingMachine } from "react-icons/gi";
import { FaSwimmingPool } from "react-icons/fa";
import { TbToolsKitchen3 } from "react-icons/tb";
import { getListRooms } from "../../../../Apis/room";
import dayjs from "dayjs";
export default function InfoRoomBooking({ idUser }) {
  const navigate = useNavigate();
  const [bookedRoom, setBookedRoom] = useState([]);
  const [listRoom, setListRoom] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getListBookingRoom(idUser);
    getInfoRoomBooked();
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
  const getInfoRoomBooked = async () => {
    try {
      const resp = await getListRooms();
      setListRoom(resp);
    } catch (error) {
      console.error(error);
    }
  };
  const handleBackHome = () => {
    navigate("/");
  };
  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className={styled.infoRoomBooking}>
      <div className={styled.container}>
        <div className={styled.titlePage}>Chuyến đi</div>
        <div className={styled.content}>
          <div className={styled.bookingLeft}>
            {bookedRoom.map((room, index) => {
              const infoRoom = listRoom.find((item) => item.id === room.maPhong);
              const ngayDen = dayjs(`${room.ngayDen}`);
              const ngayDi = dayjs(`${room.ngayDi}`);
              const soNgay = ngayDi.diff(ngayDen, "day");

              return (
                <div key={index} className={styled.cardBooking}>
                  <div className={styled.cardBookingTop}>
                    <img src={infoRoom?.hinhAnh} alt="hotel" />
                  </div>
                  <div className={styled.cardBookingBody}>
                    <div className={styled.cardBookingBodyTitle}>
                      <div className={styled.cardBookingBodyTitleLeft}>
                        <h2>{infoRoom?.tenPhong}</h2>
                        <p>
                          {dayjs(room.ngayDen).format(`DD/MM/YYYY HH:mm:ss`)}
                          {" =>"}
                          {dayjs(room.ngayDi).format(`DD/MM/YYYY HH:mm:ss`)}
                        </p>
                      </div>
                      <div className={styled.cardBookingBodyTitleRight}>
                        <h2>{infoRoom?.giaTien * soNgay}$</h2>
                        <p>/{soNgay} ngày</p>
                      </div>
                    </div>
                    <div className={styled.cardBookingBodyContent}>
                      <h3>Tiện ích</h3>
                      <div className={styled.cardBookingBodyContentItem}>
                        <div className={styled.itemIcon}>
                          {infoRoom?.wifi ? <FaWifi /> : ""}
                          {infoRoom?.phongNgu ? <MdBedroomParent /> : ""}
                          {infoRoom?.tivi ? <PiTelevisionSimpleBold /> : ""}
                          {infoRoom?.mayGiat ? <GiWashingMachine /> : ""}
                          {infoRoom?.banLa ? <MdOutlineIron /> : ""}
                          {infoRoom?.dieuHoa ? <TbAirConditioning /> : ""}
                          {infoRoom?.hoBoi ? <FaSwimmingPool /> : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
