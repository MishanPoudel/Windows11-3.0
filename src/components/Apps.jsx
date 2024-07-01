import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";

function Apps({ isAppOpen, toggleApp, bounds, input }) {
  const [contentLoaded, setContentLoaded] = useState(false);

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
          ) : (
            <>hi</>
          )}
        </Draggable>
      </div>
    </>
  );
}

export default Apps;
