import React, { useState } from "react";
import PersonalInfo from "../Components/PersonInfo/PersonalInfo";
import HeaderInfoUser from "../Components/Header/HeaderInfoUser";
import Footer from "../../../Components/Footer/Pages/Footer";

export default function Account() {
  const [avatar, setAvatar] = useState(null);
  const handleGetNewAvatar = (value) => {
    setAvatar(value);
  };

  return (
    <>
      <HeaderInfoUser obj={avatar?.avatar} />
      <PersonalInfo getInfo={handleGetNewAvatar} />
      <Footer />
    </>
  );
}
