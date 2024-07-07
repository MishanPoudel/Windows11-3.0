import React, { useState } from "react";
import Login from "../components/user/Login";
import Slider from "../components/utilities/Slider";

function Lockscreen() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div
        className="absolute bg-black h-screen w-full blur-sm"
        style={{
          background: "url(https://images8.alphacoders.com/134/1346089.png)",
          backgroundSize: "100% 100%",
        }}
      ></div>
      <div className="absolute left-0 top-0 h-screen w-full flex flex-col items-center z-10">
        <Login />
      </div>
      <Slider
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        toggleMenu={toggleMenu}
      />
    </>
  );
}

export default Lockscreen;
