import React, { useState, useCallback } from "react";
import Login from "../components/user/Login";
import Slider from "../components/utilities/Slider";
import MobileDetection from "../components/utilities/MobileDetection";

function Lockscreen() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Use useCallback to memoize the function and avoid unnecessary re-renders
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Callback for mobile detection
  const handleMobileDetection = useCallback((mobile) => {
    setIsMobile(mobile);
  }, []);

  // Conditional rendering for mobile detection
  if (isMobile) {
    return (
      <div className="bg-black w-full h-screen text-center text-3xl px-7 overflow-hidden flex flex-col justify-center items-center">
        😔
        <br />
        Sorry, this app is not supported on mobile devices{" "}
        <div className="font-bold">YET.</div> 🙏
      </div>
    );
  }

  return (
    <>
      {!isMobile && <MobileDetection onDetectMobile={handleMobileDetection} />}

      <div
        className="absolute bg-black h-screen w-full blur-sm"
        style={{
          background:
            "url(https://images8.alphacoders.com/134/1346089.png) no-repeat center center",
          backgroundSize: "cover",
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
