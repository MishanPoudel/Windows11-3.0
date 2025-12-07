import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { MdMinimize, MdCheckBoxOutlineBlank, MdClose } from "react-icons/md";

function VsCode({ isAppOpen, toggleVsCode, bounds, isActive = false, bringToFront, isMinimized = false, minimizeWindow }) {
  const [contentLoaded, setContentLoaded] = useState(false);
  const windowRef = React.useRef(null);

  useEffect(() => {
    if (isAppOpen && !contentLoaded) {
      setContentLoaded(true);
    }
  }, [isAppOpen, contentLoaded]);

  return (
    <div className={`${isAppOpen && !isMinimized ? "" : "hidden"} ${isActive ? 'z-40' : 'z-30'} w-full h-screen pointer-events-none absolute transition-none`}>
      <Draggable handle=".title-bar" nodeRef={windowRef} bounds={bounds}>
        <div
          ref={windowRef}
          className="window bg-black h-[45rem] w-[70.5rem] rounded-xl overflow-hidden border-neutral-700 border-[1.5px] font-semibold pointer-events-auto"
          onMouseDown={bringToFront}
        >
          <div className="title-bar flex justify-between items-center bg-neutral-800 text-white h-9 select-none">
            <div className="ml-4 font-normal">Visual Studio Code</div>
            <div className="flex">
              <button
                className="hover:bg-neutral-700 w-11 h-9 flex justify-center items-center text-xl"
                onClick={minimizeWindow}
                aria-label="Minimize"
              >
                <MdMinimize />
              </button>
              <button
                className="hover:bg-neutral-700 w-11 h-9 flex justify-center items-center text-sm"
                aria-label="Maximize"
              >
                <MdCheckBoxOutlineBlank />
              </button>
              <button
                className="hover:bg-red-700 w-12 h-9 flex justify-center items-center text-xl"
                onClick={toggleVsCode}
                aria-label="Close"
              >
                <MdClose />
              </button>
            </div>
          </div>
          <div className="content text-white select-none text-center flex justify-center h-full">
            {contentLoaded && (
              <iframe
                src="https://github1s.com/MishanPoudel/Windows11-3.0/blob/main/src/Pages/main.js"
                title="VsCode"
                className="h-full w-full bg-ub-cool-grey"
              ></iframe>
            )}
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default VsCode;