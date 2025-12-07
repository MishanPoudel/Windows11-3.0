import { useEffect, useRef, useCallback } from "react";

/**
 * Custom hook for setting and clearing timeouts
 * @param {Function} callback - Function to execute after delay
 * @param {number} delay - Delay in milliseconds
 */
export const useTimeout = (callback, delay) => {
  const savedCallback = useRef(callback);
  const timeoutRef = useRef(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const set = useCallback(() => {
    clear();
    if (delay !== null) {
      timeoutRef.current = setTimeout(() => savedCallback.current(), delay);
    }
  }, [delay, clear]);

  useEffect(() => {
    return clear;
  }, [clear]);

  return { set, clear };
};
