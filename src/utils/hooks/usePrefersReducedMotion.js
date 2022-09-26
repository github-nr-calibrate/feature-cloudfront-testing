import { useState, useEffect } from 'react';

const QUERY = '(prefers-reduced-motion: no-preference)';
function usePrefersReducedMotion() {
  // Default to false, since we don't know what the
  // user's preference is on initial load.
  const [
    isPrefersReducedMotion,
    setPrefersReducedMotion,
  ] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);
    // Set the true initial value, now that we're on the client:
    setPrefersReducedMotion(
      !window.matchMedia(QUERY).matches,
    );
    // Register our event listener
    const listener = (event) => {
      setPrefersReducedMotion(!event.matches);
    };
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', listener);
      return () => {
        mediaQueryList.removeEventListener('change', listener);
      };
    }
    // Safari 13.1 and lower don't support addEventListened and removeEventListener
    // need to use deprecated addListener and removeListener for unsupported browsers
    mediaQueryList.addListener(listener);
    return () => {
      mediaQueryList.removeListener(listener);
    };
  }, []);
  return isPrefersReducedMotion;
}

export default usePrefersReducedMotion;
