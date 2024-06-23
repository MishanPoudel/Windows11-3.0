import React, { useState } from "react";
import Explorer from "../components/Explorer";
import Taskbar from "../components/Taskbar";
import RightClick from "../components/RightClick";
import StartMenu from "../components/StartMenu";
import Browser from "../components/Browser";
import Calculator from "../components/Calculator";
import VsCode from "../components/VsCode";
import Slider from "../components/Slider";

function Main() {
  const [isStartOpen, setisStartOpen] = useState(false);
  const [isExplorerOpen, setisExplorerOpen] = useState(false);
  const [isBrowserOpen, setisBrowserOpen] = useState(false);
  const [isCalculatorOpen, setisCalculatorOpen] = useState(false);
  const [isVsCodeOpen, setisVsCodeOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [aboutMe, setAboutMe] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleStart = () => {
    setisStartOpen(!isStartOpen);
  };
  const toggleExplorer = (input) => {
    setisExplorerOpen(!isExplorerOpen);
    setAboutMe(input);
  };
  const toggleBrowser = () => {
    setisBrowserOpen(!isBrowserOpen);
  };
  const toggleCalculator = () => {
    setisCalculatorOpen(!isCalculatorOpen);
  };
  const toggleVsCode = () => {
    setisVsCodeOpen(!isVsCodeOpen);
  };

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const bounds = {
    left: 0,
    top: 0,
    right: screenWidth-1128,
    bottom: screenHeight-624,
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
              <div
                className="w-[5em] h-full flex flex-col justify-center items-center rounded-md hover:bg-white hover:bg-opacity-20 p-2 select-none"
                onDoubleClick={() => {
                  toggleExplorer(false);
                }}
              >
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
              <div
                className="w-[5em] h-full flex flex-col justify-center items-center rounded-md hover:bg-white hover:bg-opacity-20 p-2 select-none"
                onDoubleClick={toggleBrowser}
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
                onDoubleClick={toggleCalculator}
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
                onDoubleClick={toggleVsCode}
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
          <StartMenu isStartOpen={isStartOpen} toggleStart={toggleStart} />
          <Browser
            isAppOpen={isBrowserOpen}
            toggleBrowser={toggleBrowser}
            bounds={bounds}
          />
          <Explorer
            toggleExplorer={toggleExplorer}
            isExplorerOpen={isExplorerOpen}
            aboutMe={aboutMe}
            bounds={bounds}
          />
          <Calculator
            bounds={bounds}
            isAppOpen={isCalculatorOpen}
            toggleCalculator={toggleCalculator}
          />
          <VsCode
            isAppOpen={isVsCodeOpen}
            toggleVsCode={toggleVsCode}
            bounds={bounds}
          />
        </div>
        <Taskbar toggleStart={toggleStart} toggleExplorer={toggleExplorer} />
      </div>
      <Slider
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        toggleMenu={toggleMenu}
      />
    </>
  );
}

export default Main;
