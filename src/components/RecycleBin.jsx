import React, { useRef } from "react";
import Draggable from "react-draggable";

const RecycleBin = () => {
  const explorerRef = useRef(null);

  return (
    <div className={`${isExplorerOpen ? "" : "hidden"} z-30 absolute`}>
      <Draggable handle=".title-bar" nodeRef={explorerRef}>
        <div
          ref={explorerRef}
          className="window bg-black h-[39rem] w-[70.5rem] rounded-xl overflow-hidden border-neutral-700 border-[1.5px]"
        >
          <div className="title-bar">
            <div className="text-white h-9 w-full flex justify-end select-none">
              <div className="material-symbols-outlined hover:bg-neutral-800 mb-2 w-11 flex justify-center items-center text-xl">
                minimize
              </div>
              <div className="material-symbols-outlined hover:bg-neutral-800 mb-2 w-11 flex justify-center items-center text-sm">
                check_box_outline_blank
              </div>
              <div
                className="material-symbols-outlined hover:bg-red-700 mb-2 w-12 flex justify-center items-center text-xl"
                onClick={toggleExplorer}
              >
                close
              </div>
            </div>
          </div>
          <div className="content text-white select-none text-center">
            <div className="absolute bg-neutral-800 top-[6.5px] h-[2em] left-[6px] w-60 rounded-t-lg flex">
              <div className="flex justify-between items-center w-full">
                <div className="pl-2 text-sm">this iswhat it is</div>
                <div className="material-symbols-outlined hover:bg-neutral-800 m-0.5 w-6 rounded-md flex justify-center items-center text-lg">
                  close
                </div>
              </div>
              <div className="material-symbols-outlined absolute left-60 ml-0.5 h-7 w-8 flex justify-center hover:bg-neutral-800 rounded-md items-center text-xl">
                add
              </div>
            </div>
            <div className="bg-neutral-800 w-full h-12 border-neutral-700 border-b-[1.5px] mt-1">
              jhsdf
            </div>
            <div className="bg-neutral-900 w-full h-[3.4rem] border-neutral-700 border-b-[1.5px]">
              jhsdf
            </div>
            <div className="flex flex-row h-full bg-neutral-900">
              <div className="w-40 h-[100vh] pt-2 border-neutral-700 border-r-[1.5px]">
                this is a sidebar
              </div>
              <div className="border-0 ml-5 mt-2">this is content area</div>
            </div>

            <div className="absolute bottom-0 h-5 bg-neutral-900 w-full text-xs py-1">
              <div className="flex items-center justify-center w-16 border-r-[1.5px] h-full">
                5 items
              </div>
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default RecycleBin;
