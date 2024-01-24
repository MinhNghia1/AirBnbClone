import React from "react";
import SlickMutiple from "../../../Components/Slick/SlickMutiple/SlickMutiple";
import Products from "../../../Components/Products/Pages";
export default function Home() {
  return (
    <div style={{ width: "95%", margin: "auto" }}>
      <div style={{ marginTop: "100px" }}>
        <SlickMutiple />
        <Products/>
      </div>
    </div>
  );
}
