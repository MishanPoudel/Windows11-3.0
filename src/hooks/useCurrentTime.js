import { useState, useEffect } from "react";

/**
 * Custom hook to get current time that updates every second
 * @returns {Date} Current date/time
 */
export const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  return currentTime;
};
