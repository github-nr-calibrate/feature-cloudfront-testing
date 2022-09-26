import { useRef, createRef } from 'react';

function useRefs(array) {
  const refs = useRef([]);
  refs.current = Array.from(array, (_, i) => refs.current[i] || createRef());
  return refs.current;
}

export default useRefs;
