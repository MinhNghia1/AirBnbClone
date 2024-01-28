import React from "react";
import InfoRoomBooking from "../components/InfoRoomBooking/InfoRoomBooking";
import { useParams } from "react-router-dom";
export default function BookingRoom() {
  const param = useParams();
  const idUser = param.IdUser;
  return (
    <>
      <InfoRoomBooking idUser={idUser} />
    </>
  );
}
