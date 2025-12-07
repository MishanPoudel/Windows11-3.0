import React from "react";
import PropTypes from "prop-types";

/**
 * Calculator button component with customizable styles
 */
const CalculatorButton = ({ 
  label, 
  onClick, 
  variant = "number", 
  className = "",
  colSpan = 1 
}) => {
  const baseClasses = "p-6 text-center rounded-full hover:bg-opacity-60 focus:outline-none";
  
  const variantClasses = {
    number: "bg-neutral-600",
    operator: "bg-yellow-600",
    function: "bg-gray-300 bg-opacity-65",
    success: "btn btn-success text-white p-3",
    error: "btn btn-error text-white p-3",
  };

  const colSpanClass = colSpan > 1 ? `col-span-${colSpan}` : "";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.number} ${colSpanClass} ${className}`}
    >
      {label}
    </button>
  );
};

CalculatorButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(["number", "operator", "function", "success", "error"]),
  className: PropTypes.string,
  colSpan: PropTypes.number,
};

export default React.memo(CalculatorButton);
