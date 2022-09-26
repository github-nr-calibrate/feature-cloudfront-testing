import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'types';
import { Grid, Box, Flex } from 'components/Layout';
import styled, { useTheme } from 'styled-components';
import { MQAbove } from 'styles/mediaQueries';
import { Text } from 'components/Text';
import VisibilitySensor from 'react-visibility-sensor';
import { ThemeBlock } from 'components/ThemeBlock';

const WordsContainer = styled(Grid)`
  grid-row-gap: 0.8rem;
  grid-template-columns: 1fr;
  overflow: hidden;

  ${MQAbove.md`
    grid-row-gap: 1.2rem;
  `}
`;

const IconBox = styled.div`
  padding: 0 1rem;

  svg {
    width: 12px;
  }

  ${MQAbove.md`
    svg {
      width: auto;
    }
  `}
`;

// Shadow element for getting the proper Width of text element
const ShadowText = styled(Text)`
  position: absolute;
  top: 0;
  left: -100%;
  visibility: hidden;
`;

const Line = styled(Flex)`
  transition: transform 2s ease-out;
  transform: translateX(-25%);
  will-change: transform;
`;

const IconArrow = (direction) => {
  const svgIcon = direction === 'right' ? (
    <svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.857117 0.714455L0.857117 21.1807L18.7651 10.8034L0.857117 0.714455Z" fill="#9F8DE5" />
    </svg>
  ) : (
    <svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.1429 0.714455V21.1807L0.234949 10.8034L18.1429 0.714455Z" fill="#9F8DE5" />
    </svg>
  );

  return svgIcon;
};

function RotatingWords({ primary }) {
  const {
    heading,
    color_theme,
  } = primary;

  const theme = useTheme();

  const [sectionVisible, setVisible] = useState(false);

  const [words, setWords] = useState([]);
  const wordContainerRef = useRef();

  // The number of rows for rendering
  const [rowsNumber] = useState(3);
  const [rows] = useState([...Array(rowsNumber).keys()].map(i => i + 1));

  const wordRef = useRef();
  const wordsLines = useRef([]);

  const addToRefs = (i, el) => {
    wordsLines.current[i] = el;
  };

  // Scroll event with animation
  useEffect(() => {
    function handleScroll() {
      sectionVisible && (
        requestAnimationFrame(() => {
          const scrollTop = wordContainerRef.current.getBoundingClientRect().top;
          wordsLines.current.forEach((line, index) => {
            const movingDirection = index % 2 === 0 ? 1 : -1;
            const positionShift = '-25%';
            line.style.transform = `translateX(calc(${positionShift} + ${scrollTop * movingDirection}px))`;
          });
      }));
    }

    window.removeEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });

  // Populating the words depends on the word and window width
  useEffect(() => {
    let wordWidth;
    let wordsNumber;

    function handleResize() {
      wordWidth = wordRef.current?.offsetWidth || 1;
      wordsNumber = Math.ceil(window.innerWidth / wordWidth) * 3;

      const updatedWords = [...Array(wordsNumber)].fill(heading);
      setWords(updatedWords);
    }

    setTimeout(() => {
      handleResize();
    }, 300);

    window.removeEventListener('resize', handleResize);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('scroll', handleResize);
  }, [heading]);

  return (
    <VisibilitySensor partialVisibility onChange={isVisible => setVisible(isVisible)}>
      <ThemeBlock paddingTop={['2rem', '6rem']} paddingBottom={['2rem', '6rem']} theme={color_theme}>
        <Box position="relative" ref={wordContainerRef}>
          {/* ShadowText is invisible element for getting the rendered element width */}
          <ShadowText typeStyle="movingH2" ref={wordRef}>{heading}</ShadowText>
          {heading && (
          <WordsContainer>
            {rows.map(row => (
              <Box key={`row-${row}`}>
                <Line alignItems="center" ref={el => addToRefs(row, el)}>
                  {words.map((word, index) => (
                    <>
                      <Text typeStyle="movingH2" color={theme.colors.textSilver} key={`row-${row}-word-${index}`}>{word}</Text>
                      <IconBox>
                        {IconArrow(row % 2 === 0 ? 'right' : 'left')}
                      </IconBox>
                    </>
                  ))}
                </Line>
              </Box>
            ))}
          </WordsContainer>
        )}
        </Box>
      </ThemeBlock>
    </VisibilitySensor>
  );
}

RotatingWords.propTypes = {
  primary: PropTypes.shape({
    heading: PropTypes.string,
    color_theme: PropTypes.string,
  }),
};

export default RotatingWords;
