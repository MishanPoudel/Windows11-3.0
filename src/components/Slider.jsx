import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Slider({ isMenuOpen, toggleMenu, setIsMenuOpen }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [funFact, setFunFact] = useState("");

  useEffect(() => {
    const fetchFunFact = () => {
      fetch("https://uselessfacts.jsph.pl/random.json?language=en")
        .then((response) => response.json())
        .then((data) => setFunFact(data.text))
        .catch((error) => console.error("Error fetching fun fact:", error));
    };

    const intervalID = setInterval(fetchFunFact, 10000);
    fetchFunFact();

    return () => clearInterval(intervalID);
  }, []);

  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     if (document.hidden) {
  //       setIsMenuOpen(true);
  //     }
  //   };

  //   document.addEventListener("visibilitychange", handleVisibilityChange);

  //   return () => {
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //   };
  // }, [setIsMenuOpen]);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  const formatDate = (date) => {
    const options = { weekday: "long", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const formatTime = (time) => {
    const options = { hour: "2-digit", minute: "2-digit", hour12: false };
    return time.toLocaleTimeString([], options);
  };

  return (
    <motion.nav
      transition={{
        type: "spring",
        damping: 200,
        stiffness: 1000,
      }}
      initial={{
        y: "-100%",
      }}
      animate={{
        y: isMenuOpen ? "0%" : "-100%",
      }}
      className="fixed inset-0 bg-black h-full w-full z-50"
      onClick={(e) => {
        e.stopPropagation();
        toggleMenu();
      }}
      style={{
        background: "url(https://images8.alphacoders.com/134/1346089.png)",
        backgroundSize: "100% 100%",
      }}
    >
      <div className="relative flex flex-col justify-center h-full text-primary">
        <div className="absolute flex flex-col items-center w-[100vw] top-32 text-white">
          <div className=" text-9xl font-bold">{formatTime(currentTime)}</div>
          <div className="font-semibold text-4xl mt-5">
            {formatDate(currentTime)}
          </div>
          <div className="font-semibold text-xl mt-40 w-72 flex justify-center flex-col items-center">
            Did you know? <div className="mt-3">{funFact}</div>
          </div>
        </div>
        <div className="absolute flex top-0 justify-between w-full h-full py-12 px-32 text-white">
          <a
            href="https://google.com"
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="material-symbols-outlined">search</div>
          </a>
          <a
            href="https://i.pinimg.com/564x/3a/08/4e/3a084e04a46b5f0cdf09fec54659dc07.jpg"
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="material-symbols-outlined">photo_camera</div>
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
