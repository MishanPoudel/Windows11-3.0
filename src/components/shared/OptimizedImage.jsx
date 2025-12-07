import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * Optimized image component with lazy loading and fade-in effect
 */
const OptimizedImage = ({ 
  src, 
  alt, 
  className = "", 
  loading = "lazy",
  onLoad,
  ...props 
}) => {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = (e) => {
    setLoaded(true);
    if (onLoad) onLoad(e);
  };

  return (
    <img
      src={src}
      alt={alt}
      className={`transition-opacity duration-300 ${
        loaded ? "opacity-100" : "opacity-0"
      } ${className}`}
      loading={loading}
      decoding="async"
      onLoad={handleLoad}
      {...props}
    />
  );
};

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  loading: PropTypes.oneOf(["lazy", "eager"]),
  onLoad: PropTypes.func,
};

export default React.memo(OptimizedImage);
