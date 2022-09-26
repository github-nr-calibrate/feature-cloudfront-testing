import React, { useState, useEffect } from 'react';
import PropTypes, { RichText as PrismicText, PrismicImage, PrismicLink } from 'types';
import styled from 'styled-components';
import { Box, Flex, Container } from 'components/Layout';
import { Text, RichText } from 'components/Text';
import ResponsiveImage from 'components/ResponsiveImage';
import { hasText, slugify } from 'utils';
import { useCarousel } from 'utils/hooks';
import { MQBelow, MQAbove } from 'styles/mediaQueries';
import { Animation } from 'components/Animation';
import { StarRating } from 'components/StarRating';
import { Carousel } from 'components/Carousel';
import { ThemeBlock } from 'components/ThemeBlock';
import { Link } from 'components/Link';
import { Modal } from 'components/Modal';
import { VideoPlayer } from 'components/VideoPlayer';
import { SectionHeader } from 'components/SectionHeader';

const FixedCards = ({
  primary,
  items,
}) => {
  const {
    heading,
    body_copy,
    show_rating,
    color_theme,
  } = primary;

  // Carousel component handles multiple image carousels
  // They respond to useCarousel index value and controls, unified by the `const` below
  const carouselId = hasText(heading) ? `${slugify(heading[0].text)}-carousel` : 'fixed-cards-carousel';
  const [carouselTransitionDirection, setCarouselTransitionDirection] = useState();
  const [carouselIsAnimating, setCarouselIsAnimating] = useState(false);
  const carouselTransitionDuration = 0.8; // seconds

  const [activeIndex, controls] = useCarousel(items.length, {
    interval: null,
    autoTimeout: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemsHaveVideo, setItemsHaveVideo] = useState(false);
  const [modalVideo, setModalVideo] = useState();

  useEffect(() => {
    items.forEach(item => {
      if ((!!item.video_url && !!item.video_url.url)
        || (!!item.video_file && !!item.video_file.url)
      ) {
        item.hasVideo = true;
        setItemsHaveVideo(true);
      }
    });
  }, [items]);

  return (
    <ThemeBlock theme={color_theme} paddingTop={['5rem',, '6.5rem']} paddingBottom={['5rem',, '6.5rem']}>
      <SectionHeader
        heading={heading}
        subheading={body_copy}
      >
        {show_rating && (
        <StarRating mt="1rem" />
        )}
      </SectionHeader>

      <Container>
        <CardsContainer pt={(hasText(heading) || hasText(body_copy)) && ['3.5rem', '4rem', '5.5rem']} mt={hasText(heading) && ['3.5rem', '4rem', '4.5rem']} $hasHeading={hasText(heading)}>
          <Animation name="fadeIn">

            <CardsCarouselContainer id={carouselId}>
              <CardsMainText>
                {items.map((item, index) => {
                  const {
                    item_body_copy,
                    slide_body,
                    item_label_name,
                    item_label_membership_year,
                    item_label_age,
                    item_label_location,
                    item_link,
                    post_link,
                    item_link_label,
                    post_link_label,
                    hasVideo,
                  } = item;

                  const slideCopy = slide_body || item_body_copy;
                  const link = item_link || post_link;
                  const linkLabel = item_link_label || post_link_label;

                  return (index === activeIndex && (
                    <TextContainer
                      key={`${carouselId}_cardtext_${index}`}
                      className={index === activeIndex ? 'fadeIn' : 'hidden'}
                      carouselTransitionDuration={carouselTransitionDuration}
                    >
                      <RichText typeStyle="subhead">
                        {slideCopy}
                      </RichText>

                      {item_label_name && (
                        <Text typeStyle="bodyM" mt="1.5rem">
                          <strong>{item_label_name}</strong>
                          {item_label_membership_year && `, ${item_label_membership_year}`}
                          <br />
                          <span>
                            {item_label_age && `${item_label_age} yo`}
                            {item_label_location && item_label_age && ' • '}
                            {item_label_location && item_label_location}
                          </span>
                        </Text>
                      )}

                      {(link && linkLabel)
                        && (
                          <Link doc={item_link || post_link}>
                            {item_link_label || post_link_label}
                          </Link>
                        )}

                      {hasVideo && (
                        <a
                          role="button"
                          tabIndex="0"
                          onClick={() => {
                            setModalVideo(item);
                            setIsModalOpen(true);
                          }}
                          aria-label="Play video in overlay"
                        >
                          Watch video
                        </a>
                      )}
                    </TextContainer>
                  ));
               })}
              </CardsMainText>

              <CardsMainImage>
                <Carousel
                  initialIndex={activeIndex}
                  transitionDirection={carouselTransitionDirection}
                  transitionDuration={carouselTransitionDuration * 1000}
                >
                  {items.map((item, index) => {
                    const {
                      icon_image,
                      slide_image,
                    } = item;

                    const image = icon_image || slide_image;

                    return (
                      <figure
                        key={`${carouselId}_cardimage1_${index}`}
                        aria-hidden={index !== activeIndex}
                      >
                        <ResponsiveImage src={image} ratio={1.35} />
                      </figure>
                    );
                  })}
                </Carousel>
              </CardsMainImage>

              <CardsNextImages>
                <Carousel
                  initialIndex={activeIndex + 1}
                  transitionDirection={carouselTransitionDirection}
                  transitionDuration={carouselTransitionDuration * 1000}
                >
                  {items.map((item, index) => {
                    const {
                      icon_image,
                      slide_image,
                    } = item;

                    const image = icon_image || slide_image;

                    return (
                      <figure
                        key={`${carouselId}_cardimage2_${index}`}
                        aria-hidden={index !== activeIndex + 1}
                      >
                        <ResponsiveImage src={image} ratio={1.35} />
                      </figure>
                    );
                  })}
                </Carousel>
                <Carousel
                  initialIndex={activeIndex + 2}
                  transitionDirection={carouselTransitionDirection}
                  transitionDuration={carouselTransitionDuration * 1000}
                >
                  {items.map((item, index) => {
                    const {
                      icon_image,
                      slide_image,
                    } = item;

                    const image = icon_image || slide_image;

                    return (
                      <figure
                        key={`${carouselId}_cardimage3_${index}`}
                        aria-hidden={index !== activeIndex + 2}
                      >
                        <ResponsiveImage src={image} ratio={1.35} />
                      </figure>
                    );
                  })}
                </Carousel>
              </CardsNextImages>

              <CardsControls>
                <ControlsButton
                  type="button"
                  onClick={() => {
                    if (!carouselIsAnimating) {
                      setCarouselIsAnimating(true);
                      controls.prev();
                      setCarouselTransitionDirection('prev');
                      setTimeout(() => {
                        setCarouselIsAnimating(false);
                      }, carouselTransitionDuration * 1000);
                    }
                  }}
                  aria-controls={carouselId}
                  aria-label="Previous item"
                  style={{
                    transform: 'rotate(180deg)',
                  }}
                  disabled={activeIndex === 0}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.1 7.5 8.5 2.9c-.3-.3-.7-.3-.9 0-.3.3-.3.7 0 .9l3.5 3.5H3.3c-.3 0-.6.3-.6.7s.3.7.6.7H11l-3.5 3.5c-.3.3-.3.7 0 .9.1.1.3.2.5.2s.3-.1.5-.2l4.7-4.7c.1-.1.2-.3.2-.5s-.1-.2-.3-.4z" />
                  </svg>
                </ControlsButton>
                <ControlsButton
                  type="button"
                  onClick={() => {
                    if (!carouselIsAnimating) {
                      setCarouselIsAnimating(true);
                      controls.next();
                      setCarouselTransitionDirection('next');
                      setTimeout(() => {
                        setCarouselIsAnimating(false);
                      }, carouselTransitionDuration * 1000);
                    }
                  }}
                  aria-controls={carouselId}
                  aria-label="Next item"
                  disabled={activeIndex === items.length - 1}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.1 7.5 8.5 2.9c-.3-.3-.7-.3-.9 0-.3.3-.3.7 0 .9l3.5 3.5H3.3c-.3 0-.6.3-.6.7s.3.7.6.7H11l-3.5 3.5c-.3.3-.3.7 0 .9.1.1.3.2.5.2s.3-.1.5-.2l4.7-4.7c.1-.1.2-.3.2-.5s-.1-.2-.3-.4z" />
                  </svg>
                </ControlsButton>
              </CardsControls>
            </CardsCarouselContainer>

          </Animation>
        </CardsContainer>
      </Container>

      {itemsHaveVideo && (
        <Modal
          open={isModalOpen}
          close={() => setIsModalOpen(false)}
        >
          <VideoPlayer {...modalVideo} isInModal />
        </Modal>
      )}
    </ThemeBlock>
  );
};

const CardsContainer = styled(Box)`
  border-top: ${({ $hasHeading }) => ($hasHeading ? '1px solid var(--border-color)' : 'none')};
`;

const CardsCarouselContainer = styled.div`
  display: grid;
  grid-row-gap: 2.5rem;
  grid-column-gap: 1rem;
  grid-template-columns: 2fr 0.5fr;
  width: calc(100% + 1.5rem); // Extra width offsets gutter value for overflow effect. TODO: match to theme.gutters
  overflow: hidden;
  grid-template-areas:
      "mainImage nextImages"
      "mainText  mainText"
      "controls  controls";

  ${MQAbove.sm`
    grid-template-columns: 3fr 2fr;
  `}

  ${MQAbove.md`
    width: calc(100% + 3rem); // Extra width offsets gutter value for overflow effect - TODO: match to theme.gutters
    grid-column-gap: 1rem;
    grid-row-gap: 1.5rem;
    grid-template-areas:
      "mainText mainImage nextImages"
      "mainText mainImage controls";
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto 1fr;
  `}

  ${MQAbove.xl`
    width: 100%; // No more overflow effect
  `}
`;

const CardsMainText = styled.div`
  grid-area: mainText;
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;

  ${MQBelow.md`
    margin-right: 1.5rem; // Add back gutter value from overflow effect - TODO: match to theme.gutters
  `}

  ${MQAbove.md`
    margin-right: 3rem;
  `}
`;

const TextContainer = styled.div`
  grid-column: 1;
  grid-row: 1;
  display: flex;
  flex-direction: column;

  strong {
    color: currentColor; // Color theme helper
  }

  span {
    opacity: 0.5; // Opacity works with any theme. Should new color value come from the theme instead?
  }

  a {
    margin-top: 1.5rem;
    font-weight: 500;
    text-decoration: underline;
    cursor: pointer;
  }

  ${MQAbove.md`
    justify-content: center;
  `}

  &.hidden {
    visibility: hidden;
  }

  /* Fade In */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  &.fadeIn {
    animation-duration: ${({ carouselTransitionDuration }) => `${carouselTransitionDuration}s`};
    animation-fill-mode: both;
    animation-name: fadeIn;
    animation-timing-function: ease-out;
  }
`;

const CardsMainImage = styled.div`
  grid-area: mainImage;
  display: flex;
`;

const CardsNextImages = styled.div`
  grid-area: nextImages;
  display: flex;
  grid-gap: 1rem;
  margin-right: -4rem; // Must match extra value in CardsControls margin-left calc()

  ${MQBelow.sm`
    // Hide last image, but keep in document flow to not lose index value on resize
    .carousel-container:last-child {
      visibility: hidden;
      max-width: 0;
    }
  `}

  ${MQAbove.xl`
     margin-right: 0; // No more overflow effect
  `}
`;

const CardsControls = styled(Flex)`
  grid-area: controls;

  ${MQBelow.md`
    justify-content: flex-end;
    gap: 1.5rem;
    margin-right: 1.5rem; // Add back gutter value from overflow effect - TODO: match to theme.gutters
  `}

  ${MQAbove.md`
    grid-gap: 1rem;
  `}

  ${MQAbove.lg`
    margin-left: calc(50% + (0.5 * 1rem) + (0.5 * 4rem)); // Extra must match CardsNextImages margin-right
    grid-gap: 1.5rem;
  `}

  ${MQAbove.xl`
     margin-left: auto;
  `}
`;

const ControlsButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.5rem;
  min-height: 2.5rem;
  width: 2.5rem;
  min-width: 2.5rem;
  padding: 0.625em;
  color: inherit;
  border: 1px solid var(--color__lavender);
  border-radius: 50%;
  background: transparent;
  transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;

  ${MQBelow.md`
    height: 3rem;
    min-height: 3rem;
    width: 3rem;
    min-width: 3rem;
  `}

  :disabled {
    opacity: 0.5;
  }

  :hover:not(:disabled) {
    color: white;
    background: var(--color__lavender);
  }
`;

FixedCards.propTypes = {
  primary: PropTypes.shape({
    heading: PrismicText,
    body_copy: PrismicText,
    show_rating: PropTypes.bool,
    color_theme: PropTypes.string,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    icon_image: PrismicImage,
    slide_image: PrismicImage,
    item_body_copy: PrismicText,
    slide_body: PrismicText,
    item_link: PrismicLink,
    item_link_label: PropTypes.string,
    post_link: PrismicLink,
    post_link_label: PropTypes.string,
    item_label_name: PrismicText,
    item_label_membership_year: PrismicText,
    item_label_age: PrismicText,
    item_label_location: PrismicText,
  })),
};

export default FixedCards;
