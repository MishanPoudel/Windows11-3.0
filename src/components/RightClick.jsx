import React, { useState } from "react";

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
          className="context-menu"
          style={{
            left: contextMenuPosition.x,
            top: contextMenuPosition.y,
            position: "absolute",
          }}
        >
          <div className="w-[15rem] bg-neutral-800 border-[1px] border-neutral-700 rounded-xl p-1.5">
            {option ? (
              <>
                <div className="hover:bg-neutral-700 rounded-md whitespace-nowrap w-full h-7 select-none flex items-center justify-between px-1">
                  <div>
                    <div></div>
                    <div className="justify-center">View</div>
                  </div>
                  <div className="material-symbols-outlined rotate-[-90deg] justify-end opacity-50 font-extralight">
                    expand_more
                  </div>
                </div>
                <div className="hover:bg-neutral-700 rounded-md whitespace-nowrap w-full h-7 select-none flex items-center justify-between px-1">
                  <div>
                    <div></div>
                    <div className="justify-center">Sort by</div>
                  </div>
                  <div className="material-symbols-outlined rotate-[-90deg] justify-end opacity-50 font-extralight">
                    expand_more
                  </div>
                </div>
                <div
                  className="hover:bg-neutral-700 rounded-md whitespace-nowrap w-full h-7 select-none flex items-center justify-between px-1"
                  onClick={handleClick}
                >
                  <div>
                    <div></div>
                    <div className="justify-center">Refresh</div>
                  </div>
                </div>
                <div className="divider m-0"></div>
                <div className="hover:bg-neutral-700 rounded-md whitespace-nowrap w-full h-7 select-none flex items-center justify-between px-1">
                  <div>
                    <div></div>
                    <div className="justify-center">New</div>
                  </div>
                  <div className="material-symbols-outlined rotate-[-90deg] justify-end opacity-50 font-extralight">
                    expand_more
                  </div>
                </div>
                <div className="divider m-0"></div>
                <div className="hover:bg-neutral-700 rounded-md whitespace-nowrap w-full h-7 select-none flex items-center justify-between px-1">
                  <div>
                    <div></div>
                    <div className="justify-center">Display Settings</div>
                  </div>
                </div>
                <div className="hover:bg-neutral-700 rounded-md whitespace-nowrap w-full h-7 select-none flex items-center justify-between px-1">
                  <div>
                    <div></div>
                    <div className="justify-center">Personalize</div>
                  </div>
                </div>
                <div className="hover:bg-neutral-700 rounded-md whitespace-nowrap w-full h-7 select-none flex items-center justify-between px-1">
                  <div>
                    <div></div>
                    <div className="justify-center">Show More Options</div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="hover:bg-neutral-700 rounded-md whitespace-nowrap w-full h-7 select-none flex items-center justify-between px-1">
                  <div>
                    <div></div>
                    <div className="justify-center">Meow</div>
                  </div>
                  <div className="material-symbols-outlined rotate-[-90deg] justify-end opacity-50 font-extralight">
                    expand_more
                  </div>
                </div>
                <div className="hover:bg-neutral-700 rounded-md whitespace-nowrap w-full h-7 select-none flex items-center justify-between px-1">
                  <div>
                    <div></div>
                    <div className="justify-center">Meow</div>
                  </div>
                  <div className="material-symbols-outlined rotate-[-90deg] justify-end opacity-50 font-extralight">
                    expand_more
                  </div>
                </div>
                <div
                  className="hover:bg-neutral-700 rounded-md whitespace-nowrap w-full h-7 select-none flex items-center justify-between px-1"
                  onClick={handleClick}
                >
                  <div>
                    <div></div>
                    <div className="justify-center">Meow</div>
                  </div>
                </div>
                <div className="divider m-0"></div>
                <div className="hover:bg-neutral-700 rounded-md whitespace-nowrap w-full h-7 select-none flex items-center justify-between px-1">
                  <div>
                    <div></div>
                    <div className="justify-center">Meow</div>
                  </div>
                  <div className="material-symbols-outlined rotate-[-90deg] justify-end opacity-50 font-extralight">
                    expand_more
                  </div>
                </div>
                <div className="divider m-0"></div>
                <div className="hover:bg-neutral-700 rounded-md whitespace-nowrap w-full h-7 select-none flex items-center justify-between px-1">
                  <div>
                    <div></div>
                    <div className="justify-center">Meow</div>
                  </div>
                </div>
                <div className="hover:bg-neutral-700 rounded-md whitespace-nowrap w-full h-7 select-none flex items-center justify-between px-1">
                  <div>
                    <div></div>
                    <div className="justify-center">Meow</div>
                  </div>
                </div>
                <div className="hover:bg-neutral-700 rounded-md whitespace-nowrap w-full h-7 select-none flex items-center justify-between px-1">
                  <div>
                    <div></div>
                    <div className="justify-center">Show More Options</div>
                  </div>
                </div>
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
