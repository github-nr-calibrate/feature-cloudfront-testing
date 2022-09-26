import { useEffect, useState, useRef } from 'react';
import { Theme } from 'styles/theme';

const useCurrentBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState('xs');
  const prevBreakpoint = useRef();

  useEffect(() => {
    const checkBreakpoint = () => {
      // Ref is necessary to prevent setBreakpoint being called twice
      const cbp = Theme.currentBreakpoint();
      if (prevBreakpoint.current !== cbp) {
        setBreakpoint(cbp);
        prevBreakpoint.current = cbp;
      }
    };

    checkBreakpoint();
    window.addEventListener('resize', checkBreakpoint);
    return () => window.removeEventListener('resize', checkBreakpoint);
  }, []);

  return breakpoint;
};

export default useCurrentBreakpoint;
