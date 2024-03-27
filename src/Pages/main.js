import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Explorer from "../components/Explorer";
import Taskbar from "../components/Taskbar";
import RightClick from "../components/RightClick";
import StartMenu from "../components/StartMenu";
import Browser from "../components/Browser";
import Calculator from "../components/Calculator";

function Main() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isStartOpen, setisStartOpen] = useState(false);
  const [isExplorerOpen, setisExplorerOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [funFact, setFunFact] = useState("");
  const [isBrowserOpen, setisBrowserOpen] = useState(false);
  const [isCalculatorOpen, setisCalculatorOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleStart = () => {
    setisStartOpen(!isStartOpen);
  };
  const toggleExplorer = () => {
    setisExplorerOpen(!isExplorerOpen);
  };
  const toggleBrowser = () => {
    setisBrowserOpen(!isBrowserOpen);
    setisCalculatorOpen(false); 
  };
  const toggleCalculator = () => {
    setisCalculatorOpen(!isCalculatorOpen);
    setisBrowserOpen(false);
  };

  return (
    <>
      <div className="relative h-screen">
        <div className="relative h-full w-full top-0 left-0 z-10 text-white">
          <RightClick />
          <div className="grid grid-cols-2 h-[80vh] grid-rows-8 gap-2 absolute top-2 left-2">
            <div className="row-start-1">
              <div
                className="w-[5em] h-full flex flex-col justify-center items-center rounded-md hover:bg-white hover:bg-opacity-20 p-2 select-none"
                onDoubleClick={toggleBrowser}
              >
                <img
                  src="/images/apps/chrome.png"
                  alt="edge"
                  className="w-18 h-18"
                />
                <div className="text-balance text-center text-sm">
                  Google Chrome
                </div>
              </div>
            </div>
            <div className="row-start-2">
              <div className="w-[5em] h-full flex flex-col justify-center items-center rounded-md hover:bg-white hover:bg-opacity-20 p-2 select-none">
                <img
                  src="/images/apps/folder.png"
                  alt="edge"
                  className="w-18 h-18"
                />
                <div className="text-balance text-center text-sm">
                  About Mishan
                </div>
              </div>
            </div>
            <div className="row-start-3">
              <div className="w-[5em] h-full flex flex-col justify-center items-center rounded-md hover:bg-white hover:bg-opacity-20 p-2 select-none">
                <img
                  src="/images/apps/recyclebin.png"
                  alt="edge"
                  className="w-16 h-16"
                />
                <div className="text-balance text-center text-xs">
                  Recycle Bin
                </div>
              </div>
            </div>
            <div className="row-start-4">
              <div className="w-[5em] h-full flex flex-col justify-center items-center rounded-md hover:bg-white hover:bg-opacity-20 p-2 select-none">
                <img
                  src="/images/apps/edge.png"
                  alt="edge"
                  className="w-11 h-11"
                />
                <div className="text-balance text-center text-sm">
                  Microsoft Edge
                </div>
              </div>
            </div>
            <div className="row-start-5">
              <div
                className="w-[5em] h-full flex flex-col justify-center items-center rounded-md hover:bg-white hover:bg-opacity-20 p-2 select-none"
                onDoubleClick={toggleCalculator}
              >
                <img
                  src="/images/apps/calculator.png"
                  alt="edge"
                  className="w-11 h-11"
                />
                <div className="text-balance text-center text-sm pt-2">
                  Calculator
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`absolute top-0 flex justify-center items-center w-full h-full`}
        >
          <StartMenu
            isStartOpen={isStartOpen}
            toggleMenu={toggleMenu}
            toggleStart={toggleStart}
          />
          <Browser isAppOpen={isBrowserOpen} toggleBrowser={toggleBrowser} />
          <Explorer
            toggleExplorer={toggleExplorer}
            isExplorerOpen={isExplorerOpen}
          />
          <Calculator
            isAppOpen={isCalculatorOpen}
            toggleCalculator={toggleCalculator}
          />
        </div>
        <Taskbar toggleStart={toggleStart} toggleExplorer={toggleExplorer} />
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
            background:
              "url(https://img.wallpapersafari.com/desktop/1440/900/11/85/Ra8DH9.jpg)",
            backgroundSize: "100% 100%",
          }}
        >
          <div className="relative flex flex-col justify-center h-full text-primary">
            <div className="absolute flex flex-col items-center w-[100vw] top-32 text-white">
              <div className=" text-9xl font-bold">
                {formatTime(currentTime)}
              </div>
              <div className="font-semibold text-4xl mt-5">
                {formatDate(currentTime)}
              </div>
              <div className="font-semibold text-xl mt-40 w-72 flex justify-center flex-col items-center">
                Did you know? <div className="mt-3">{funFact}</div>
              </div>
            </div>
            <div className="absolute flex top-0 justify-between w-full h-full py-12 px-32 text-white">
              <Link
                to={"https://google.com"}
                className="btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined">search</span>
              </Link>
              <Link
                to={
                  "https://i.pinimg.com/564x/3a/08/4e/3a084e04a46b5f0cdf09fec54659dc07.jpg"
                }
                className="btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined">photo_camera</span>
              </Link>
            </div>
          </div>
        </motion.nav>
      </div>
    </>
  );
}

export default Main;
