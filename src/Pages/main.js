import React, { useState } from "react";
import Explorer from "../components/Explorer";
import Taskbar from "../components/Taskbar";
import RightClick from "../components/RightClick";
import StartMenu from "../components/StartMenu";
import Browser from "../components/Browser";
import Calculator from "../components/Calculator";
import VsCode from "../components/VsCode";
import Slider from "../components/Slider";
import RecycleBin from "../components/RecycleBin";

function Main() {
  const [windows, setWindows] = useState({
    menu: false,
    start: false,
    explorer: false,
    browser: false,
    calculator: false,
    vscode: false,
    recycle: false,
  });

  const [aboutMe, setAboutMe] = useState(null);

  const toggleWindow = (window, input = null) => {
    setWindows({
      menu: false,
      start: false,
      explorer: false,
      browser: false,
      calculator: false,
      vscode: false,
      recycle: false,
      [window]: !windows[window],
    });

    if (window === "explorer" && input !== null) {
      setAboutMe(input);
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

  return (
    <>
      <div className="relative h-screen">
        <div className="relative h-full w-full top-0 left-0 z-10 text-white">
          <RightClick option={true} />
          <div className="grid grid-cols-2 h-[80vh] grid-rows-8 gap-2 absolute top-2 left-2">
            <div className="row-start-1">
              <div
                className="w-[5em] h-full flex flex-col justify-center items-center rounded-md hover:bg-white hover:bg-opacity-20 p-2 select-none"
                onDoubleClick={() => toggleWindow("browser")}
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
              <div
                className="w-[5em] h-full flex flex-col justify-center items-center rounded-md hover:bg-white hover:bg-opacity-20 p-2 select-none"
                onDoubleClick={() => toggleWindow("explorer", false)}
              >
                <img
                  src="/images/apps/folder.png"
                  alt="edge"
                  className="w-18 h-18"
                />
                <div className="text-balance text-center text-sm">About Me</div>
              </div>
            </div>
            <div className="row-start-3">
              <div
                className="w-[5em] h-full flex flex-col justify-center items-center rounded-md hover:bg-white hover:bg-opacity-20 p-2 select-none"
                onDoubleClick={() => toggleWindow("recycle")}
              >
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
              <div
                className="w-[5em] h-full flex flex-col justify-center items-center rounded-md hover:bg-white hover:bg-opacity-20 p-2 select-none"
                onDoubleClick={() => toggleWindow("browser")}
              >
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
                onDoubleClick={() => toggleWindow("calculator")}
              >
                <img
                  src="/images/apps/calculator.png"
                  alt="calc"
                  className="w-11 h-11"
                />
                <div className="text-balance text-center text-sm pt-2">
                  Calculator
                </div>
              </div>
            </div>
            <div className="row-start-6">
              <div
                className="w-[5em] h-full flex flex-col justify-center items-center rounded-md hover:bg-white hover:bg-opacity-20 p-2 select-none"
                onDoubleClick={() => toggleWindow("vscode")}
              >
                <img
                  src="https://laaouatni.github.io/w11CSS/images/vs-code.ico"
                  alt="vscode"
                  className="w-8 h-8"
                />
                <div className="text-balance text-center text-sm pt-2">
                  VS Code
                </div>
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
