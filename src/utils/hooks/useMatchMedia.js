import { useEffect, useState } from 'react';

function useMatchMedia(mediaQuery) {
  const [matches, setMatches] = useState(null);

  useEffect(() => {
    function onChange() {
      setMatches(this.matches);
    }

    const mediaQueryList = window.matchMedia(mediaQuery);

    setMatches(mediaQueryList.matches);
    mediaQueryList.addListener(onChange);
    return () => {
      mediaQueryList.removeListener(onChange);
    };
  }, [mediaQuery]);

  return matches;
}

export default useMatchMedia;
