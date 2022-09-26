import { useState, useEffect, useRef } from 'react';
import { mod } from 'utils';
import useInterval from './useInterval';
import usePrefersReducedMotion from './usePrefersReducedMotion';

const defaults = {
  interval: 6000,
  autoTimeout: 6000,
};

export default function useCarousel(numElements = 0, config = {}) {
  const options = {
    ...defaults,
    ...config,
  };

  const isPrefersReducedMotion = usePrefersReducedMotion();
  const indexRef = useRef(0);
  const [index, setIndex] = useState(indexRef.current);
  const [prevIndex, setPrevIndex] = useState();
  const [isRotating, setIsRotating] = useState(true);

  function updateIndex(n) {
    setPrevIndex(indexRef.current);
    indexRef.current = n;
    setIndex(indexRef.current);
  }

  function next() {
    rotateIndex(1);
    setIsRotating(false);
  }

  function prev() {
    rotateIndex(-1);
    setIsRotating(false);
  }

  function set(n) {
    updateIndex(n);
    setIsRotating(false);
  }

  function rotateIndex(n = 1) {
    updateIndex(mod(index + n, numElements));
  }

  function play() {
    setIsRotating(true);
  }

  function pause() {
    setIsRotating(false);
  }

  function toggle() {
    setIsRotating(!isRotating);
  }

  useEffect(() => {
    if (options.autoTimeout > 0 && !isRotating) {
      const timeout = setTimeout(play, options.autoTimeout);
      return () => clearTimeout(timeout);
    }
  });

  useEffect(() => {
    setIsRotating(!isPrefersReducedMotion);
  }, [isPrefersReducedMotion]);

  useInterval(rotateIndex, isRotating ? options.interval : null);

  const controls = {
    set,
    next,
    prev,
    play,
    pause,
    toggle,
  };

  return [index, controls, prevIndex, isRotating];
}
