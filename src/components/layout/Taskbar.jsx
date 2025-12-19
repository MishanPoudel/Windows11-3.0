import React, { useCallback } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useCurrentTime } from "../../hooks";
import { formatDate, formatTime } from "../../utils/helpers";
import { FaWifi, FaVolumeUp, FaBatteryFull, FaBell, FaChevronUp } from "react-icons/fa";

// Taskbar button component
const TaskbarButton = React.memo(({ onClick, icon, alt, className = "", isActive = false }) => (
  <button
    type="button"
    className={`flex justify-center items-center h-full px-2 hover:bg-white/10 transition-colors duration-150 rounded-md cursor-pointer relative ${className}`}
    onClick={onClick}
    aria-label={alt}
  >
    <img
      src={icon}
      alt={alt}
      className="w-7 h-7"
      loading="eager"
      draggable="false"
    />
    {isActive && (
      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-500 rounded-t" aria-hidden="true" />
    )}
  </button>
));

TaskbarButton.displayName = "TaskbarButton";

TaskbarButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  isActive: PropTypes.bool,
};

// System tray icon wrapper
const SystemTrayIcon = React.memo(({ icon: Icon, className = "" }) => (
  <Icon className={`text-sm ${className}`} aria-hidden="true" />
));

SystemTrayIcon.displayName = "SystemTrayIcon";

SystemTrayIcon.propTypes = {
  icon: PropTypes.elementType.isRequired,
  className: PropTypes.string,
};

const Taskbar = ({ toggleStart, toggleExplorer, toggleBrowser, windows = {}, toggleWindow, minimizeWindow, minimizedWindows = new Set(), toggleVideo, videoOn = false }) => {
  const currentTime = useCurrentTime();

  const handleExplorerClick = useCallback(() => {
    if (windows.explorer) {
      minimizeWindow && minimizeWindow('explorer');
    } else {
      toggleExplorer(true);
    }
  }, [windows.explorer, minimizeWindow, toggleExplorer]);

  const handleChromeClick = useCallback(() => {
    minimizeWindow && minimizeWindow('chrome');
  }, [minimizeWindow]);

  const handleEdgeClick = useCallback(() => {
    if (windows.edge) {
      minimizeWindow && minimizeWindow('edge');
    } else {
      toggleWindow && toggleWindow('browser', 'edge');
    }
  }, [windows.edge, minimizeWindow, toggleWindow]);

  const handleCalculatorClick = useCallback(() => {
    minimizeWindow && minimizeWindow('calculator');
  }, [minimizeWindow]);

  const handleVsCodeClick = useCallback(() => {
    minimizeWindow && minimizeWindow('vscode');
  }, [minimizeWindow]);

  const handleRecycleClick = useCallback(() => {
    minimizeWindow && minimizeWindow('recycle');
  }, [minimizeWindow]);

  const handleEmojiClick = useCallback(() => {
    minimizeWindow && minimizeWindow('emoji');
  }, [minimizeWindow]);

  const handleSpotifyClick = useCallback(() => {
    minimizeWindow && minimizeWindow('spotify');
  }, [minimizeWindow]);

  const handleDestroyerClick = useCallback(() => {
    minimizeWindow && minimizeWindow('destroyer');
  }, [minimizeWindow]);

  const handleHelpMeEarnClick = useCallback(() => {
    minimizeWindow && minimizeWindow('helpmeearn');
  }, [minimizeWindow]);

  return (
    <div className="fixed bottom-0 flex justify-between w-full h-12 bg-[#202020] border-t border-neutral-700 select-none pointer-events-auto text-white z-40 py-0.5">
      {/* Left spacer for centering (responsive) */}
      <div className="w-12 sm:w-[15%]" aria-hidden="true" />

      {/* Center - App icons */}
      <nav className="flex justify-center items-center gap-1 sm:gap-2" role="navigation" aria-label="Taskbar applications">
        <TaskbarButton
          onClick={toggleStart}
          icon="/images/apps/windows.png"
          alt="Start Menu"
        />
        <TaskbarButton
          onClick={handleExplorerClick}
          icon="/images/apps/explorer.png"
          alt="File Explorer"
          isActive={windows.explorer}
        />
        <TaskbarButton
          onClick={handleEdgeClick}
          icon="/images/apps/edge.png"
          alt="Microsoft Edge"
          isActive={windows.edge}
        />
        {windows.chrome && (
          <TaskbarButton
            onClick={handleChromeClick}
            icon="/images/apps/chrome.png"
            alt="Google Chrome"
            isActive={true}
          />
        )}
        {windows.calculator && (
          <TaskbarButton
            onClick={handleCalculatorClick}
            icon="/images/apps/calculator.png"
            alt="Calculator"
            isActive={true}
          />
        )}
        {windows.vscode && (
          <TaskbarButton
            onClick={handleVsCodeClick}
            icon="https://laaouatni.github.io/w11CSS/images/vs-code.ico"
            alt="VS Code"
            isActive={true}
          />
        )}
        {windows.recycle && (
          <TaskbarButton
            onClick={handleRecycleClick}
            icon="/images/apps/recyclebin.png"
            alt="Recycle Bin"
            isActive={true}
          />
        )}
        {windows.emoji && (
          <TaskbarButton
            onClick={handleEmojiClick}
            icon="https://raw.githubusercontent.com/MishanPoudel/Emoji-TicTacToe/main/public/favicon.ico"
            alt="Emoji TicTacToe"
            isActive={true}
          />
        )}
        {windows.spotify && (
          <TaskbarButton
            onClick={handleSpotifyClick}
            icon="https://www.freepnglogos.com/uploads/spotify-logo-png/image-gallery-spotify-logo-21.png"
            alt="Spotify"
            isActive={true}
          />
        )}
        {windows.destroyer && (
          <TaskbarButton
            onClick={handleDestroyerClick}
            icon="https://em-content.zobj.net/thumbs/120/microsoft/319/hammer_1f528.png"
            alt="Desktop Destroyer"
            isActive={true}
          />
        )}
        {windows.helpmeearn && (
          <TaskbarButton
            onClick={handleHelpMeEarnClick}
            icon="https://em-content.zobj.net/thumbs/120/microsoft/319/money-bag_1f4b0.png"
            alt="Help Me Earn"
            isActive={true}
          />
        )}
      </nav>

      {/* Right - System tray */}
      <div className="flex items-center h-full" role="region" aria-label="System tray">
        {/* Expand button */}
        <button
          type="button"
          className="flex justify-center items-center h-full px-2 hover:bg-white/10 transition-colors duration-150 rounded-lg cursor-pointer"
          aria-label="Show hidden icons"
        >
          <FaChevronUp className="text-xs" />
        </button>

        {/* Network, volume, battery icons */}
        <div className="flex items-center h-full px-2 sm:px-3 hover:bg-white/10 transition-colors duration-150 gap-3 rounded-lg">
          <SystemTrayIcon icon={FaWifi} />
          <SystemTrayIcon icon={FaVolumeUp} />
          <SystemTrayIcon icon={FaBatteryFull} />
        </div>

        {/* Clock and notifications */}
        <button
          type="button"
          className="flex items-center h-full px-2 sm:px-3 hover:bg-white/10 transition-colors duration-150 rounded-lg cursor-pointer"
          aria-label="Notifications and calendar"
        >
          <time className="flex flex-col items-end text-[11px] leading-tight mr-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatDate(currentTime)}</span>
          </time>
          <FaBell className="text-sm" aria-hidden="true" />
        </button>

        {/* Show desktop button */}
        <button
          type="button"
          className="group w-3 h-full flex justify-center items-center transition-colors duration-150 cursor-pointer"
          aria-label="Show desktop"
        >
          <span className="hidden group-hover:block text-neutral-400 text-md pointer-events-none" aria-hidden="true">
            |
          </span>
        </button>
      </div>

      <div className="absolute right-2 bottom-16 sm:right-5 sm:bottom-14 z-50">
        <motion.div
          drag
          dragMomentum={false}
          style={{ willChange: "transform" }}
          className="inline-block"
        >
          <img
            src="/images/apps/messi.png"
            alt="Messi wallpaper toggle"
            draggable="false"
            role="button"
            tabIndex={0}
            onClick={typeof toggleVideo === 'function' ? toggleVideo : undefined}
            onKeyDown={(e) => {
              if (typeof toggleVideo === 'function' && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                toggleVideo();
              }
            }}
            className={`messi-toggle w-8 h-8 sm:w-12 sm:h-12 rounded-full shadow-md select-none ${
              videoOn ? 'messi-active ring-2 ring-blue-500' : 'opacity-90 hover:scale-105'
            }`}
          />
        </motion.div>
      </div>
    </div>
  );
};

Taskbar.propTypes = {
  toggleStart: PropTypes.func.isRequired,
  toggleExplorer: PropTypes.func.isRequired,
  toggleBrowser: PropTypes.func.isRequired,
  windows: PropTypes.object,
  toggleWindow: PropTypes.func,
  toggleVideo: PropTypes.func,
  videoOn: PropTypes.bool,
  minimizeWindow: PropTypes.func,
  minimizedWindows: PropTypes.instanceOf(Set),
};

Taskbar.defaultProps = {
  windows: {},
  minimizedWindows: new Set(),
  toggleWindow: undefined,
  minimizeWindow: undefined,
  toggleVideo: undefined,
  videoOn: false,
};

export default React.memo(Taskbar);
