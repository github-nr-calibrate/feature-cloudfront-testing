import { useEffect } from 'react';
import { usePrefersReducedMotion } from 'utils/hooks';

function useLazyVideo() {
  const isPrefersReducedMotion = usePrefersReducedMotion();
  // Lazy load video sources
  useEffect(() => {
    const lazyVideos = document.querySelectorAll('video.lazy');
    const lazyVideoObserver = new IntersectionObserver((entries) => {
      entries.forEach((video) => {
        if (video.isIntersecting) {
          const sources = Array.from(video.target.children);

          sources.forEach((source) => {
            source.src = source.dataset.src;
          });

          video.target.load();
          video.target.classList.remove('lazy');
          lazyVideoObserver.unobserve(video.target);
        }
      });
    });

    lazyVideos.forEach((video) => {
      lazyVideoObserver.observe(video);
    });
  }, [isPrefersReducedMotion]);
}

export default useLazyVideo;
