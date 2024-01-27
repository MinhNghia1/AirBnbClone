import React from "react";
import RotateLoader from "react-spinners/ClipLoader";
export default function LoadingPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <RotateLoader color="#FF385C" size={100} />
    </div>
  );
}
