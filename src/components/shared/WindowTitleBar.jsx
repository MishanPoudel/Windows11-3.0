import React from "react";
import PropTypes from "prop-types";
import { VscChromeMinimize, VscChromeMaximize, VscClose } from "react-icons/vsc";

/**
 * Reusable window title bar component
 */
const WindowTitleBar = ({ title, onMinimize, onMaximize, onClose, showMaximize = true, bringToFront }) => {
  return (
    <div className="title-bar" onMouseDown={bringToFront}>
      <div className="text-white h-9 flex justify-between select-none">
        <div className="m-1 ml-4 font-normal">{title}</div>
        <div className="flex">
          {onMinimize && (
            <button
              className="hover:bg-neutral-800 w-11 h-9 flex justify-center items-center cursor-pointer"
              onClick={onMinimize}
              aria-label="Minimize"
              type="button"
            >
              <VscChromeMinimize />
            </button>
          )}
          {showMaximize && (
            <button
              className="hover:bg-neutral-800 w-11 h-9 flex justify-center items-center cursor-pointer"
              onClick={onMaximize}
              aria-label="Maximize"
              type="button"
            >
              <VscChromeMaximize />
            </button>
          )}
          {onClose && (
            <button
              className="hover:bg-red-700 w-12 h-9 flex justify-center items-center cursor-pointer"
              onClick={onClose}
              aria-label="Close"
              type="button"
            >
              <VscClose />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

WindowTitleBar.propTypes = {
  title: PropTypes.string.isRequired,
  onMinimize: PropTypes.func,
  onMaximize: PropTypes.func,
  onClose: PropTypes.func,
  showMaximize: PropTypes.bool,
  bringToFront: PropTypes.func,
};

export default React.memo(WindowTitleBar);
