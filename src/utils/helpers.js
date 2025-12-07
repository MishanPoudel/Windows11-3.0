/**
 * Formats date to MM/DD/YYYY
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  const options = { month: "2-digit", day: "2-digit", year: "numeric" };
  return date.toLocaleDateString([], options).replace(/^0/, "");
};

/**
 * Formats time to HH:MM AM/PM
 * @param {Date} time - Time to format
 * @returns {string} Formatted time string
 */
export const formatTime = (time) => {
  const options = { hour: "2-digit", minute: "2-digit" };
  return time.toLocaleTimeString([], options);
};

/**
 * Calculate bounds for draggable windows
 * @param {number} windowWidth - Window width in pixels
 * @param {number} windowHeight - Window height in pixels
 * @returns {Object} Bounds object with left, top, right, bottom
 */
export const calculateWindowBounds = (windowWidth, windowHeight) => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  
  return {
    left: 0,
    top: 0,
    right: screenWidth - windowWidth,
    bottom: screenHeight - windowHeight - 40,
  };
};

/**
 * Safely evaluate mathematical expression
 * @param {string} expression - Math expression string
 * @returns {number|null} Result or null if error
 */
export const safeEvaluate = (expression) => {
  try {
    // Remove any non-math characters for safety
    const sanitized = expression.replace(/[^0-9+\-*/.()%\s]/g, "");
    if (!sanitized) return null;
    
    // Use Function constructor instead of eval for safer evaluation
    // eslint-disable-next-line no-new-func
    const result = new Function(`return ${sanitized}`)();
    return typeof result === "number" && !isNaN(result) ? result : null;
  } catch (error) {
    return null;
  }
};
