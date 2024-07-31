import React, { useRef, useCallback } from "react";
import Draggable from "react-draggable";
import { generateInitials } from "../user/UserProfile";
import { useParams } from "react-router-dom";
import RightClick from "../utilities/RightClick";

const TitleBar = ({ toggleBrowser }) => (
  <div className="title-bar">
    <div className="text-white h-9 w-full flex justify-end select-none">
      <div className="h-full w-full">
        <RightClick />
      </div>
      <div
        className="material-symbols-outlined hover:bg-neutral-800 mb-2 w-11 flex justify-center items-center text-xl"
        onClick={toggleBrowser}
      >
        minimize
      </div>
      <div className="material-symbols-outlined hover:bg-neutral-800 mb-2 w-11 flex justify-center items-center text-sm">
        check_box_outline_blank
      </div>
      <div
        className="material-symbols-outlined hover:bg-red-700 mb-2 w-12 flex justify-center items-center text-xl"
        onClick={toggleBrowser}
      >
        close
      </div>
    </div>
  </div>
);

const AddressBar = ({ name }) => (
  <div className="flex bg-neutral-800 w-full h-10 border-neutral-700 border-b-[1.5px] mt-1">
    <div className="flex py-1 w-28 justify-around">
      <div className="material-symbols-outlined font-extralight text-xl opacity-45">arrow_back</div>
      <div className="material-symbols-outlined font-extralight text-xl opacity-45">arrow_forward</div>
      <div className="material-symbols-outlined font-extralight text-xl hover:bg-neutral-600 rounded-xl hover:bg-opacity-50">
        refresh
      </div>
    </div>
    <div className="w-[48vw] my-1.5 rounded-xl bg-neutral-700 relative">
      <div className="opacity-50 text-left pl-3 flex items-center h-full">
        <span className="material-symbols-outlined text-[20px] pr-3">search</span>
        Search Google or type a URL
      </div>
      <div className="absolute right-2 top-0 text-lg opacity-80 material-symbols-outlined">star</div>
    </div>
    <div className="avatar placeholder flex justify-center items-center ml-6">
      <div className="bg-blue-500 text-white rounded-full w-6 h-6">
        {name && <div className="text-white text-md font-normal">{generateInitials(name)}</div>}
      </div>
    </div>
    <img src="/images/options/dots.png" alt="options" className="h-4 w-4 rotate-90 m-2.5 opacity-60" />
  </div>
);

const TabBar = () => (
  <div className="absolute bg-neutral-800 top-[6.5px] h-[2em] left-[6px] w-60 rounded-t-lg flex">
    <div className="flex justify-between items-center w-full">
      <div className="pl-2 text-sm">New Tab</div>
      <div className="material-symbols-outlined hover:bg-neutral-800 m-0.5 w-6 rounded-md flex justify-center items-center text-lg">
        close
      </div>
    </div>
    <div className="material-symbols-outlined absolute left-60 ml-0.5 h-7 w-8 flex justify-center hover:bg-neutral-800 rounded-md items-center text-xl">
      add
    </div>
  </div>
);

function Browser({ isAppOpen, toggleBrowser, bounds }) {
  const explorerRef = useRef(null);
  const homeUrl = "https://www.google.com/webhp?igu=1";
  const { name } = useParams();

  const handleCloseBrowser = useCallback(() => {
    toggleBrowser();
  }, [toggleBrowser]);

  return (
    <>
      <div className={`${isAppOpen ? "" : "hidden"} z-30 w-full h-screen pointer-events-none absolute`}>
        <Draggable handle=".title-bar" nodeRef={explorerRef} bounds={bounds}>
          <div
            ref={explorerRef}
            className="window bg-black h-[45rem] w-[70.5rem] rounded-xl overflow-hidden border-neutral-700 border-[1.5px] pointer-events-auto"
          >
            <TitleBar toggleBrowser={handleCloseBrowser} />
            <div className="content text-white select-none text-center">
              <TabBar />
              <AddressBar name={name} />
              <div className="h-[50em]">
                <div className="h-full w-full flex flex-col flex-grow">
                  <iframe src={homeUrl} className="flex-grow" id="chrome-screen" title="Chrome Url"></iframe>
                </div>
              </div>
            </div>
          </div>
        </Draggable>
      </div>
    </>
  );
}

export default Browser;