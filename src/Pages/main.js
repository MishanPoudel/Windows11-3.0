import React, { useEffect, useMemo, useState } from "react";
import Explorer from "../components/apps/Explorer";
import Taskbar from "../components/layout/Taskbar";
import RightClick from "../components/utilities/RightClick";
import StartMenu from "../components/layout/StartMenu";
import Browser from "../components/apps/Browser";
import Calculator from "../components/apps/Calculator";
import VsCode from "../components/apps/VsCode";
import Slider from "../components/utilities/Slider";
import RecycleBin from "../components/apps/RecycleBin";
import Apps from "../components/apps/Apps";
import Torch from "../components/apps/Torch";
import { motion } from "framer-motion";
import { useRef } from "react";
import appsData from "../data/data";

function Main() {
  const constraintsRef = useRef(null);
  const [isSleeping, setIsSleeping] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [actionType, setActionType] = useState(null);

  const [windows, setWindows] = useState({
    menu: false,
    start: false,
    explorer: false,
    browser: false,
    calculator: false,
    vscode: false,
    recycle: false,
    app: false,
  });

  const [aboutMe, setAboutMe] = useState(null);
  const [input, setInput] = useState(null);

  const toggleWindow = (window, input = null) => {
    setWindows({
      menu: false,
      start: false,
      explorer: false,
      browser: false,
      calculator: false,
      vscode: false,
      recycle: false,
      app: false,
      [window]: !windows[window],
    });

    if (window === "explorer" && input !== null) {
      setAboutMe(input);
    } else if (window === "app" && input !== null) {
      setInput(input);
    }
  };

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const bounds = {
    left: 0,
    top: 0,
    right: screenWidth - 1128,
    bottom: screenHeight - 624,
  };

  function handleFadeOutClick() {
    setFadeOut(true);
    setTimeout(() => {
      setIsSleeping(false);
      setFadeOut(false);
    }, 1000);
  }

  const images = useMemo(
    () => [
      "/images/fun/1.gif",
      "/images/fun/2.jpg",
      "/images/fun/3.jpg",
      "/images/fun/4.jpg",
    ],
    []
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);
  return (
    <>
      {isSleeping && (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-black transition-opacity duration-1000 ease-in-out ${
            fadeOut ? "opacity-0" : "opacity-100"
          } z-50`}
          onClick={handleFadeOutClick}
        >
          {actionType === "sleep" && (
            <div className="flex flex-col gap-4 justify-center items-center w-full h-screen">
              <img
                src={images[currentImageIndex]}
                alt="Random"
                className="w-64 h-64 object-cover rounded-lg shadow-lg"
              />
              <div>Windows is now sleeping💤</div>
              <audio src="/audio/sleep.mp3" autoPlay loop />
              <audio src="/audio/lullaby.mp3" autoPlay loop />
            </div>
          )}
          {actionType === "shutdown" && (
            <div className="flex flex-col gap-4 justify-center items-center w-full h-screen">
              <img
                src="/images/fun/xp.jpg"
                alt="Random"
                className="w-1/2 h-1/2 object-cover rounded-lg shadow-lg"
              />
              <div>BYE BYE👋🏻</div>
              <audio src="/audio/shutdown.mp3" autoPlay />
            </div>
          )}
        </div>
      )}
      <Torch input={input} setInput={setInput} />
      <div className="relative h-screen" ref={constraintsRef}>
        <div className="relative h-full w-full top-0 left-0 z-10 text-white">
          <RightClick option={true} />
          <div className="grid h-[80vh] grid-rows-8 gap-2 absolute top-2 left-2">
            {appsData.map((app, index) => (
              <motion.div
                key={app.id}
                drag
                dragConstraints={constraintsRef}
                dragMomentum={false}
                className={`row-start-${index + 1}`}
              >
                <div
                  className="w-[5em] h-full flex flex-col justify-center items-center rounded-md hover:bg-white hover:bg-opacity-20 p-2"
                  onDoubleClick={() => toggleWindow(app.action, app.subAction)}
                >
                  <img
                    src={app.icon}
                    alt={app.name}
                    className={app.size}
                    onDragStart={(e) => e.preventDefault()}
                  />
                  <div
                    className={`text-balance text-center text-sm select-none ${
                      app.name === "Recycle Bin" ? "pt-0" : "pt-2"
                    }`}
                  >
                    {app.name}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="absolute right-3 top-2">
            <div
              className="w-[5em] h-full flex-col justify-center items-center rounded-md hover:bg-white hover:bg-opacity-20 p-2 select-none hidden"
              onDoubleClick={() => toggleWindow("app", "terminal")}
            >
              <img
                src="images/apps/terminal.png"
                alt="terminal"
                className="w-10 h-10"
              />
              <div className="text-balance text-center text-sm select-none pt-2">
                Terminal
              </div>
            </div>
          </div>
        </div>
        <div
          className={`absolute top-0 flex justify-center items-center w-full h-full`}
        >
          <StartMenu
            isStartOpen={windows.start}
            toggleStart={() => toggleWindow("start")}
            setInput={setInput}
            setIsSleeping={setIsSleeping}
            setActionType={setActionType}
          />
          <Browser
            isAppOpen={windows.browser}
            toggleBrowser={() => toggleWindow("browser")}
            bounds={bounds}
          />
          <Explorer
            isExplorerOpen={windows.explorer}
            toggleExplorer={(input) => toggleWindow("explorer", input)}
            aboutMe={aboutMe}
            bounds={bounds}
          />
          <RecycleBin
            isRecycleOpen={windows.recycle}
            toggleRecycle={() => toggleWindow("recycle")}
            bounds={bounds}
          />
          <Calculator
            isAppOpen={windows.calculator}
            toggleCalculator={() => toggleWindow("calculator")}
            bounds={bounds}
          />
          <VsCode
            isAppOpen={windows.vscode}
            toggleVsCode={() => toggleWindow("vscode")}
            bounds={bounds}
          />
          <Apps
            isAppOpen={windows.app}
            toggleApp={(input) => toggleWindow("app", input)}
            bounds={bounds}
            input={input}
          />
        </div>
        <Taskbar
          toggleStart={() => toggleWindow("start")}
          toggleExplorer={(input) => toggleWindow("explorer", input)}
          toggleBrowser={() => toggleWindow("browser")}
        />
      </div>
      <Slider
        isMenuOpen={windows.menu}
        setIsMenuOpen={() => toggleWindow("menu")}
        toggleMenu={() => toggleWindow("menu")}
      />
    </>
  );
}

export default Main;
