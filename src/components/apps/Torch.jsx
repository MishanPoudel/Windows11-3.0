import React, { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Torch({ input, setInput }) {
  const cursorSize = 7000;
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };

  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  const [showTorch, setShowTorch] = useState(false);
  const [showIntermediate, setShowIntermediate] = useState(false);
  const [randomPosition, setRandomPosition] = useState({
    top: "50%",
    left: "50%",
  });

  const audio = useMemo(() => new Audio("/audio/switch.mp3"), []);

  useEffect(() => {
    audio.load();

    const manageMouseMove = (e) => {
      const { clientX, clientY } = e;
      mouse.x.set(clientX - cursorSize / 2);
      mouse.y.set(clientY - cursorSize / 2);
    };

    window.addEventListener("mousemove", manageMouseMove);

    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
    };
  }, [mouse.x, mouse.y, cursorSize, audio]);

  useEffect(() => {
    let timeoutId1;
    let timeoutId2;

    if (input === "close") {
      setShowIntermediate(true);
      const randomTop =
        Math.floor(Math.random() * (window.innerHeight - 50)) + "px";
      const randomLeft =
        Math.floor(Math.random() * (window.innerWidth - 50)) + "px";
      setRandomPosition({ top: randomTop, left: randomLeft });

      timeoutId1 = setTimeout(() => {
        setShowIntermediate(false);
        setShowTorch(true);
      }, 3000);
    } else {
      setShowIntermediate(false);
      setShowTorch(false);
    }

    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
    };
  }, [input]);

  const playSound = () => {
    audio.play().catch((error) => {
      console.error("Failed to play audio:", error);
    });
  };

  return (
    <main className="cursor-custom w-full h-full">
      {showIntermediate && (
        <div className="w-full h-screen bg-white absolute top-0 z-50 flex justify-center items-center text-black font-bold text-5xl flex-col">
          why would you close the window :C
          <span className="block">
            now find the switch and open the window AGAIN!!!
          </span>
        </div>
      )}
      {showTorch && (
        <>
          <motion.div
            style={{
              zIndex: 1000,
              left: smoothMouse.x,
              top: smoothMouse.y,
              height: cursorSize,
              width: cursorSize,
              position: "fixed",
              pointerEvents: "none",
              visibility: "visible",
              background:
                "radial-gradient(circle at 50% 50%, rgba(20, 20, 20, 0) 0%, rgba(20, 20, 20, 0.4) 1.25%, rgba(20, 20, 20, 0.6) 1.5%, rgba(20, 20, 20, 0.9) 1.875%, rgba(20, 20, 20, 1) 2.5%, rgba(20, 20, 20, 1) 100%)",
            }}
            className="text-primary"
          ></motion.div>
          <div className="w-full h-screen absolute top-0 bg-transparent z-50">
            <img
              src="images/apps/switch.png"
              alt="switch"
              className="h-10 w-10 z-50 absolute hover:cursor-pointer"
              style={{ top: randomPosition.top, left: randomPosition.left }}
              onClick={() => {
                playSound();
                setInput(null);
              }}
              role="button"
              aria-label="Find the switch to reopen the window"
            />
          </div>
        </>
      )}
    </main>
  );
}