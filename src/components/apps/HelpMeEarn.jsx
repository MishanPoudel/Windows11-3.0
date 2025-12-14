import React, { useState, useEffect, useRef, useCallback } from "react";
import Draggable from "react-draggable";
import { MdMinimize, MdCheckBoxOutlineBlank, MdClose } from "react-icons/md";

const HelpMeEarn = ({ 
  isAppOpen, 
  toggleHelpMeEarn, 
  bounds, 
  isActive = false, 
  bringToFront, 
  isMinimized = false,
  minimizeWindow 
}) => {
  const windowRef = useRef(null);
  const [showWarning, setShowWarning] = useState(true);
  const [showAdBlockWarning, setShowAdBlockWarning] = useState(false);
  const [adsLoaded, setAdsLoaded] = useState(false);
  const [adLoadError, setAdLoadError] = useState(false);
  const scriptRef = useRef(null);
  const adInitializedRef = useRef(false);

  // Load AdSense script when component mounts
  useEffect(() => {
    if (!isAppOpen || adsLoaded) return;

    // Check if script already exists
    const existingScript = document.querySelector(
      'script[src*="pagead2.googlesyndication.com"]'
    );

    if (existingScript) {
      setAdsLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1542193411663264";
    script.async = true;
    script.crossOrigin = "anonymous";
    scriptRef.current = script;
    
    script.onload = () => {
      setAdsLoaded(true);
      setAdLoadError(false);
    };

    script.onerror = () => {
      console.error('Failed to load AdSense script');
      setAdLoadError(true);
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup: remove script when component unmounts
      if (scriptRef.current && document.head.contains(scriptRef.current)) {
        document.head.removeChild(scriptRef.current);
      }
    };
  }, [isAppOpen, adsLoaded]);

  // Initialize ads after script loads
  useEffect(() => {
    if (!adsLoaded || showWarning || adInitializedRef.current) return;

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      try {
        const adElements = document.querySelectorAll('.adsbygoogle');
        adElements.forEach((ad) => {
          if (!ad.getAttribute('data-adsbygoogle-status')) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        });
        adInitializedRef.current = true;
      } catch (err) {
        console.error('AdSense initialization error:', err);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [adsLoaded, showWarning]);

  const handleAccept = useCallback(() => {
    setShowWarning(false);
    
    // Check for ad blocker by testing if adsbygoogle is blocked
    setTimeout(() => {
      const testAd = document.createElement('div');
      testAd.className = 'adsbygoogle';
      testAd.style.position = 'absolute';
      testAd.style.top = '-1px';
      testAd.style.height = '1px';
      document.body.appendChild(testAd);
      
      setTimeout(() => {
        const isBlocked = testAd.offsetHeight === 0 || 
                         window.getComputedStyle(testAd).display === 'none' ||
                         !window.adsbygoogle;
        document.body.removeChild(testAd);
        
        if (isBlocked) {
          setShowAdBlockWarning(true);
        }
      }, 100);
    }, 100);
  }, []);

  const handleDecline = useCallback(() => {
    toggleHelpMeEarn();
  }, [toggleHelpMeEarn]);

  const handleMinimize = useCallback((e) => {
    e.stopPropagation();
    if (minimizeWindow) {
      minimizeWindow();
    }
  }, [minimizeWindow]);

  const handleClose = useCallback((e) => {
    e.stopPropagation();
    toggleHelpMeEarn();
  }, [toggleHelpMeEarn]);

  const handleReload = useCallback(() => {
    window.location.reload();
  }, []);

  const handleContinueAnyway = useCallback(() => {
    setShowAdBlockWarning(false);
  }, []);

  if (!isAppOpen || isMinimized) return null;

  return (
    <div
      className={`${isActive ? 'z-40' : 'z-30'} w-full h-screen pointer-events-none absolute transition-none select-none`}
      role="dialog"
      aria-labelledby="help-me-earn-title"
      aria-modal="true"
    >
      <Draggable handle=".title-bar" nodeRef={windowRef} bounds={bounds}>
        <div
          ref={windowRef}
          className="window bg-neutral-900 h-[600px] w-[800px] rounded-xl overflow-hidden border-neutral-700 border-[1.5px] pointer-events-auto shadow-2xl"
          onMouseDown={bringToFront}
        >
          {/* Title Bar */}
          <div className="title-bar bg-neutral-800 text-white h-9 flex justify-between items-center select-none cursor-move">
            <div className="ml-4 font-normal flex items-center gap-2">
              <span role="img" aria-label="Money bag">💰</span>
              <span id="help-me-earn-title">Help Me Earn</span>
            </div>
            <div className="flex">
              <button
                className="hover:bg-neutral-700 w-11 h-9 flex justify-center items-center text-xl transition-colors"
                onClick={handleMinimize}
                aria-label="Minimize window"
                type="button"
              >
                <MdMinimize />
              </button>
              <button
                className="hover:bg-neutral-700 w-11 h-9 flex justify-center items-center text-sm transition-colors"
                aria-label="Maximize window"
                disabled
                type="button"
              >
                <MdCheckBoxOutlineBlank />
              </button>
              <button
                className="hover:bg-red-700 w-12 h-9 flex justify-center items-center text-xl transition-colors"
                onClick={handleClose}
                aria-label="Close window"
                type="button"
              >
                <MdClose />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="h-[calc(100%-36px)] overflow-auto bg-neutral-900">
            {showWarning ? (
              // Warning Dialog
              <div className="h-full flex items-center justify-center p-8">
                <div className="bg-neutral-800 rounded-lg p-8 max-w-md border border-neutral-700 shadow-xl">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-4" role="img" aria-label="Warning">⚠️</div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Important Notice
                    </h2>
                    <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full" aria-hidden="true"></div>
                  </div>
                  
                  <div className="text-neutral-300 space-y-4 mb-8">
                    <p className="text-base leading-relaxed">
                      This app contains <span className="font-semibold text-blue-400">advertisements</span> to help support the creator.
                    </p>
                    <p className="text-base leading-relaxed">
                      By viewing these ads, you're helping me earn a small amount of money. Thank you for your support! <span role="img" aria-label="Blue heart">💙</span>
                    </p>
                    <div className="bg-neutral-700 border-l-4 border-blue-500 p-4 rounded">
                      <p className="text-sm text-neutral-300">
                        <span className="font-semibold">Note:</span> Ads are provided by Google AdSense and are safe to view.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleDecline}
                      className="flex-1 px-6 py-3 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-500"
                      type="button"
                    >
                      No, Close App
                    </button>
                    <button
                      onClick={handleAccept}
                      className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="button"
                    >
                      Yes, Show Ads ✨
                    </button>
                  </div>
                </div>
              </div>
            ) : showAdBlockWarning ? (
              // AdBlock Warning Dialog
              <div className="h-full flex items-center justify-center p-8">
                <div className="bg-neutral-800 rounded-lg p-8 max-w-md border border-neutral-700 shadow-xl">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-4" role="img" aria-label="Stop sign">🛑</div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Ad Blocker Detected
                    </h2>
                    <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full" aria-hidden="true"></div>
                  </div>
                  
                  <div className="text-neutral-300 space-y-4 mb-8">
                    <p className="text-base leading-relaxed">
                      It looks like you have an <span className="font-semibold text-orange-400">ad blocker</span> enabled.
                    </p>
                    <p className="text-base leading-relaxed">
                      Please disable your ad blocker for this site and reload the page to view ads and support me. <span role="img" aria-label="Folded hands">🙏</span>
                    </p>
                    <div className="bg-neutral-700 border-l-4 border-orange-500 p-4 rounded">
                      <p className="text-sm text-neutral-300">
                        <span className="font-semibold">How to disable:</span> Click your ad blocker extension icon and choose "Disable on this site" or "Pause on this site".
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleContinueAnyway}
                      className="flex-1 px-6 py-3 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-500 text-sm"
                      type="button"
                    >
                      Continue Anyway
                    </button>
                    <button
                      onClick={handleReload}
                      className="flex-1 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      type="button"
                    >
                      Reload Page 🔄
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Ad Content
              <div className="p-6 space-y-6">
                <div className="text-center mb-4">
                  <h1 className="text-3xl font-bold text-white mb-2">
                    Thank You for Your Support! <span role="img" aria-label="Folded hands">🙏</span>
                  </h1>
                  <p className="text-neutral-400">
                    Every ad view helps me continue creating awesome projects
                  </p>
                </div>

                {adLoadError ? (
                  <div className="bg-red-900/20 border border-red-700 rounded-lg p-6 text-center">
                    <p className="text-red-400">
                      Unable to load advertisements. Please check your ad blocker or internet connection.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Ad Slot 1 */}
                    <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
                      <div className="text-xs text-neutral-500 mb-2 text-center">Advertisement</div>
                      <ins
                        className="adsbygoogle"
                        style={{ display: 'block', minHeight: '250px' }}
                        data-ad-client="ca-pub-1542193411663264"
                        data-ad-slot="9858267588"
                        data-ad-format="auto"
                        data-full-width-responsive="true"
                      ></ins>
                    </div>

                    {/* Separator */}
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-px bg-neutral-800"></div>
                      <span className="text-neutral-600 text-sm" role="img" aria-label="Money bag">💰</span>
                      <div className="flex-1 h-px bg-neutral-800"></div>
                    </div>

                    {/* Ad Slot 2 */}
                    <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
                      <div className="text-xs text-neutral-500 mb-2 text-center">Advertisement</div>
                      <ins
                        className="adsbygoogle"
                        style={{ display: 'block', minHeight: '250px' }}
                        data-ad-client="ca-pub-1542193411663264"
                        data-ad-slot="6845091438"
                        data-ad-format="auto"
                        data-full-width-responsive="true"
                      ></ins>
                    </div>

                    {/* Separator */}
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-px bg-neutral-800"></div>
                      <span className="text-neutral-600 text-sm" role="img" aria-label="Sparkles">✨</span>
                      <div className="flex-1 h-px bg-neutral-800"></div>
                    </div>

                    {/* Ad Slot 3 */}
                    <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
                      <div className="text-xs text-neutral-500 mb-2 text-center">Advertisement</div>
                      <ins
                        className="adsbygoogle"
                        style={{ display: 'block', minHeight: '250px' }}
                        data-ad-client="ca-pub-1542193411663264"
                        data-ad-slot="2400140460"
                        data-ad-format="auto"
                        data-full-width-responsive="true"
                      ></ins>
                    </div>
                  </>
                )}

                {/* Thank you message */}
                <div className="bg-neutral-800 border border-blue-500/30 rounded-lg p-6 text-center">
                  <div className="text-4xl mb-3" role="img" aria-label="Party popper">🎉</div>
                  <h3 className="text-xl font-bold mb-2 text-white">You're Amazing!</h3>
                  <p className="text-neutral-400">
                    Thank you so much for supporting my work by viewing these ads.
                    Your support means the world to me! <span role="img" aria-label="Sparkling heart">💖</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default HelpMeEarn;