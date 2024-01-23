import React, { useState } from "react";
import PersonalInfo from "../Components/PersonInfo/PersonalInfo";
import HeaderInfoUser from "../Components/Header/HeaderInfoUser";

export default function Account() {
  const [avatar, setAvatar] = useState(null);
  const handleGetNewAvatar = (value) => {
    setAvatar(value);
  };

  return (
    <div>
      <HeaderInfoUser obj={avatar?.avatar} />
      <PersonalInfo getInfo={handleGetNewAvatar} />
    </div>
  );
}
