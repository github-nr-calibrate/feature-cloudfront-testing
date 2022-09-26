import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { Container, Box } from 'components/Layout';
import PropTypes, {
  RichText as PrismicText, PrismicImage, PrismicDoc,
} from 'types';
import { MQAbove, MQBelow } from 'styles/mediaQueries';
import { SectionHeader } from 'components/SectionHeader';
import StyledButton from 'components/Button/StyledButton';
import { Animation } from 'components/Animation';
import BackgroundImage from 'components/Layout/BackgroundImage';
import { hasText } from 'utils';
import { usePrefersReducedMotion, useCta } from 'utils/hooks';
import MemberStoriesItem from './MemberStoriesItem';

const GridContainer = styled.div`
    display: grid;
    width: 100%;
    padding-bottom: 6.25rem;
    grid-template-columns: 1fr; 
    grid-template-rows: auto 1fr; 
    gap: 0.625rem 0; 
    grid-template-areas: 
      "Header"
      "Image"; 

    .MemberStoryItem1,
    .MemberStoryItem2,
    .MemberStoryItem3,
    .MemberStoryItem4,
    .MemberStoryItem5 {
      grid-area: Image;
    }

    ${MQBelow.xs`
      padding-bottom: 5rem;
    `}

    ${MQAbove.md`
      height: clamp(900px, 80vh, 900px);
      padding-bottom: 12.5rem;
      grid-template-columns: repeat(3, minmax(0, 1fr)); 
      grid-template-rows: auto auto auto 1fr 1fr 1fr 1fr 1fr 1fr; 
      gap: 30px 30px; 
      grid-template-areas: 
        "Header Header Header"
        "Header Header Header"
        "Header Header Header"
        "Image1 Image2 Image4"
        "Image1 Image2 Image4"
        "Image1 Image2 Image4"
        "Image1 Image2 Image5"
        "Image1 Image3 Image5"
        "Image1 Image3 Image5";

      .MemberStoryItem1 {
        grid-area: Image1;
      }

      .MemberStoryItem2 {
        grid-area: Image2;
      }

      .MemberStoryItem3 {
        grid-area: Image3;
      }

      .MemberStoryItem4 {
        grid-area: Image4;
      }

      .MemberStoryItem5 {
        grid-area: Image5;
      }
  `}

    ${MQAbove.lg`
        height: clamp(900px, 80vh, 900px);
        padding-bottom: 7.25rem;
        grid-auto-rows: 1fr; 
        grid-template-rows: repeat(10, minmax(0, 1fr)); 
        gap: 30px 30px; 
        grid-template-areas: 
            "Header Image2 Image4"
            "Header Image2 Image4"
            "Header Image2 Image4"
            "Header Image2 Image4"
            "Header Image2 Image5"
            "Image1 Image2 Image5"
            "Image1 Image3 Image5"
            "Image1 Image3 Image5"
            "Image1 Image3 Image5"
            "Controls Controls Controls";
  `}
`;

const Controls = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.625rem;
  background: rgba(0, 0, 0, 0.05);
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;

  button {
    transition: transform 0.15s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

const getNextIndex = (index, length) => {
  if (index < length - 1) {
    return (index + 1);
  }
  return 0;
};

const getPrevIndex = (index, length) => {
  if (index === 0) {
    return length - 1;
  }
  return (index - 1);
};

function MemberStories({ items, primary }) {
  const {
    emphasis_color,
    background_color,
    heading,
    subheading,
    text_color,
    background_image,
    background_position,
    background_image_size,
  } = primary;

  const cta = useCta(primary);

  const theme = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeItem, setActiveItem] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [paused, setPaused] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      setPaused(true);
    } else {
      setPaused(false);
    }
  }, [prefersReducedMotion]);

  // Increase activeItem by 1 every 5 seconds until it reaches the length of items
  useEffect(() => {
    let interval;
    if (playing && !paused) {
      interval = setInterval(() => {
        setActiveItem(getNextIndex(activeItem, items.length));
      }, 5000);
    } else if (!playing) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [activeItem, items, playing, paused]);

  return (
    <Box background={theme.colors[background_color]} as="section" position="relative">
      {background_image?.url && (
      <BackgroundImage
        src={background_image.url}
        bgPosition={background_position}
        bgSize={background_image_size}
      />
      )}

      <Animation name="fadeIn">
        <Container pt={[4, 4, 5]}>
          <GridContainer>
            {hasText(heading) || hasText(subheading) ? (
              <Box gridArea="Header">
                <SectionHeader
                  heading={heading}
                  subheading={subheading}
                  emphasisColor={emphasis_color}
                  textColor={text_color}
                  textAlign="left"
                >
                  {cta && (
                  <StyledButton
                    data={cta}
                    mt="2rem"
                  />
                  )}
                </SectionHeader>
              </Box>
            ) : null}
            {items.map((item, index) => (
              <MemberStoriesItem
                isVisible={activeItem === index}
                index={index}
                item={item}
                setActiveItem={setActiveItem}
                setPlaying={setPlaying}
                totalItems={items.length}
                paused={paused}
                getNextIndex={getNextIndex}
              />
            ))}
          </GridContainer>
        </Container>
      </Animation>

      <Controls>
        <button
          onClick={() => {
            setPaused(true);
            setPlaying(false);
            setActiveItem(getPrevIndex(activeItem, items.length));
          }}
        >
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 -1.31134e-06C6.71573 -2.03558e-06 2.03558e-06 6.71573 1.31134e-06 15C5.87108e-07 23.2843 6.71573 30 15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 -5.87108e-07 15 -1.31134e-06Z" fill="white" />
            <path fillRule="evenodd" clipRule="evenodd" d="M13.7344 14.6197L21 8.96872L21 21L13.7344 15.349L13.7344 21L6 14.9844L13.7344 8.96872L13.7344 14.6197Z" fill="#211E3F" />
          </svg>
        </button>

        <button onClick={() => {
          setPaused(!paused);
          setPlaying(true);
          paused && setActiveItem(getNextIndex(activeItem, items.length));
        }}
        >
          {paused ? (
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30Z" fill="white" />
              <path d="M12 9L21 15L12 21V9Z" fill="#211E3F" />
            </svg>

          )
            : (
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30Z" fill="white" />
                <path d="M12 19.5V10.5" stroke="#211E3F" strokeWidth="3" strokeLinecap="square" strokeLinejoin="round" />
                <path d="M18 19.5V10.5" stroke="#211E3F" strokeWidth="3" strokeLinecap="square" strokeLinejoin="round" />
              </svg>
            )}
        </button>

        <button
          onClick={() => {
            setPaused(true);
            setPlaying(false);
            setActiveItem(getNextIndex(activeItem, items.length));
          }}
        >
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30Z" fill="white" />
            <path fillRule="evenodd" clipRule="evenodd" d="M16.2656 15.3803L9 21.0313V9L16.2656 14.651V9L24 15.0156L16.2656 21.0313V15.3803Z" fill="#211E3F" />
          </svg>
        </button>
      </Controls>
    </Box>
  );
}

MemberStories.propTypes = {
  primary: PropTypes.shape({
    emphasis_color: PropTypes.string,
    text_color: PropTypes.string,
    background_color: PropTypes.string,
    background_image: PrismicImage,
    background_position: PropTypes.string,
    background_image_size: PropTypes.string,
    heading: PrismicText,
    subheading: PrismicText,
    cta_text: PropTypes.string,
    cta_color: PropTypes.string,
    cta_url: PrismicDoc,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    image: PrismicImage,
  })),
};

export default MemberStories;
