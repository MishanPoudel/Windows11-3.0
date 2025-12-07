import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MdSearch, MdPhotoCamera } from "react-icons/md";

export default function Slider({ isMenuOpen, toggleMenu }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [funFact, setFunFact] = useState("");
  const [hasFetchedInitial, setHasFetchedInitial] = useState(false);

  // Fetch fun fact only once on mount and when slider is opened
  useEffect(() => {
    const fetchFunFact = async () => {
      try {
        const response = await fetch(
          "https://uselessfacts.jsph.pl/random.json?language=en"
        );
        const data = await response.json();
        setFunFact(data.text);
      } catch (error) {
        console.error("Error fetching fun fact:", error);
      }
    };

    // Fetch initial fact once
    if (!hasFetchedInitial) {
      fetchFunFact();
      setHasFetchedInitial(true);
      return;
    }

    // Only fetch new facts when slider is open
    if (!isMenuOpen) return;

    const intervalID = setInterval(fetchFunFact, 10000);

    return () => clearInterval(intervalID);
  }, [isMenuOpen, hasFetchedInitial]);

  useEffect(() => {
    const updateTime = () => setCurrentTime(new Date());
    const intervalID = setInterval(updateTime, 1000);

    return () => clearInterval(intervalID);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !isMenuOpen) {
        toggleMenu();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [toggleMenu, isMenuOpen]);

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
      transition={{ type: "spring", damping: 200, stiffness: 1000 }}
      initial={{ y: "-100%" }}
      animate={{ y: isMenuOpen ? "0%" : "-110%" }}
      className="fixed inset-0 bg-black h-full w-full z-50"
      onClick={(e) => {
        e.stopPropagation();
        toggleMenu();
      }}
      style={{
        background: "url(https://images8.alphacoders.com/134/1346089.png)",
        backgroundSize: "cover",
      }}
    >
      <div className="relative flex flex-col justify-center h-full text-primary">
        <div className="absolute flex flex-col items-center w-full top-32 text-white">
          <div className="text-9xl font-bold">{formatTime(currentTime)}</div>
          <div className="font-semibold text-4xl mt-5">
            {formatDate(currentTime)}
          </div>
        </div>
        <div className="absolute bottom-56 left-0 right-0 text-white">
          <div className="text-sm font-light opacity-70 mb-2 text-center">Did you know?</div>
          <div className="text-sm font-light max-w-md mx-auto px-4 text-center min-h-[60px]">
            {funFact}
          </div>
        </div>
        <div className="absolute top-0 flex justify-between w-full h-full py-12 px-32 text-white">
          <a
            href="https://google.com"
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Google"
          >
            <div>
              <MdSearch />
            </div>
          </a>
          <a
            href="https://i.pinimg.com/564x/3a/08/4e/3a084e04a46b5f0cdf09fec54659dc07.jpg"
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Photo"
          >
            <div>
              <MdPhotoCamera />
            </div>
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
