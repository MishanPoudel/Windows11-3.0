import { useEffect, useState } from "react";

/**
 * Preload images for faster display
 * @param {string[]} imageUrls - Array of image URLs to preload
 * @returns {boolean} - Whether all images are loaded
 */
export const useImagePreloader = (imageUrls) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const totalImages = imageUrls.length;

    if (totalImages === 0) {
      setImagesLoaded(true);
      return;
    }

    const imagePromises = imageUrls.map((url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
          resolve();
        };
        img.onerror = reject;
      });
    });

    Promise.allSettled(imagePromises).then(() => {
      setImagesLoaded(true);
    });
  }, [imageUrls]);

  return imagesLoaded;
};
