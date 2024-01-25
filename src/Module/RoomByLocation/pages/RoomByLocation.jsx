import React from "react";
import { useParams } from "react-router-dom";
import InfoRoom from "../components/InfoRoom";

export default function RoomByLocation() {
  const param = useParams();
  const IdLocation = param.IdRoom;
  return (
    <>
      <InfoRoom IdLocation={IdLocation} />
    </>
  );
}
