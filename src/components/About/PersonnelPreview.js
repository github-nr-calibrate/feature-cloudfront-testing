import React, { useEffect } from 'react';
import PropTypes, { RichText as RichTextType, PrismicLink, PrismicImage } from 'types';
import styled from 'styled-components';
import { Box, Container, Flex } from 'components/Layout';
import { Text, RichText } from 'components/Text';
import { MQAbove } from 'styles/mediaQueries';
import { Animation } from 'components/Animation';
import ResponsiveImage from 'components/ResponsiveImage';
import { hasText } from 'utils';

function PersonnelPreview({
 item, prevItem, nextItem, setContent, items,
}) {
  const {
    headshot,
    position,
    name,
    biography,
    quote,
  } = item;

    useEffect(() => {
        // If keyboard arrow keys are pressed, change the active item
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                setContent(prevItem);
            } else if (e.key === 'ArrowRight') {
                setContent(nextItem);
            }
        };
        // Add the event listener
        window.addEventListener('keydown', handleKeyDown);
        // Return a function to remove the event listener
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [setContent, prevItem, nextItem]);

  return (
    <FullScreenContent>
      <Container paddingTop={['6rem',, '8rem']} paddingBottom={['8rem',, '10rem']}>
        <Flex flexDirection={['column', 'row']} gridColumnGap={['0', '4rem', '6rem']}>
          <Box flex={['0 0 100%', '1 1 0%']} position="relative">
            <Animation name="revealLeft">
              <ImageBox>
                <ResponsiveImage src={headshot} ratio={1.13} />
              </ImageBox>
            </Animation>
          </Box>
          <Box flex={['0 0 100%', '0 0 50%']}>
            <Animation name="fadeIn">
              <Box>
                {hasText(position) && (
                <PositionBox
                  typeStyle="labelsL"
                  marginBottom={['1rem',, '1.5rem']}
                >
                  {position}
                </PositionBox>
                )}

                {hasText(name) && (
                <Text
                  typeStyle="h2"
                  marginBottom={['1rem',, '3.125rem']}
                >
                  {name}
                </Text>
                )}

                {hasText(biography) && (
                <BioBox
                  typeStyle="bodyL"
                  marginBottom={['1.5rem',, '2rem']}
                >
                  {biography}
                </BioBox>
                )}

                {hasText(quote) && (
                <QuoteBox>
                  <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5769 18H18.2692V10.5385H14.8077V9.30769C14.8077 6.76923 15.3462 4.46154 18.0385 3.84615V0C12.9615 0.846152 10.5769 4.38461 10.5769 9.69231V18ZM0.5 18H8.19231V10.5385H4.73077V9.30769C4.73077 6.76923 5.26923 4.46154 7.96154 3.84615V0C2.88462 0.846152 0.5 4.38461 0.5 9.69231V18Z" fill="#8F67E9" />
                  </svg>
                  <Text typeStyle="h6">
                    {quote}
                  </Text>
                </QuoteBox>
                )}
              </Box>
            </Animation>
          </Box>
        </Flex>
      </Container>
      <PreviewControls>
        <Container>
          <Controls>
            <Box>
              <ControlsButton
                direction="prev"
                item={prevItem}
                setContent={setContent}
                items={items}
              />
            </Box>
            <Box>
              <ControlsButton
                direction="next"
                item={nextItem}
                setContent={setContent}
                items={items}
              />
            </Box>
          </Controls>
        </Container>
      </PreviewControls>
    </FullScreenContent>
  );
}

const ControlsButton = ({
 direction, item, setContent, items,
}) => {
  const { name } = items[item];

  return (
    <ControlBox
      $direction={direction}
      tabIndex="0"
      onClick={() => setContent(item)}
      onKeyDown={e => e.key === 'Enter' && setContent(item)}
      aria-label={`${direction === 'prev' ? 'Go to previous member' : 'Go to next member'} ${name}`}
    >
      <ControlIcon className="Control__Icon">
        <Arrow direction={direction} />
      </ControlIcon>
      <ControlLabel className="Control__Label">
        <Text typeStyle="labelsL">
          {name}
        </Text>
      </ControlLabel>
    </ControlBox>
  );
};

const Arrow = ({ direction }) => {
  if (direction === 'prev') {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.6004 10H4.40039" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10.0004 15.5999L4.40039 9.9999L10.0004 4.3999" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.40039 10H15.6004" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 4.3999L15.6 9.9999L10 15.5999" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
};

const ControlBox = styled.div`
  display: flex;
  flex-direction: ${({ $direction }) => $direction === 'prev' ? 'row' : 'row-reverse'};
  align-items: center;
  gap: 1.5rem;
  cursor: pointer;

  .Control__Icon {
    transition: background .16s ease-out;
  }

  .Control__Label {
    transition: transform .16s ease-out;
  }

  &:hover,
  &:focus-visible {
    .Control__Icon {
      background: var(--emphasis-color);
    }

    .Control__Label {
      transform: translateX(${({ $direction }) => $direction === 'prev' ? '-' : ''}10px);
    }
  }
`;

const ControlLabel = styled.div`
  display: none;

  ${MQAbove.md`
    display: block;
    color: var(--text-color);
  `}
`;

const ControlIcon = styled.div`
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--emphasis-color);
  border-radius: 100%;
`;

const FullScreenContent = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: auto;
  --border-color: var(--color__eggplant);
  --emphasis-color: var(--color__lavenderLight);
  --text-color: white;
  --background-color: var(--color__nightshade);
  background-color: var(--background-color);
  color: var(--text-color);
`;

const ImageBox = styled.div`
  margin-bottom: 2rem;

  ${MQAbove.md`
    margin-bottom: 0;
  `}
`;

const PositionBox = styled(Text)`
  color: var(--emphasis-color);
`;

const BioBox = styled(RichText)`
  p {
    font-weight: 400;
  }
`;

const QuoteBox = styled.div`
  svg {
    margin-bottom: 1rem;
  }
`;

const PreviewControls = styled.div`
  position: fixed;
  width: 100%;
  height: 4rem;
  bottom: 0;
  left: 0;
  background: var(--background-color);
  border-top: 1px solid var(--border-color);

  & > div {
    height: 100%;
  }

  ${MQAbove.md`
    height: 6rem;
  `}
`;

const Controls = styled.div`
  height: 100%;
  border-left: 1px solid var(--border-color);
  border-right: 1px solid var(--border-color);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.5rem;
  gap: var(--spacing__sm);

  ${MQAbove.md`
    padding: 0 2rem;
    justify-content: space-between;
  `}
`;

PersonnelPreview.propTypes = {
  item: PropTypes.shape({
    headshot: PrismicImage,
    position: PropTypes.string,
    name: PropTypes.string,
    biography: RichTextType,
    quote: PropTypes.string,
    link: PrismicLink,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    headshot: PrismicImage,
    position: PropTypes.string,
    name: PropTypes.string,
    biography: RichTextType,
    quote: PropTypes.string,
    link: PrismicLink,
  })),
  prevItem: PropTypes.number,
  nextItem: PropTypes.number,
  setContent: PropTypes.func,
};

ControlsButton.propTypes = {
    direction: PropTypes.string,
    setContent: PropTypes.func,
    item: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.shape({
        headshot: PrismicImage,
        position: PropTypes.string,
        name: PropTypes.string,
        biography: RichTextType,
        quote: PropTypes.string,
        link: PrismicLink,
    })),
};

Arrow.propTypes = {
    direction: PropTypes.string,
};

export default PersonnelPreview;
