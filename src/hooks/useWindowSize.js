import { useState, useEffect } from "react";

/**
 * Custom hook to get and track window dimensions with debouncing
 * @returns {Object} Window width and height
 */
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    let timeoutId = null;
    
    const handleResize = () => {
      // Debounce resize events for better performance
      if (timeoutId) clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 150); // 150ms debounce
    };

    window.addEventListener("resize", handleResize);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};
