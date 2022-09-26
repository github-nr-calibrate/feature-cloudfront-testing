import React, { useState } from 'react';
import PropTypes, {
  RichText as PrismicText,
  PrismicImage,
  PrismicLink,
  PrismicMediaLink,
} from 'types';
import { Flex, Box } from 'components/Layout';
import { Text, RichText } from 'components/Text';
import styled from 'styled-components';
import ResponsiveImage from 'components/ResponsiveImage';
import { isEmpty, hasText } from 'utils';

const Video = styled.div`
  border-radius: inherit;

  iframe,
  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    overflow: hidden;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.3s ease-in-out;
  aspect-ratio: 16 / 9;
  background: black;

  @supports not (aspect-ratio: auto) {
    padding-bottom: 56.25%;
  }

  &:hover {
    box-shadow: 0px 1.23656px 2.43877px rgba(33, 30, 63, 0.0217013),
      0px 3.12736px 6.16784px rgba(33, 30, 63, 0.0310596),
      0px 6.37951px 12.5818px rgba(33, 30, 63, 0.0389404),
      0px 13.1406px 25.9162px rgba(33, 30, 63, 0.0482987), 0px 26px 51px rgba(33, 30, 63, 0.07);
  }
`;

const PlayButton = styled(Box)`
  color: white;
  transition: color 0.3s ease-in-out, background 0.3s ease-in-out;
  color: var(--color__nightshadeLight);

  svg {
    height: 18px;
    transform: translateX(10%);
  }
`;

const PreviewControls = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 40.96%, rgba(0, 0, 0, 0.61) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  color: white;
  border-radius: inherit;
  z-index: 1; // Stacking context helper to reveal focus outline

  .ResponsiveImage {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: inherit;
    overflow: hidden;
    z-index: -1; // Stacking context helper to reveal focus outline
  }

  .PlayButton {
    margin-right: 0.625rem;
  }

  &:hover,
  &:focus {
    .PlayButton {
      color: var(--color__lavender);
      background: white;
      border-color: white;
    }
  }
`;

function VideoPlayer({
  video_title,
  video_eyebrow,
  video_cover_image,
  video_url,
  video_file,
  isInModal,
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const eyebrow = video_eyebrow?.length > 0
    && video_eyebrow[0].text?.length > 0
    && video_eyebrow[0].text;
  const title = video_title?.length > 0 && video_title[0].text?.length > 0 && video_title[0].text;

  const VideoMedia = () => {
    // Only return one media type even if both are defined, defaulting to `video_file`
    if (video_file?.url) {
      return (
        // Video should have captions but we are not currently creating them
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video controls autoPlay>
          <source src={video_file.url} type={video_file.mime_type} />
        </video>
      );
    }
    if (video_url?.url) {
      return (
        <iframe
          src={`https://www.youtube.com/embed/${getYoutubeId(video_url.url)}?autoplay=${
            isEmpty(video_cover_image) && !isInModal ? '0' : '1'
          }&rel=0&color=white&modestbranding=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }
  };

  // Accessibility helper
  let videoLabel = 'Play video';

  if (eyebrow || title) {
    videoLabel += ':';

    if (eyebrow) {
      videoLabel += ` ${eyebrow}`;
    }

    if (title) {
      videoLabel += ` ${title}`;
    }
  }

  return (
    <>
      <VideoContainer className="VideoContainer" tabIndex={isInModal ? '0' : null}>
        {isLoaded || isEmpty(video_cover_image) ? (
          <Video>
            <VideoMedia />
          </Video>
        ) : (
          <PreviewControls onClick={() => setIsLoaded(true)} aria-label={videoLabel}>
            <ResponsiveImage src={video_cover_image} ratio={['16:9', '16:9']} />
            <Flex alignItems="center" zIndex="1" flexDirection="column" gridRowGap="3">
              <PlayButton
                height={['3rem', '3.5rem', '5rem']}
                width={['3rem', '3.5rem', '5rem']}
                padding="0.625rem"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="50%"
                background="white"
                className="PlayButton"
              >
                <svg
                  width="12"
                  height="16"
                  viewBox="0 0 12 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.454102 13.8786V1.85316C0.454102 0.620779 1.84709 -0.0960756 2.84992 0.620232L10.6664 6.20346C11.4768 6.78231
                  11.5179 7.97221 10.7494 8.60561L2.9329 15.0478C1.94456 15.8624 0.454102 15.1593 0.454102 13.8786Z"
                    fill="currentcolor"
                  />
                </svg>
              </PlayButton>
            </Flex>
          </PreviewControls>
        )}
      </VideoContainer>
      {(hasText(video_eyebrow) || hasText(video_title)) && (
        <Flex flexDirection="column" mt="0.5rem">
          {video_eyebrow && <RichText typeStyle="bodyS">{video_eyebrow}</RichText>}
          {video_title && (
            <Text typeStyle="bodyM" py="0" my="0">
              {video_title}
            </Text>
          )}
        </Flex>
      )}
    </>
  );
}

function getYoutubeId(url) {
  const videoId = /^https:\/\/(www\.)?youtu\.be/.test(url)
    ? url.replace(/^https:\/\/(www\.)?youtu\.be\/([\w-]{11}).*/, '$2')
    : url.replace(/.*\?v=([\w-]{11}).*/, '$1');

  return videoId;
}

VideoPlayer.propTypes = {
  video_title: PrismicText,
  video_eyebrow: PrismicText,
  video_url: PrismicLink,
  video_file: PrismicMediaLink,
  video_cover_image: PrismicImage,
  isInModal: PropTypes.bool,
};

export default VideoPlayer;
