import React, { useState, useRef, useEffect } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import PropTypes from 'types';
import styled from 'styled-components';
import { slugify } from 'utils';
import { usePrefersReducedMotion } from 'utils/hooks';
import ResponsiveImage from 'components/ResponsiveImage';

function LazyVideo({
 video, webmVideo, fallback, autoPlay = true, ratio, fluid, className,
}) {
  const videoRef = useRef();
  const isPrefersReducedMotion = usePrefersReducedMotion();
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    // Reload sources if prefers-reduced-motion flag changes
    if (videoRef.current && isInViewport(videoRef.current)) {
      loadSources(videoRef);
    }
  }, [videoRef, isPrefersReducedMotion]);

  function togglePlayback() {
    if (videoRef.current) {
      // Toggle the indented playback state
      setIsPlaying(!isPlaying);

      // Match video playback to the state
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
    }
  }

  function onChange(isVisible) {
    // Load video sources if the video is in viewport
    if (isVisible && videoRef.current) {
      loadSources(videoRef);
    }
  }

  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0
      && rect.left >= 0
      && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
      && rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function loadSources(videoRef) {
    const sources = Array.from(videoRef.current.children);

    sources.forEach(source => {
      source.src = source.dataset.src;
    });

    videoRef.current.load();
  }

  const FallBackImage = () => {
    if (!fallback) {
      return <div className="no-fallback-image" />;
    }

    return (
      <ResponsiveImage
        src={fallback}
        ratio={ratio}
        fluid={fluid}
        className={className}
      />
    );
  };

  const ToggleButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.5rem;
    width: 2.5rem;
    padding: 0.625em;
    color: white;
    border: 3px solid white;
    border-radius: 50%;
    background: transparent;
    transition: color 0.3s ease-in-out, background 0.3s ease-in-out;

    :hover {
      color: var(--color__lavender);
      background: white;
    }
  `;

  const generateId = text => {
    if (text?.length > 0) {
      return slugify(text);
    }
    return null;
  };

  return (
    <>
      {!isPrefersReducedMotion && autoPlay && (
        <ToggleButton
          type="button"
          onClick={togglePlayback}
          aria-controls={generateId(webmVideo.url || video.url)}
          aria-label={`${isPlaying ? 'Pause' : 'Play'} video`}
        >
          <svg width="16" height="16" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
            {isPlaying ? (
              <path d="M6 0H1V16H6V0ZM15 0H10V16H15V0Z" />
            ) : (
              <path d="M3 0L16 8L3 16V0Z" />
            )}
          </svg>
        </ToggleButton>
      )}
      <VisibilitySensor onChange={onChange} offset={{ top: 10 }} partialVisibility>
        {!isPrefersReducedMotion ? (
          <video
            autoPlay={autoPlay && isPlaying}
            muted
            loop
            playsInline
            id={generateId(webmVideo.url || video.url)}
            ref={videoRef}
          >
            {video.url && <source data-src={video.url} type="video/mp4" />}
            {webmVideo.url && <source data-src={webmVideo.url} type="video/webm" />}
          </video>
        ) : (
          <FallBackImage />
        )}
      </VisibilitySensor>
    </>
  );
}

LazyVideo.propTypes = {
  video: PropTypes.string,
  webmVideo: PropTypes.string,
  fallback: PropTypes.string,
  autoPlay: PropTypes.bool,
  ratio: PropTypes.string,
  fluid: PropTypes.bool,
  className: PropTypes.string,
};

export default LazyVideo;
