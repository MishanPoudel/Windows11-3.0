import { useEffect } from "react";

const MobileDetection = ({ onDetectMobile }) => {
  useEffect(() => {
    const checkIfMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      if (
        /android/i.test(userAgent) ||
        (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)
      ) {
        onDetectMobile(true);
      } else {
        onDetectMobile(false);
      }
    };

    checkIfMobile();
  }, [onDetectMobile]);

  return null;
};

export default MobileDetection;
