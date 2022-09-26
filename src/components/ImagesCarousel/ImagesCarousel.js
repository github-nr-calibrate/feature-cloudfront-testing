import React, { useState, useEffect } from 'react';
import styled, { keyframes, useTheme, css } from 'styled-components';
import { Container } from 'components/Layout';
import PropTypes, { RichText as PrismicText, PrismicImage, PrismicDoc } from 'types';
import { RichText, Text } from 'components/Text';
import { MQAbove } from 'styles/mediaQueries';
import { useCta, usePrefersReducedMotion } from 'utils/hooks';
import StyledButton from 'components/Button/StyledButton';
import { hasText } from 'utils';
import { SectionHeader } from 'components/SectionHeader';
import { Animation } from 'components/Animation';
import { ThemeBlock } from 'components/ThemeBlock';
import ResponsiveImage from 'components/ResponsiveImage';
import { StarRating } from 'components/StarRating';

function ImagesCarousel({ items, primary }) {
  const {
    color_theme,
    heading,
    subheading,
    show_rating,
    breadcrumbs,
    images_layout,
  } = primary || {};

  const cta = useCta(primary);
  const theme = useTheme();
  const isPrefersReducedMotion = usePrefersReducedMotion();

  const [images] = useState([...items, ...items]);
  const [imagesNumber] = useState(items.length);
  const [imageWidth, setImageWidth] = useState(null);

  // Calculation of imageWidth based on the window.innerWidth
  useEffect(() => {
    let updatedImageWidth;
    let updatedImageWidthIndex;

    function handleResize() {
      if (window.innerWidth < theme.breakpointsObject.md) {
        updatedImageWidthIndex = 30;
      } else if (window.innerWidth < theme.breakpointsObject.lg) {
        updatedImageWidthIndex = 15;
      } else {
        updatedImageWidthIndex = 2.8;
      }
      updatedImageWidth = 100 / imagesNumber + updatedImageWidthIndex;
      setImageWidth(updatedImageWidth);
    }

    handleResize();

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [imageWidth, imagesNumber, theme.breakpointsObject.md, theme.breakpointsObject.lg]);

  const imagesOnly = !hasText(heading);

  return (
    <ThemeBlock theme={color_theme} paddingTop={imagesOnly ? '0' : '1rem'} paddingBottom="0" as={imagesOnly && 'div'}>
      {hasText(heading) && (
        <Container>
          <ImagesCarouselContainer>
            {hasText(breadcrumbs) && (
              <Breadcrumbs>
                <RichText>
                  {breadcrumbs}
                </RichText>
              </Breadcrumbs>
            )}
            <Header>
              <Animation name="fadeIn">
                <HeaderContainer>
                  <SectionHeader
                    heading={heading}
                    subheading={subheading}
                    maxWidth="55rem"
                  >
                    {cta && (
                      <StyledButton
                        data={cta}
                        mt="3rem"
                        center
                      />
                    )}

                    {show_rating && (
                      <StarRating />
                    )}
                  </SectionHeader>
                </HeaderContainer>
              </Animation>
            </Header>
          </ImagesCarouselContainer>
        </Container>
      )}
      {imageWidth && (
        <ImagesCarouselWrapper $zeroPadding={imagesOnly}>
          <ImagesWrapper
            numberOfItems={imagesNumber}
            imageWidth={imageWidth}
            isActive={!isPrefersReducedMotion}
            layout={images_layout}
          >
            {images.map(({ image, heading, subheading }, index) => (
              <Image key={`carousel-image-${index}`} imageWidth={imageWidth} layout={images_layout}>
                {image?.url && (<ResponsiveImage src={image} ratio={images_layout === 'staggered-images' ? 1.23 : 1.3} />)}
                {(hasText(heading) || hasText(subheading)) && (
                <ImageCaption>
                  {hasText(heading) && (
                  <Text
                    color={color_theme === 'light' ? 'textDark' : 'white'}
                    mr="0.45rem"
                    fontWeight="500"
                  >
                    {heading}
                  </Text>
                        )}
                  {hasText(subheading) && (
                  <Text
                    color={color_theme === 'light' ? 'textMediumLight' : 'textLight'}
                    textTransform="capitalize"
                  >
                    {subheading}
                  </Text>
                        )}
                </ImageCaption>
                    )}
              </Image>
                ))}
          </ImagesWrapper>
        </ImagesCarouselWrapper>
      )}
    </ThemeBlock>
  );
}

const ImagesCarouselContainer = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  padding: 4rem 0 0;
`;

const Header = styled.header`
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
`;

const HeaderContainer = styled.div`
  margin: auto;
`;

const ImagesCarouselWrapper = styled.div`
  overflow: hidden;

  ${MQAbove.md`
    padding: ${({ $zeroPadding }) => ($zeroPadding ? 'var(--spacing__sm) 0' : '0')};
  `}
`;

const runningLine = (numberOfItems, imageWidth) => keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
      transform: translateX(-${numberOfItems * imageWidth}%);
  }
`;

const ImagesWrapper = styled.div`
  white-space: nowrap;
  will-change: transform;
  
  ${({ isActive }) => isActive ? css`
    animation: ${({ numberOfItems, imageWidth }) => runningLine(numberOfItems, imageWidth)} linear infinite running;
    animation-duration: ${({ numberOfItems }) => numberOfItems * 15}s;
  ` : css`
    transform: translateX(-${({ imageWidth }) => Math.abs(imageWidth - ((100 - imageWidth) / 2))}%);
  `}

  ${({ layout }) => layout === 'staggered-images' && css`
    & > div:nth-child(even) {
      margin-top: 2rem;

      ${MQAbove.md`
        margin-top: 4.5rem;
      `}
    }
  `}
`;

const Image = styled.div`
  width: ${({ imageWidth }) => imageWidth}%;
  padding: 0 0.75rem;
  display: inline-block;
  vertical-align: top;

  ${({ layout }) => layout === 'aligned-images' && css`
    ${MQAbove.md`
      padding: 0 1rem;
    `}
  `}

  & > img {
    display: block;
    width: 100%;
    object-fit: cover;
  }
`;

const ImageCaption = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 1rem;

  p {
    white-space: normal;
    font-size: 0.875rem;
  }

  ${MQAbove.md`
    p {
      font-size: 1rem;
    }
  `}
`;

const Breadcrumbs = styled.div`
    text-align: center;
    margin-bottom: 1rem;

    ${MQAbove.md`
      margin-bottom: 1.25rem;
    `}

    p {
      text-transform: uppercase;
      font-weight: 600;
      line-height: 2.5;
    }
`;

// propTypes below needs to be cleared according to the slice in Prismic
ImagesCarousel.propTypes = {
  primary: PropTypes.shape({
    color_theme: PropTypes.string,
    breadcrumbs: PrismicText,
    heading: PrismicText,
    subheading: PrismicText,
    emphasis_color: PropTypes.string,
    cta_container_background_color: PropTypes.string,
    cta_container_text_color: PropTypes.string,
    cta_text: PropTypes.string,
    cta_color: PropTypes.string,
    cta_url: PrismicDoc,
    average_rating: PropTypes.number,
    images_layout: PropTypes.string,
    show_rating: PropTypes.bool,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    image: PrismicImage,
    heading: PropTypes.string,
    subheading: PropTypes.string,
  })),
};

export default ImagesCarousel;
