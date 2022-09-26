import { useEffect } from 'react';

function useBodyLock(isLocked) {
  useEffect(() => {
    if (isLocked) {
      document.body.classList.add('util__body-lock');
    } else {
      document.body.classList.remove('util__body-lock');
    }
  }, [isLocked]);
}

export default useBodyLock;
