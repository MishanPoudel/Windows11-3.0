// Window dimensions (in pixels)
export const WINDOW_SIZES = {
  CALCULATOR: { width: 544, height: 800 },
  BROWSER: { width: 1128, height: 624 },
  EXPLORER: { width: 1128, height: 624 },
  VSCODE: { width: 1128, height: 624 },
  RECYCLE_BIN: { width: 1128, height: 624 },
  APP: { width: 1128, height: 624 },
};

// Time intervals
export const INTERVALS = {
  CLOCK_UPDATE: 1000, // 1 second
  IMAGE_ROTATION: 5000, // 5 seconds
  DEBOUNCE_RESIZE: 150, // 150ms for resize events
};

// Calculator constants
export const CALCULATOR = {
  EASTER_EGG_MESSAGE: "Hello World",
  ERROR_MESSAGE: "Error",
  INVALID_INPUT_MESSAGE: "Enter Something Stoopid",
  RESULT_PROMPT: " Am I Right?",
  SUCCESS_MESSAGE: "Too Easy😎",
  FAIL_MESSAGE: "BRUH 💀",
  MESSAGE_DURATION: 1000,
  RESULT_MESSAGE_DURATION: 3000,
};

// Button types for calculator
export const CALCULATOR_BUTTON_TYPES = {
  OPERATOR: "operator",
  NUMBER: "number",
  FUNCTION: "function",
  EQUALS: "equals",
};

// Framer Motion animation configs for performance
export const MOTION_CONFIG = {
  drag: {
    dragElastic: 0,
    dragTransition: { 
      bounceStiffness: 600, 
      bounceDamping: 20,
      power: 0.3,
      timeConstant: 200
    },
  },
  transition: {
    type: "spring",
    stiffness: 500,
    damping: 30,
  },
};
