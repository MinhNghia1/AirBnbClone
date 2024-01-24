import { useEffect, useState } from "react";
import styled from "./InfoRoom.module.scss";
import { getRoomByLocation } from "../../../../Apis/room";
export default function InfoRoom({ IdLocation }) {
  const [rooms, setRooms] = useState(null);
  useEffect(() => {
    handleGetRoomByLocation(IdLocation);
  }, []);
  const handleGetRoomByLocation = async (id) => {
    try {
      const resp = await getRoomByLocation(id);
      setRooms(resp);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styled.infoRoom}>
      <div className={styled.container}>
        <div className={styled.infoRoomLeft}></div>
        <div className={styled.infoRoomRight}></div>
      </div>
    </div>
  );
}
