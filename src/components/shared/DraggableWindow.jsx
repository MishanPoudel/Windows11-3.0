import React from "react";
import PropTypes from "prop-types";
import Draggable from "react-draggable";
import WindowTitleBar from "./WindowTitleBar";

/**
 * Reusable draggable window wrapper component
 */
const DraggableWindow = ({
  children,
  isOpen,
  isMinimized = false,
  title,
  onClose,
  onMinimize,
  onMaximize,
  bounds,
  windowRef,
  className = "",
  showMaximize = true,
  isActive = false,
  bringToFront,
}) => {
  if (!isOpen) return null;

  return (
    <div className={`${isMinimized ? 'hidden' : ''} ${isActive ? 'z-40' : 'z-30'} w-full h-screen pointer-events-none absolute transition-none`}>
      <Draggable handle=".title-bar" nodeRef={windowRef} bounds={bounds}>
        <div
          ref={windowRef}
          className={`window bg-black rounded-xl overflow-hidden border-neutral-700 border-[1.5px] pointer-events-auto ${className}`}
          onMouseDown={bringToFront}
        >
          <WindowTitleBar
            title={title}
            onMinimize={onMinimize}
            onMaximize={onMaximize}
            onClose={onClose}
            showMaximize={showMaximize}
            bringToFront={bringToFront}
          />
          <div className="content text-white">{children}</div>
        </div>
      </Draggable>
    </div>
  );
};

DraggableWindow.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isMinimized: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  onMinimize: PropTypes.func,
  onMaximize: PropTypes.func,
  bounds: PropTypes.shape({
    left: PropTypes.number,
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
  }),
  windowRef: PropTypes.object,
  className: PropTypes.string,
  showMaximize: PropTypes.bool,
  isActive: PropTypes.bool,
  bringToFront: PropTypes.func,
};

export default React.memo(DraggableWindow);
