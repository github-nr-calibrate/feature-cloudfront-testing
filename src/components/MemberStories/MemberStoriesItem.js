import React, {
  useEffect, useRef,
} from 'react';
import styled from 'styled-components';
import PropTypes, { PrismicImage, PrismicMediaLink } from 'types';
import { MQAbove } from 'styles/mediaQueries';
import { Text } from 'components/Text';
import ResponsiveImage from 'components/ResponsiveImage';
import { hasText } from 'utils';
import { useMatchMedia, useLazyVideo } from 'utils/hooks';
import { lessThan } from 'styles/media';
import { Link } from 'components/Link';

const GridItem = styled(Link)`
      display: flex;
      flex-direction: column;
      position: relative;
      z-index: ${({ isVisible }) => (isVisible ? 1 : 0)};
      opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
      transition: transform 0.15s ease-in-out, opacity 0.5s ease-in-out;

      ${MQAbove.md`
            opacity: 1;
      `}
  
      video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        aspect-ratio: 4 / 3;

        ${MQAbove.md`
          aspect-ratio: none;
        `}
      }

      &.GridItem--Link {
        padding: 0;
  
        :after {
          content: 'See More';
          position: absolute;
          top: 0.625rem;
          right: 0.625rem;
          color: white;
          background: rgba(0, 0, 0, 0.5);
          padding: 10px 20px;
          font-size: 0.75rem;
          line-height: 1;
          font-weight: 500;
          text-transform: uppercase;
          display: block;

          ${MQAbove.md`
            display: none;
          `}
        }
  
        .ResponsiveImage {
          overflow: hidden;
  
          img {
            transition: transform 2.5s ease-in-out;
          }
        }
        
        &:hover,
        &:focus-within {
  
          .Media {
            opacity: 1;
          }
  
          img {
            transform: scale(1.05);
          }
  
          :after {
            display: block;
          }
        }
      }
  `;

const Media = styled.div`
    position: relative;
    width: 100%;
    height: auto;
    transition: opacity 0.5s ease-in-out;
    background: rgba(0, 0, 0, 0.1);
    aspect-ratio: 4 / 3;

    ${MQAbove.md`
        height: 100%;
        aspect-ratio: none;
    `}
  
    &.Media--Hidden {
      opacity: 0;
  
      ${MQAbove.md`
        opacity: 0.5;
      `}
    }
  
    &.Media--Visible {
      opacity: 1;
    }
  `;

const Quote = styled.div`
      background: white;
      padding: 0.75rem;
      width: 95%;
      margin: 0 auto;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 2;
      border-radius: 0.3125rem;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
      transform: ${({ isVisible }) => (isVisible ? 'translateY(90%)' : 'translateY(100%)')};
      transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;

      p {
        word-break: break-word;
      }
  
      &.Quote--Mobile {
        position: relative;
        transform: ${({ isVisible }) => (isVisible ? 'translateY(-10%)' : 'translateY(20%)')};
      }
  `;

function MemberStoriesItem({
  index,
  isVisible,
  item,
  setActiveItem,
  setPlaying,
  totalItems,
  paused,
  getNextIndex,
}) {
  const isMobile = useMatchMedia(lessThan('md'));
  const {
    member_review_photo,
    member_review_quote,
    member_review_title,
    member_story_link,
    video,
    webm_video,
  } = item;

  useLazyVideo();
  const videoRef = useRef(null);

  // Set the video to play when the component is mounted
  useEffect(() => {
    if (videoRef.current && isVisible) {
      videoRef.current.play();
    } else if (videoRef.current && !isVisible) {
      videoRef.current.pause();
    }
  }, [isVisible, videoRef]);

  return (
    <GridItem
      isVisible={isVisible}
      doc={member_story_link}
      className={`
            ${member_story_link.link_type !== 'Any' ? 'GridItem--Link' : ''} 
            MemberStoryItem${index + 1}`}
      onMouseEnter={() => {
        setActiveItem(index),
        setPlaying(false);
      }}
      onMouseLeave={() => {
        !paused && setActiveItem(getNextIndex(index, totalItems)),
        setPlaying(true);
      }}
      key={`member-story-${index}`}
    >
      <Media className={isVisible ? 'Media--Visible Media' : 'Media--Hidden Media'}>
        {video?.url && (
          <video muted loop playsInline className="lazy hide-prefers-reduced-motion" ref={videoRef}>
            {webm_video?.url && <source data-src={webm_video.url} type="video/webm" />}
            {video?.url && <source data-src={video.url} type="video/mp4" />}
          </video>
          )}
        {member_review_photo?.url && (
          <ResponsiveImage
            src={member_review_photo}
            ratio="4:3"
            className={`${video?.url ? 'show-prefers-reduced-motion' : ''}`}
          />
          )}
      </Media>
      {hasText(member_review_quote) && (
        <Quote
          isVisible={isVisible}
          className={
              isMobile ? 'Quote--Mobile' : ''
            }
        >
          <Text
            fontSize={2}
          >
            {member_review_quote}
          </Text>
          <Text
            fontSize={1}
            fontWeight="bold"
            mt={2}
          >
            {member_review_title}
          </Text>
        </Quote>
      )}
    </GridItem>
  );
}

MemberStoriesItem.propTypes = {
  index: PropTypes.number,
  isVisible: PropTypes.bool,
  setActiveItem: PropTypes.func,
  getNextIndex: PropTypes.func,
  setPlaying: PropTypes.func,
  totalItems: PropTypes.number,
  paused: PropTypes.bool,
  item: PropTypes.shape({
    member_review_photo: PrismicImage,
    member_review_quote: PropTypes.string,
    member_review_title: PropTypes.string,
    video: PrismicMediaLink,
    webm_video: PrismicMediaLink,
    member_story_link: PropTypes.shape({
      link_type: PropTypes.string,
      url: PropTypes.string,
    }),
  }),
};

export default React.memo(MemberStoriesItem);
