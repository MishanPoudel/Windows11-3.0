import { useEffect, useState } from "react";

/**
 * Preload audio files for faster playback
 * @param {string[]} audioUrls - Array of audio file URLs to preload
 * @returns {boolean} - Whether all audio files have been attempted to load
 */
export const useMediaPreloader = (audioUrls) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!audioUrls || audioUrls.length === 0) {
      setLoaded(true);
      return;
    }

    const promises = audioUrls.map((url) => {
      return new Promise((resolve) => {
        try {
          const audio = new Audio();
          audio.preload = "auto";
          // Some browsers will not fully load audio without a user gesture;
          // we listen for canplaythrough as best-effort and resolve on error/failure.
          const onLoaded = () => {
            cleanup();
            resolve({ url, ok: true });
          };
          const onError = () => {
            cleanup();
            resolve({ url, ok: false });
          };
          const cleanup = () => {
            audio.removeEventListener("canplaythrough", onLoaded);
            audio.removeEventListener("error", onError);
          };

          audio.addEventListener("canplaythrough", onLoaded, { once: true });
          audio.addEventListener("error", onError, { once: true });
          audio.src = url;
          // Try to start loading
          try {
            audio.load();
          } catch (e) {
            // ignore
          }

          // As a fallback, resolve after a timeout so we don't hang forever
          setTimeout(() => {
            cleanup();
            resolve({ url, ok: false });
          }, 5000);
        } catch (err) {
          resolve({ url, ok: false });
        }
      });
    });

    Promise.allSettled(promises).then(() => {
      setLoaded(true);
    });

    // nothing to cleanup at effect level
  }, [audioUrls]);

  return loaded;
};
