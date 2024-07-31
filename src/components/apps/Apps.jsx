import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";

function Apps({ isAppOpen, toggleApp, bounds, input }) {
  const [contentLoaded, setContentLoaded] = useState(false);
  const [commands, setCommands] = useState("");
  const [output, setOutput] = useState([]);

  const handleInput = (e) => {
    if (e.key === "Enter") {
      if (input.trim() === "cls") {
        setOutput([]);
      }
      const newOutput = [...output, { commands, result: `Executed: ${input}` }];
      setOutput(newOutput);
      setCommands("");
    }
  };

  useEffect(() => {
    if (isAppOpen && !contentLoaded) {
      setContentLoaded(true);
    }
  }, [isAppOpen, contentLoaded]);

  return (
    <>
      <div
        className={`${
          isAppOpen ? "" : "hidden"
        } z-30 w-full h-screen pointer-events-none absolute`}
      >
        <Draggable handle=".title-bar" bounds={bounds}>
          {input === "emoji" ? (
            <div className="window bg-black h-[45rem] w-[70.5rem] rounded-xl overflow-hidden border-neutral-700 border-[1.5px] font-semibold pointer-events-auto">
              <div className="title-bar">
                <div className="text-white h-9 flex justify-between select-none">
                  <div className="m-1 ml-4 font-normal">Emoji TicTacToe</div>
                  <div className="flex">
                    <div
                      className="material-symbols-outlined hover:bg-neutral-800 mb-2 w-11 flex justify-center items-center text-xl"
                      onClick={toggleApp}
                    >
                      minimize
                    </div>
                    <div className="material-symbols-outlined hover:bg-neutral-800 mb-2 w-11 flex justify-center items-center text-sm">
                      check_box_outline_blank
                    </div>
                    <div
                      className="material-symbols-outlined hover:bg-red-700 mb-2 w-12 flex justify-center items-center text-xl"
                      onClick={toggleApp}
                    >
                      close
                    </div>
                  </div>
                </div>
              </div>
              <div className="content text-white select-none text-center flex justify-center h-full">
                {contentLoaded && (
                  <iframe
                    src="https://emoji-tic-tac-toe.vercel.app/"
                    title="Emoji"
                    className="h-full w-full bg-ub-cool-grey"
                  ></iframe>
                )}
              </div>
            </div>
          ) : input === "spotify" ? (
            <div className="window bg-black h-[45rem] w-[70.5rem] rounded-xl overflow-hidden border-neutral-700 border-[1.5px] font-semibold pointer-events-auto">
              <div className="title-bar">
                <div className="text-white h-9 flex justify-between select-none">
                  <div className="m-1 ml-4 font-normal">Spotify</div>
                  <div className="flex">
                    <div
                      className="material-symbols-outlined hover:bg-neutral-800 mb-2 w-11 flex justify-center items-center text-xl"
                      onClick={toggleApp}
                    >
                      minimize
                    </div>
                    <div className="material-symbols-outlined hover:bg-neutral-800 mb-2 w-11 flex justify-center items-center text-sm">
                      check_box_outline_blank
                    </div>
                    <div
                      className="material-symbols-outlined hover:bg-red-700 mb-2 w-12 flex justify-center items-center text-xl"
                      onClick={toggleApp}
                    >
                      close
                    </div>
                  </div>
                </div>
              </div>
              <div className="content text-white select-none text-center flex justify-center h-full">
                {contentLoaded && (
                  <iframe
                    title="Spotify"
                    style={{ borderRadius: "20px", border: "2px solid black" }}
                    src="https://open.spotify.com/embed/playlist/3rxbSirTaXLDgKUOKzLpYL?utm_source=generator&theme=0"
                    width="100%"
                    height="100%"
                    allowfullscreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  ></iframe>
                )}
              </div>
            </div>
          ) : input === "terminal" ? (
            <div className="window bg-neutral-800 h-[45rem] w-[70.5rem] rounded-xl overflow-hidden border-neutral-700 border-[1.5px] pointer-events-auto">
              <div className="title-bar">
                <div className="text-white h-9 w-full flex justify-end select-none">
                  <div className="h-full w-full"></div>
                  <div
                    className="material-symbols-outlined hover:bg-neutral-800 mb-2 w-11 flex justify-center items-center text-xl"
                    onClick={toggleApp}
                  >
                    minimize
                  </div>
                  <div className="material-symbols-outlined hover:bg-neutral-800 mb-2 w-11 flex justify-center items-center text-sm">
                    check_box_outline_blank
                  </div>
                  <div
                    className="material-symbols-outlined hover:bg-red-700 mb-2 w-12 flex justify-center items-center text-xl"
                    onClick={toggleApp}
                  >
                    close
                  </div>
                </div>
              </div>
              <div className="absolute bg-black top-[6.5px] h-[2em] left-[6px] w-60 rounded-t-lg flex">
                <div className="flex justify-between items-center w-full">
                  <div className="pl-2 text-sm">Windows Powershell</div>
                  <div className="material-symbols-outlined hover:bg-neutral-800 m-0.5 w-6 rounded-md flex justify-center items-center text-lg">
                    close
                  </div>
                </div>
                <div className="material-symbols-outlined absolute left-60 ml-0.5 h-7 w-8 flex justify-center hover:bg-neutral-800 rounded-md items-center text-xl">
                  add
                </div>
              </div>
              <div className="bg-black text-white h-screen p-4 font-mono">
                <div className="">Windows PowerShell</div>
                <div className="text-sm">
                  Copyright (C) Microsoft Corporation. All rights reserved.
                </div>
                <div className="my-4 flex gap-2">
                  Install the latest PowerShell for new features and
                  improvements!
                  <div className="hover:underline hover:cursor-pointer">
                    https://aka.ms/PSWindows
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {output.map((line, index) => (
                    <div key={index}>
                      <div className="">PS C:\ {line.commands}</div>
                      <div>{line.result}</div>
                    </div>
                  ))}
                </div>
                <div className="flex mt-2 gap-2">
                  <span className="">PS C:\ </span>
                  <input
                    className="bg-transparent focus:outline-none flex-1"
                    value={commands}
                    onChange={(e) => setCommands(e.target.value)}
                    onKeyDown={handleInput}
                    autoFocus
                  />
                </div>
              </div>
            </div>
          ) : (
            <>hi</>
          )}
        </Draggable>
      </div>
    </>
  );
}

export default Apps;
