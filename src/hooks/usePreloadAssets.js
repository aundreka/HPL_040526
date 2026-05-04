import { useEffect } from "react";

export function usePreloadAssets(imageUrls = [], audioUrls = []) {
  useEffect(() => {
    const startPreload = () => {
      imageUrls.forEach((src) => {
        const image = new Image();
        image.decoding = "async";
        image.src = src;
      });

      audioUrls.forEach((src) => {
        const audio = new Audio();
        audio.preload = "auto";
        audio.src = src;
        audio.load();
      });
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(startPreload, { timeout: 1200 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(startPreload, 0);
    return () => window.clearTimeout(timeoutId);
  }, [audioUrls, imageUrls]);
}
