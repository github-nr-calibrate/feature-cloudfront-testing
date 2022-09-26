import React from 'react';
import PropTypes, { PrismicMediaLink, PrismicImage } from 'types';
import styled from 'styled-components';
import { useMatchMedia } from 'utils/hooks';
import ResponsiveImage from 'components/ResponsiveImage';
import { lessThan } from 'styles/media';
import { LazyVideo } from 'components/LazyVideo';

function VariableMedia({
  src, breakpoint = 'sm', ratio, fluid, className, imgSrc,
}) {
  const {
    image,
    side_image,
    video,
    webm_video,
    video_mobile,
    webm_video_mobile,
    video_poster,
    has_desktop_video,
    has_mobile_video,
  } = src;
  const isMobile = useMatchMedia(lessThan(breakpoint));

  const imageSrc = imgSrc || image || side_image;

  const videoSrc = isMobile ? video_mobile : video;
  const webmVideoSrc = isMobile ? webm_video_mobile : webm_video;

  const Media = () => {
    if ((!has_mobile_video && isMobile) || (!has_desktop_video && !isMobile)) {
      return <ResponsiveImage src={imageSrc} ratio={ratio} fluid={fluid} className={className} />;
    }
    return (
      <MediaArea>
        <LazyVideo
          video={videoSrc}
          webmVideo={webmVideoSrc}
          fallback={video_poster}
          ratio={ratio}
          fluid={fluid}
          className={className}
        />
      </MediaArea>
    );
  };

  return imageSrc?.url || videoSrc?.url ? <Media /> : null;
}

const MediaArea = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex; /* Collapse whitespace in mobile */
  position: relative;

  button {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    z-index: 1;
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
  }
`;

VariableMedia.propTypes = {
  src: PropTypes.shape({
    image: PrismicImage,
    side_image: PrismicImage,
    video: PrismicMediaLink,
    webm_video: PrismicMediaLink,
    video_mobile: PrismicMediaLink,
    webm_video_mobile: PrismicMediaLink,
    video_poster: PrismicImage,
    has_desktop_video: PropTypes.bool,
    has_mobile_video: PropTypes.bool,
  }),
  breakpoint: PropTypes.string,
  ratio: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
  ]),
  fluid: PropTypes.bool,
  className: PropTypes.string,
  imgSrc: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
  ]),
};

export default VariableMedia;
