import React from "react";

/**
 * Windows 11 style loading spinner with dots
 */
const LoadingSpinner = ({ size = "md" }) => {
  const dotSizes = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-3 h-3",
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <div
        className={`${dotSizes[size]} bg-white rounded-full animate-pulse`}
        style={{ animationDelay: "0ms", animationDuration: "1s" }}
      />
      <div
        className={`${dotSizes[size]} bg-white rounded-full animate-pulse`}
        style={{ animationDelay: "200ms", animationDuration: "1s" }}
      />
      <div
        className={`${dotSizes[size]} bg-white rounded-full animate-pulse`}
        style={{ animationDelay: "400ms", animationDuration: "1s" }}
      />
      <div
        className={`${dotSizes[size]} bg-white rounded-full animate-pulse`}
        style={{ animationDelay: "600ms", animationDuration: "1s" }}
      />
      <div
        className={`${dotSizes[size]} bg-white rounded-full animate-pulse`}
        style={{ animationDelay: "800ms", animationDuration: "1s" }}
      />
    </div>
  );
};

export default LoadingSpinner;
