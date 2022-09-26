import React, { useEffect, useMemo, useState } from 'react';

/**
 * Hook for control that height of mapped children is the same
 * Example of usage:
 * <div ref={refs[index of mapped array]} height={['none', `${height}px`, `${height}px`]}>
 */

const useOneHeight = items => {
  const [height, setHeight] = useState(null);

  const refs = useMemo(
    () => Array.from({ length: items?.length }).map(() => React.createRef()),
    [items?.length],
  );

  useEffect(() => {
    const handleResizeItems = () => {
      setHeight(null);
      const heights = refs.map(r => r.current?.clientHeight).sort((a, b) => b - a);
      setHeight(heights[0]);
    };
    handleResizeItems();
    window.addEventListener('resize', handleResizeItems);

    return () => window.removeEventListener('resize', handleResizeItems);
  }, [refs]);

  return {
    height,
    refs,
  };
};

export default useOneHeight;
