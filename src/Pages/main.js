import React, { useEffect, useMemo, useState, useCallback, useRef, lazy, Suspense } from "react";
import Taskbar from "../components/layout/Taskbar";
import RightClick from "../components/utilities/RightClick";
import StartMenu from "../components/layout/StartMenu";
import Slider from "../components/utilities/Slider";
import Torch from "../components/apps/Torch";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import { motion } from "framer-motion";
import appsData from "../data/data";
// bounds are computed locally using viewport dims; no helper import needed
import { WINDOW_SIZES } from "../utils/constants";
import { useImagePreloader, useMediaPreloader, useWindowSize } from "../hooks";

// Lazy load heavy components
const Explorer = lazy(() => import("../components/apps/Explorer"));
const Browser = lazy(() => import("../components/apps/Browser"));
const Calculator = lazy(() => import("../components/apps/Calculator"));
const VsCode = lazy(() => import("../components/apps/VsCode"));
const RecycleBin = lazy(() => import("../components/apps/RecycleBin"));
const Apps = lazy(() => import("../components/apps/Apps"));
const DesktopDestroyer = lazy(() => import("../components/apps/DesktopDestroyer"));
const HelpMeEarn = lazy(() => import("../components/apps/HelpMeEarn"));

function Main() {
  const constraintsRef = useRef(null);
  const [isSleeping, setIsSleeping] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [actionType, setActionType] = useState(null);

  const [windows, setWindows] = useState({
    menu: false,
    start: false,
    explorer: false,
    browser: false,
    chrome: false,
    edge: false,
    calculator: false,
    vscode: false,
    recycle: false,
    app: false,
    emoji: false,
    spotify: false,
    destroyer: false,
    helpmeearn: false,
  });

  const [activeWindow, setActiveWindow] = useState(null);
  const [minimizedWindows, setMinimizedWindows] = useState(new Set());
  const minimizedRef = useRef(minimizedWindows);
  const [aboutMe, setAboutMe] = useState(null);
  const [input, setInput] = useState(null);
  const [selectionBox, setSelectionBox] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);

  // Preload critical app icons - only local ones
  const iconUrls = useMemo(
    () => appsData.map((app) => app.icon).filter((icon) => icon.startsWith("/images/")),
    []
  );
  
  const iconsLoaded = useImagePreloader(iconUrls);

  // Preload audio files used on this page (best-effort — browsers may limit)
  const audioUrls = useMemo(
    () => ["/audio/sleep.mp3", "/audio/lullaby.mp3", "/audio/shutdown.mp3"],
    []
  );
  const audiosLoaded = useMediaPreloader(audioUrls);

  // Memoized toggle function with useCallback for better performance
  const toggleWindow = useCallback((window, input = null) => {
    if (windows.destroyer && window !== 'destroyer') return;

    let wasOpen = false;
    let actualWindow = window;

    if (window === 'app' && input && (input === 'emoji' || input === 'spotify')) {
      actualWindow = input;
    }
    if (window === 'browser' && input && (input === 'chrome' || input === 'edge')) {
      actualWindow = input;
    }

    setMinimizedWindows((prev) => {
      if (prev.has(actualWindow)) {
        const next = new Set(prev);
        next.delete(actualWindow);
        setActiveWindow(actualWindow);
        if (window === "explorer" && input !== null) {
          setAboutMe(input);
        } else if (window === "app" && input !== null) {
          setInput(input);
        } else if (window === "browser" && input !== null) {
          setInput(input);
        }
        return next;
      }
      return prev;
    });

    if (minimizedRef.current && minimizedRef.current.has(actualWindow)) return;

    setWindows((prev) => {
      wasOpen = prev[actualWindow];
      const newState = { ...prev };
      if (window !== 'start' && window !== 'menu') newState.start = false;
      newState[actualWindow] = !wasOpen;

      if (actualWindow === 'emoji' || actualWindow === 'spotify') {
        newState.app = !wasOpen;
        if (wasOpen) {
          newState[actualWindow] = false;
          newState.app = false;
        }
      }

      if (actualWindow === 'chrome' || actualWindow === 'edge') {
        newState.browser = !wasOpen;
        if (wasOpen) {
          newState[actualWindow] = false;
          newState.browser = false;
        }
      }

      return newState;
    });

    if (window !== 'start' && window !== 'menu') {
      if (!wasOpen) {
        setActiveWindow(actualWindow);
      } else {
        setActiveWindow((current) => (current === actualWindow ? null : current));
        setMinimizedWindows((prev) => {
          const next = new Set(prev);
          next.delete(actualWindow);
          return next;
        });
      }
    }

    if (window === "explorer" && input !== null) {
      setAboutMe(input);
    } else if (window === "app" && input !== null) {
      setInput(input);
    } else if (window === "browser" && input !== null) {
      setInput(input);
    }
  }, [windows.destroyer]);

  // keep minimizedRef in sync
  useEffect(() => {
    minimizedRef.current = minimizedWindows;
  }, [minimizedWindows]);

  // Bring window to front when clicked
  const bringToFront = useCallback((window) => {
    setActiveWindow(window);
    setMinimizedWindows((prev) => {
      const next = new Set(prev);
      next.delete(window);
      return next;
    });
  }, []);

  // Minimize or restore window when taskbar icon clicked
  const minimizeWindow = useCallback((window) => {
    setMinimizedWindows((prev) => {
      const next = new Set(prev);
      if (activeWindow === window && !prev.has(window)) {
        next.add(window);
        setActiveWindow(null);
      } else {
        next.delete(window);
        setActiveWindow(window);
      }
      return next;
    });
  }, [activeWindow]);

  // Memoize desktop icons markup to avoid re-creating on every render
  const desktopIcons = useMemo(() => {
    return appsData.map((app) => (
      <motion.div
        key={app.id}
        drag
        dragConstraints={constraintsRef}
        dragMomentum={false}
        style={{ willChange: "transform" }}
      >
        <div
          className="desktop-icon w-[4.5rem] flex flex-col justify-start items-center rounded hover:bg-white hover:bg-opacity-10 p-1.5"
          onDoubleClick={() => toggleWindow(app.action, app.subAction)}
        >
          <img
            src={app.icon}
            alt={app.name}
            className={app.size}
            onDragStart={(e) => e.preventDefault()}
            style={{ imageRendering: "crisp-edges" }}
          />
          <div className="text-center text-[11px] leading-tight select-none pt-1 w-full break-words overflow-hidden">
            {app.name}
          </div>
        </div>
      </motion.div>
    ));
  }, [toggleWindow]);

  // Pre-bind bringToFront and minimize handlers for commonly used windows
  const bringers = useMemo(() => {
    const names = ["explorer", "recycle", "calculator", "vscode", "destroyer", "helpmeearn"];
    const map = {};
    names.forEach((n) => {
      map[n] = () => bringToFront(n);
    });
    return map;
  }, [bringToFront]);

  const minimizers = useMemo(() => {
    const names = ["explorer", "recycle", "calculator", "vscode", "destroyer", "helpmeearn"];
    const map = {};
    names.forEach((n) => {
      map[n] = () => minimizeWindow(n);
    });
    return map;
  }, [minimizeWindow]);
  
  

  // Selection box handlers
  const handleMouseDown = useCallback((e) => {
    // Don't start selection on right click or when Desktop Destroyer is open
    if (e.button !== 0 || windows.destroyer) return;
    
    // Only start selection if clicking on the desktop (not on icons or windows)
    // Don't start selection if clicking on draggable icons or window title bars
    if ((e.target === e.currentTarget || e.target.closest('.desktop-background')) && 
        !e.target.closest('.desktop-icon') &&
        !e.target.closest('.title-bar')) {
      const rect = e.currentTarget.getBoundingClientRect();
      const startX = e.clientX - rect.left;
      const startY = e.clientY - rect.top;
      
      setSelectionBox({
        startX,
        startY,
        currentX: startX,
        currentY: startY,
      });
    }
  }, [windows.destroyer]);

  const handleMouseMove = useCallback((e) => {
    if (selectionBox) {
      const rect = e.currentTarget.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;
      
      // Only show selection box if mouse has moved at least 5 pixels
      const deltaX = Math.abs(currentX - selectionBox.startX);
      const deltaY = Math.abs(currentY - selectionBox.startY);
      
      if (deltaX > 5 || deltaY > 5) {
        setIsSelecting(true);
      }
      
      setSelectionBox(prev => ({
        ...prev,
        currentX,
        currentY,
      }));
    }
  }, [selectionBox]);

  const handleMouseUp = useCallback(() => {
    setIsSelecting(false);
    setSelectionBox(null);
  }, []);

  // Recompute bounds when the viewport size changes (handles fullscreen/resizes)
  const { width: viewportWidth, height: viewportHeight } = useWindowSize();

  const bounds = useMemo(() => {
    // Local helper uses the latest viewport dims rather than window.innerWidth
    const makeBounds = (w, h) => {
      const screenWidth = typeof viewportWidth === 'number' ? viewportWidth : window.innerWidth;
      const screenHeight = typeof viewportHeight === 'number' ? viewportHeight : window.innerHeight;
      return {
        left: 0,
        top: 0,
        right: screenWidth - w,
        bottom: screenHeight - h - 40,
      };
    };

    return {
      browser: makeBounds(WINDOW_SIZES.BROWSER.width, WINDOW_SIZES.BROWSER.height),
      explorer: makeBounds(WINDOW_SIZES.EXPLORER.width, WINDOW_SIZES.EXPLORER.height),
      calculator: makeBounds(WINDOW_SIZES.CALCULATOR.width, WINDOW_SIZES.CALCULATOR.height),
      vscode: makeBounds(WINDOW_SIZES.VSCODE.width, WINDOW_SIZES.VSCODE.height),
      recycle: makeBounds(WINDOW_SIZES.RECYCLE_BIN.width, WINDOW_SIZES.RECYCLE_BIN.height),
      app: makeBounds(WINDOW_SIZES.APP.width, WINDOW_SIZES.APP.height),
      destroyer: makeBounds(400, 500),
      helpmeearn: makeBounds(800, 600),
    };
  }, [viewportWidth, viewportHeight]);

  const handleFadeOutClick = useCallback(() => {
    setFadeOut(true);
    setTimeout(() => {
      setIsSleeping(false);
      setFadeOut(false);
    }, 1000);
  }, []);

  const images = useMemo(
    () => [
      "/images/fun/1.gif",
      "/images/fun/2.jpg",
      "/images/fun/3.jpg",
      "/images/fun/4.jpg",
    ],
    []
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Try to enter fullscreen once when the main page loads and
  // again on the first user click for a more immersive experience.
  useEffect(() => {
    const el = document.documentElement;

    const requestFullscreenSafely = () => {
      if (!document.fullscreenElement && el.requestFullscreen) {
        el.requestFullscreen().catch(() => {
          // Ignore failures (e.g., browser blocking without user gesture)
        });
      }
    };

    // Attempt immediately on mount (may be blocked but harmless)
    requestFullscreenSafely();

    // Also try on the first click anywhere in the window
    const handleFirstClick = () => {
      requestFullscreenSafely();
      window.removeEventListener("click", handleFirstClick);
    };

    window.addEventListener("click", handleFirstClick);

    return () => {
      window.removeEventListener("click", handleFirstClick);
    };
  }, []);

  // Show loading spinner while critical assets are loading
  if (!iconsLoaded || !audiosLoaded) {
    return (
      <div className="relative h-screen w-full bg-black flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      {isSleeping && (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-black transition-opacity duration-1000 ease-in-out ${
            fadeOut ? "opacity-0" : "opacity-100"
          } z-50`}
          onClick={handleFadeOutClick}
        >
          {actionType === "sleep" && (
            <div className="flex flex-col gap-4 justify-center items-center w-full h-screen">
              <img
                src={images[currentImageIndex]}
                alt="Random"
                className="w-64 h-64 object-cover rounded-lg shadow-lg"
              />
              <div>Windows is now sleeping💤</div>
              <audio src="/audio/sleep.mp3" autoPlay loop />
              <audio src="/audio/lullaby.mp3" autoPlay loop />
            </div>
          )}
          {actionType === "shutdown" && (
            <div className="flex flex-col gap-4 justify-center items-center w-full h-screen">
              <img
                src="/images/fun/xp.jpg"
                alt="Random"
                className="w-1/2 h-1/2 object-cover rounded-lg shadow-lg"
              />
              <div>BYE BYE👋🏻</div>
              <audio src="/audio/shutdown.mp3" autoPlay />
            </div>
          )}
        </div>
      )}
      <Torch input={input} setInput={setInput} />
      <div 
        className="relative h-screen desktop-background" 
        ref={constraintsRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="relative h-full w-full top-0 left-0 z-10 text-white pointer-events-none">
          <div className="pointer-events-auto">
            <RightClick option={true} />
          </div>
          <div className="grid grid-cols-1 auto-rows-min gap-1 absolute top-2 left-2 pointer-events-auto">
            {desktopIcons}
          </div>
          <div className="absolute right-3 top-2">
            <div
              className="w-[5em] h-full flex-col justify-center items-center rounded-md hover:bg-white hover:bg-opacity-20 p-2 select-none hidden"
              onDoubleClick={() => toggleWindow("app", "terminal")}
            >
              <img
                src="images/apps/terminal.png"
                alt="terminal"
                className="w-10 h-10"
              />
              <div className="text-balance text-center text-sm select-none pt-2">
                Terminal
              </div>
            </div>
          </div>
          {/* Selection box */}
          {isSelecting && selectionBox && (
            <div
              className="absolute border-2 border-blue-500 bg-blue-500 bg-opacity-20 pointer-events-none"
              style={{
                left: `${Math.min(selectionBox.startX, selectionBox.currentX)}px`,
                top: `${Math.min(selectionBox.startY, selectionBox.currentY)}px`,
                width: `${Math.abs(selectionBox.currentX - selectionBox.startX)}px`,
                height: `${Math.abs(selectionBox.currentY - selectionBox.startY)}px`,
              }}
            />
          )}
        </div>
        <div
          className={`absolute top-0 flex justify-center items-center w-full h-full pointer-events-none`}
        >
          <div className="pointer-events-auto">
            <StartMenu
              isStartOpen={windows.start}
              toggleStart={() => toggleWindow("start")}
              setInput={setInput}
              setIsSleeping={setIsSleeping}
              setActionType={setActionType}
            />
          </div>
          <Suspense fallback={null}>
            {windows.browser && (
              <Browser
                isAppOpen={windows.browser}
                toggleBrowser={(input) => toggleWindow("browser", input)}
                bounds={bounds.browser}
                input={input}
                isActive={activeWindow === input}
                bringToFront={() => bringToFront(input)}
                isMinimized={minimizedWindows.has(input)}
              />
            )}
            {windows.explorer && (
              <Explorer
                isExplorerOpen={windows.explorer}
                toggleExplorer={(input) => toggleWindow("explorer", input)}
                aboutMe={aboutMe}
                bounds={bounds.explorer}
                isActive={activeWindow === "explorer"}
                bringToFront={bringers.explorer}
                isMinimized={minimizedWindows.has("explorer")}
                minimizeWindow={minimizers.explorer}
              />
            )}
            {windows.recycle && (
              <RecycleBin
                isRecycleOpen={windows.recycle}
                toggleRecycle={() => toggleWindow("recycle")}
                bounds={bounds.recycle}
                isActive={activeWindow === "recycle"}
                bringToFront={bringers.recycle}
                isMinimized={minimizedWindows.has("recycle")}
                minimizeWindow={minimizers.recycle}
              />
            )}
            {windows.calculator && (
              <Calculator
                isAppOpen={windows.calculator}
                toggleCalculator={() => toggleWindow("calculator")}
                bounds={bounds.calculator}
                isActive={activeWindow === "calculator"}
                bringToFront={bringers.calculator}
                isMinimized={minimizedWindows.has("calculator")}
                minimizeWindow={minimizers.calculator}
              />
            )}
            {windows.vscode && (
              <VsCode
                isAppOpen={windows.vscode}
                toggleVsCode={() => toggleWindow("vscode")}
                bounds={bounds.vscode}
                isActive={activeWindow === "vscode"}
                bringToFront={bringers.vscode}
                isMinimized={minimizedWindows.has("vscode")}
                minimizeWindow={minimizers.vscode}
              />
            )}
            {windows.app && (
              <Apps
                isAppOpen={windows.app}
                toggleApp={(input) => toggleWindow("app", input)}
                bounds={bounds.app}
                input={input}
                isActive={activeWindow === input}
                bringToFront={() => bringToFront(input)}
                isMinimized={minimizedWindows.has(input)}
                minimizeWindow={(win) => minimizeWindow(win)}
              />
            )}
            {windows.destroyer && (
              <DesktopDestroyer
                isAppOpen={windows.destroyer}
                toggleDesktopDestroyer={() => toggleWindow("destroyer")}
                bounds={bounds.destroyer}
                isActive={activeWindow === "destroyer"}
                bringToFront={bringers.destroyer}
                isMinimized={minimizedWindows.has("destroyer")}
                minimizeWindow={minimizers.destroyer}
              />
            )}
            {windows.helpmeearn && (
              <HelpMeEarn
                isAppOpen={windows.helpmeearn}
                toggleHelpMeEarn={() => toggleWindow("helpmeearn")}
                bounds={bounds.helpmeearn}
                isActive={activeWindow === "helpmeearn"}
                bringToFront={bringers.helpmeearn}
                isMinimized={minimizedWindows.has("helpmeearn")}
                minimizeWindow={minimizers.helpmeearn}
              />
            )}
          </Suspense>
        </div>
        <Taskbar
          toggleStart={() => toggleWindow("start")}
          toggleExplorer={(input) => toggleWindow("explorer", input)}
          toggleBrowser={() => toggleWindow("browser")}
          windows={windows}
          toggleWindow={toggleWindow}
          minimizeWindow={minimizeWindow}
          minimizedWindows={minimizedWindows}
        />
      </div>
      {!windows.destroyer && (
        <Slider
          isMenuOpen={windows.menu}
          setIsMenuOpen={() => toggleWindow("menu")}
          toggleMenu={() => toggleWindow("menu")}
        />
      )}
    </>
  );
}

export default Main;
