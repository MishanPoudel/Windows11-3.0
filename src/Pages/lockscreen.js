import React, { useState } from "react";
import Login from "../components/user/Login";
import Slider from "../components/utilities/Slider";
import MobileDetection from "../components/utilities/MobileDetection";

function Lockscreen() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMobileDetection = (mobile) => {
    setIsMobile(mobile);
  };

  if (isMobile) {
    return (
      <div className="bg-black w-full h-screen text-center text-3xl px-7 overflow-hidden flex flex-col justify-center items-center">
        😔<br/> Sorry, this app is not supported on mobile devices <div className="font-bold">YET.</div> 🙏
      </div>
    );
  }

  return (
    <>
      <MobileDetection onDetectMobile={handleMobileDetection} />
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
