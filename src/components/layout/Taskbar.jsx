import React, { useState, useEffect } from "react";

export default function Taskbar({
  toggleStart,
  toggleExplorer,
  toggleBrowser,
}) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  const formatDate = (date) => {
    const options = { month: "2-digit", day: "2-digit", year: "numeric" };
    return date.toLocaleDateString([], options).replace(/^0/, "");
  };

  const formatTime = (time) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    return time.toLocaleTimeString([], options);
  };
  return (
    <>
      <div className="fixed bottom-0 flex justify-between w-full h-[3.2rem] bg-neutral-800 border-t-[0.2px] border-neutral-700 select-none pointer-events-auto py-[0.2rem] text-white z-40">
        <div className="w-[15%]"></div>
        <div className="flex justify-center w-auto items-center">
          <div
            className="flex justify-center items-center font-semibold text-sm hover:bg-neutral-700 my-1 h-full rounded-md px-1 w-11"
            onClick={toggleStart}
          >
            <img
              src="/images/apps/windows.png"
              alt="windows_logo"
              className="h-8"
            />
          </div>
          <div
            className="flex justify-center items-center font-semibold text-sm hover:bg-neutral-700 my-1 h-full rounded-md px-1 w-11"
            onClick={() => {
              toggleExplorer(true);
            }}
          >
            <img
              src="/images/apps/explorer.png"
              alt="windows_logo"
              className="h-7"
            />
          </div>
          <div
            className="flex justify-center items-center font-semibold text-sm hover:bg-neutral-700 my-1 h-full rounded-md px-1 w-11"
            onClick={toggleBrowser}
          >
            <img
              src="/images/apps/edge.png"
              alt="windows_logo"
              className="h-8"
            />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="material-symbols-outlined h-full w-8 flex justify-center items-center rounded-lg rotate-180 hover:bg-neutral-700 font-light">
            expand_more
          </div>
          <div className="hover:bg-neutral-700 my-1 h-full flex justify-center items-center rounded-lg gap-x-1.5 px-2">
            <div className="material-symbols-outlined text-sm">wifi</div>
            <div className="material-symbols-outlined text-lg">volume_up</div>
            <div className="material-symbols-outlined text-lg rotate-180">
              battery_low
            </div>
          </div>
          <div className="flex justify-center items-center font-semibold text-sm hover:bg-neutral-700 my-1 h-full rounded-lg px-2">
            <div className="flex flex-col items-end text-[0.80em] ml-1">
              <div>{formatTime(currentTime)}</div>
              <div>{formatDate(currentTime)}</div>
            </div>
            <div className="material-symbols-outlined text-xl ml-1">
              notifications
            </div>
          </div>
          <div className="group w-3 h-full flex justify-center items-center">
            <button className="hidden group-hover:block text-neutral-400 text-md h-full w-full pointer-events-none">
              |
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
