import React, { useState } from "react";

const MenuItem = ({ text, onClick, showArrow = false }) => (
  <div
    className="hover:bg-neutral-700 rounded-md whitespace-nowrap w-full h-7 select-none flex items-center justify-between px-1"
    onClick={onClick}
  >
    <div className="justify-center">{text}</div>
    {showArrow && (
      <div className="material-symbols-outlined rotate-[-90deg] justify-end opacity-50 font-extralight">
        expand_more
      </div>
    )}
  </div>
);

function RightClick({ option }) {
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [showContextMenu, setShowContextMenu] = useState(false);

  const handleContextMenu = (event) => {
    event.preventDefault();
    const x = event.clientX;
    const y = event.clientY;
    const menuWidth = 240;
    const menuHeight = 290;

    const newX =
      x + menuWidth > window.innerWidth ? window.innerWidth - menuWidth : x;
    const newY =
      y + menuHeight > window.innerHeight ? window.innerHeight - menuHeight : y;

    setContextMenuPosition({ x: newX, y: newY });
    setShowContextMenu(true);
  };

  const handleClick = () => {
    setShowContextMenu(false);
  };

  return (
    <div>
      {showContextMenu && (
        <div
          className="context-menu z-10 menu p-2 shadow rounded-xl bg-neutral-800 border-neutral-700 border-2 absolute"
          style={{ left: contextMenuPosition.x, top: contextMenuPosition.y }}
          role="menu"
          aria-labelledby="context-menu"
        >
          <div className="w-[15rem] text-gray-300">
            {option ? (
              <>
                <MenuItem text="View" showArrow />
                <MenuItem text="Sort by" showArrow />
                <MenuItem text="Refresh" onClick={handleClick} />
                <div className="divider m-0"></div>
                <MenuItem text="New" showArrow />
                <div className="divider m-0"></div>
                <MenuItem text="Display Settings" />
                <MenuItem text="Personalize" />
                <MenuItem text="Show More Options" />
              </>
            ) : (
              <>
                <MenuItem text="Meow" showArrow />
                <MenuItem text="Meow" showArrow />
                <MenuItem text="Meow" onClick={handleClick} />
                <div className="divider m-0"></div>
                <MenuItem text="Meow" showArrow />
                <div className="divider m-0"></div>
                <MenuItem text="Meow" />
                <MenuItem text="Meow" />
                <MenuItem text="Meow" />
              </>
            )}
          </div>
        </div>
      )}

      <div
        id="content"
        onContextMenu={handleContextMenu}
        onClick={handleClick}
        className="w-full h-full"
      ></div>
    </div>
  );
}

export default RightClick;
