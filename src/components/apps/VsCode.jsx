import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";

function VsCode({ isAppOpen, toggleVsCode, bounds }) {
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    if (isAppOpen && !contentLoaded) {
      setContentLoaded(true);
    }
  }, [isAppOpen, contentLoaded]);

  return (
    <div className={`${isAppOpen ? "" : "hidden"} z-30 w-full h-screen pointer-events-none absolute`}>
      <Draggable handle=".title-bar" bounds={bounds}>
        <div className="window bg-black h-[45rem] w-[70.5rem] rounded-xl overflow-hidden border-neutral-700 border-[1.5px] font-semibold pointer-events-auto">
          <div className="title-bar flex justify-between items-center bg-neutral-800 text-white h-9 select-none">
            <div className="m-1 ml-4 font-normal">Visual Studio Code</div>
            <div className="flex">
              <button
                className="material-symbols-outlined hover:bg-neutral-700 mb-2 w-11 flex justify-center items-center text-xl"
                onClick={toggleVsCode}
                aria-label="Minimize"
              >
                minimize
              </button>
              <button
                className="material-symbols-outlined hover:bg-neutral-700 mb-2 w-11 flex justify-center items-center text-sm"
                aria-label="Maximize"
              >
                check_box_outline_blank
              </button>
              <button
                className="material-symbols-outlined hover:bg-red-700 mb-2 w-12 flex justify-center items-center text-xl"
                onClick={toggleVsCode}
                aria-label="Close"
              >
                close
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