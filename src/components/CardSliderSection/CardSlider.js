import React, { useState, useRef, useEffect } from 'react';
import PropTypes, { RichText as RichTextType, PrismicDoc, PrismicLink } from 'types';
import { Container, Box, Flex } from 'components/Layout';
import { SmoothCarousel } from 'components/SmoothCarousel';
import { useMatchMedia, useCta } from 'utils/hooks';
import { lessThan } from 'styles/media';
import styled, { useTheme } from 'styled-components';
import { transparentize } from 'polished';
import StyledButton from 'components/Button/StyledButton';
import { SectionHeader } from 'components/SectionHeader';

export function ControlButton({
  direction, invert, uiColor, ...rest
}) {
  const theme = useTheme();
  return (
    <StyledControlButton
      as="button"
      outline="none"
      border="2px solid"
      borderColor={transparentize(0.8, theme.colors[uiColor])}
      borderRadius="50%"
      height="2.75rem"
      width="2.75rem"
      padding="0"
      position="relative"
      color={uiColor}
      background="transparent"
      direction={direction}
      uiColor={uiColor}
      {...rest}
    >
      <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.37691e-06 9.5L15.75 0.406737L15.75 18.5933L1.37691e-06 9.5Z" fill="currentColor" />
      </svg>
    </StyledControlButton>
  );
}

const StyledControlButton = styled(Box)`
  transition: background-color 0.3s ease;
  & svg {
    height: 50%;
    width: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: center;
    transform:
      translate(calc(-50% - ${({ direction }) => direction === 'left' ? 2 : -2}px), -50%)
      rotate(${({ direction }) => direction === 'left' ? 0 : 180}deg);
  }
  :hover {
    background: ${({ theme, uiColor }) => transparentize(0.8, theme.colors[uiColor])};
    cursor: pointer;
  }
`;

ControlButton.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']),
  invert: PropTypes.bool,
  uiColor: PropTypes.string,
};

const CardSlider = ({
  items,
  buttons,
  sub_heading,
  itemGap,
  indicatorOffset,
  invert,
  themeColor,
  themeColorOverride,
  fadeColor,
  primary,
  ...rest
}) => {
  const {
    heading,
    subheading,
    emphasis_color,
    text_color,
    background_color,
    heading_color,
  } = primary || {};

  const cta = useCta(primary || {});

  const theme = useTheme();
  const isMobile = useMatchMedia(lessThan('md'));
  const sliderControlsRef = useRef();
  const [containerOffset, setContainerOffset] = useState(0);
  const indicatorContRef = useRef();
  const indicatorRef = useRef();
  const buttonRef = useRef();
  const [showButtons, setShowButtons] = useState(buttons && !isMobile);

  const carouselItemGap = Math.min(containerOffset, itemGap);

  const showHeading = heading && heading.length;

  const themeBaseColor = themeColor ? 'lavender' : 'greenLight';

  const uiColor = themeColorOverride && theme.colors[themeColorOverride]
    ? themeColorOverride
    : themeBaseColor;

  const handleResize = () => {
    setContainerOffset(indicatorContRef.current.getBoundingClientRect().left);
  };

  const handleScroll = (scrollData) => {
    const indicatorContBounds = indicatorContRef.current.getBoundingClientRect();
    if (scrollData.percentVisible < 1) {
      const newWidth = indicatorContBounds.width * scrollData.percentVisible;
      indicatorRef.current.style.width = `${newWidth}px`;
      indicatorRef.current.style.left = `${(indicatorContBounds.width - newWidth) * scrollData.percentScrolled}px`;
      indicatorContRef.current.style.opacity = 1;
    } else indicatorContRef.current.style.opacity = 0;
    setShowButtons(buttons && !isMobile && scrollData.percentVisible < 1);
  };

  const handleButtonClick = (forward) => {
    if (sliderControlsRef.current.slideRight && forward) sliderControlsRef.current.slideRight();
    if (sliderControlsRef.current.slideLeft && !forward) sliderControlsRef.current.slideLeft();
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box
      flexDirection="column"
      overflow="hidden"
      bg={background_color || 'grey'}
      color={text_color}
      {...rest}
    >
      {(showHeading || showButtons) && (
        <Container pb="5rem">
          <Flex justifyContent={!showHeading && showButtons ? 'flex-end' : 'space-between'}>
            {showHeading && (
            <SectionHeader
              heading={heading}
              subheading={subheading}
              emphasisColor={emphasis_color}
              textColor={heading_color}
              textAlign="left"
              typeStyle="p1"
            >
              {cta && (
              <StyledButton
                data={cta}
                mt="1.25rem"
              />
              )}
            </SectionHeader>
            )}
            {showButtons && (
              <Flex ref={buttonRef}>
                <ControlButton
                  invert={invert}
                  uiColor={cta?.backgroundColor || uiColor}
                  direction="left"
                  onClick={() => handleButtonClick(false)}
                  mr="2"
                  aria-label="Scroll left"
                />
                <ControlButton
                  invert={invert}
                  uiColor={cta?.backgroundColor || uiColor}
                  direction="right"
                  onClick={() => handleButtonClick(true)}
                  aria-label="Scroll right"
                />
              </Flex>
            )}
          </Flex>
        </Container>
      )}
      <SmoothCarousel
        mb={indicatorOffset ? 4 : 0}
        width="100vw"
        enableMouseDrag={false}
        infinite={false}
        carouselMargin={containerOffset - carouselItemGap / 2}
        itemGap={carouselItemGap}
        controlsRef={sliderControlsRef}
        scrollCallback={handleScroll}
        items={items}
        fadeColor={fadeColor}
        fadeWidth={containerOffset}
      />
      <Container>
        <Box
          bg={transparentize(0.8, theme.colors[uiColor])}
          width="100%"
          height="3px"
          style={{
            transition: 'opacity 0.5s ease',
          }}
          position="relative"
          ref={indicatorContRef}
        >
          <Box
            height="100%"
            position="absolute"
            top="0"
            left="0"
            ref={indicatorRef}
            bg={uiColor}
          />
        </Box>
      </Container>
    </Box>
  );
};

CardSlider.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
  buttons: PropTypes.bool,
  heading: RichTextType,
  sub_heading: RichTextType,
  itemGap: PropTypes.number,
  indicatorOffset: PropTypes.bool,
  invert: PropTypes.bool,
  themeColor: PropTypes.bool,
  themeColorOverride: PropTypes.string,
  fadeColor: PropTypes.string,
  cta: PropTypes.shape({
    label: PropTypes.string,
    doc: PrismicDoc,
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    fontWeight: PropTypes.string,
    style: PropTypes.string,
  }),
  primary: PropTypes.shape({
    heading: RichTextType,
    subheading: RichTextType,
    emphasis_color: PropTypes.string,
    body_copy: RichTextType,
    cta_button_label: RichTextType,
    cta_button_link: PrismicLink,
    background_color: PropTypes.string,
    heading_color: PropTypes.string,
  }),
};

CardSlider.defaultProps = {
  invert: false,
  itemGap: 36,
  indicatorOffset: true,
};

export default CardSlider;
