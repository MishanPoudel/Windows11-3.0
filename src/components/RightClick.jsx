import React, { useState } from "react";

function RightClick() {
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [showContextMenu, setShowContextMenu] = useState(false);

  const handleContextMenu = (event) => {
    event.preventDefault();
    const x = event.clientX;
    const y = event.clientY;
    setContextMenuPosition({ x, y });
    setShowContextMenu(true);
  };

  const handleClick = () => {
    setShowContextMenu(false);
  };

  return (
    <div>
      {showContextMenu && (
        <div
          className="context-menu"
          style={{ left: contextMenuPosition.x, top: contextMenuPosition.y }}
        >
          <div className="w-[21rem] bg-neutral-800 border-[1px] border-neutral-700 rounded-xl p-1.5">
            <div className="hover:bg-neutral-700 rounded-md whitespace-nowrap w-full h-7 select-none flex items-center">
              <div></div>
              <div className="justify-center">View</div>
              <span className="material-symbols-outlined rotate-[-90deg] justify-end">
                expand_more
              </span>
            </div>
            <div className="hover:bg-neutral-700 rounded-md whitespace-nowrap w-full h-7 select-none flex items-center">
              sort by
            </div>
            <div
              className="hover:bg-neutral-700 rounded-md whitespace-nowrap w-full h-7 select-none flex items-center"
              onClick={handleClick}
            >
              refresh
            </div>
            <div className="hover:bg-neutral-700 rounded-md whitespace-nowrap w-full h-7 select-none flex items-center">
              new
            </div>
            <div className="hover:bg-neutral-700 rounded-md whitespace-nowrap w-full h-7 select-none flex items-center">
              display setting
            </div>
            <div className="hover:bg-neutral-700 rounded-md whitespace-nowrap w-full h-7 select-none flex items-center">
              personalize
            </div>
            <div className="hover:bg-neutral-700 rounded-md whitespace-nowrap w-full h-7 select-none flex items-center">
              show more options
            </div>
          </div>
        </div>
      )}

      <div
        id="content"
        onContextMenu={handleContextMenu}
        onClick={handleClick}
      ></div>
    </div>
  );
}

export default RightClick;
