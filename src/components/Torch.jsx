import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Torch() {
  const cursorSize = 5000;
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };

  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  useEffect(() => {
    const manageMouseMove = (e) => {
      const { clientX, clientY } = e;
      mouse.x.set(clientX - cursorSize / 2);
      mouse.y.set(clientY - cursorSize / 2);
    };

    window.addEventListener("mousemove", manageMouseMove);

    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
    };
  }, [mouse.x, mouse.y, cursorSize]);

  return (
    <>
      <motion.div
        style={{
          zIndex: 1000,
          left: smoothMouse.x,
          top: smoothMouse.y,
          height: cursorSize,
          width: cursorSize,
          position: "fixed",
          //   borderRadius: "50%",
          pointerEvents: "none",
          visibility: "visible",
          background:
            "radial-gradient(circle at 50% 50%, rgba(20, 20, 20, 0) 0%, rgba(20, 20, 20, 0.4) 1.25%, rgba(20, 20, 20, 0.6) 1.5%, rgba(20, 20, 20, 0.9) 1.875%, rgba(20, 20, 20, 1) 2.5%, rgba(20, 20, 20, 1) 100%)",
        }}
        className="text-primary"
      ></motion.div>
      <div className="w-full h-screen absolute top-0 bg-transparent z-50">
        <button className="h-10 w-10 z-50 bg-blue-400 absolute top-32 lef-96"
        onClick={()=>console.log("hello")}></button>
      </div>
    </>
  );
}
