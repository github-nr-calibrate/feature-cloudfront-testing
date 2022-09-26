import React, { useState, useEffect, useRef } from 'react';
import PropTypes, { RichText as RichTextType } from 'types';
import { Box, Flex } from 'components/Layout';
import { Text } from 'components/Text';
import { deProp } from 'utils';
import { useMatchMedia } from 'utils/hooks';
import { lessThan } from 'styles/media';
import styled, { css } from 'styled-components';
import { Logo } from 'components/Logo';

const radiusRatio = 0.55;

const DiagramCircle = styled(Box).withConfig({
  shouldForwardProp: deProp(['inView', 'isFirst', 'circleRadius', 'isMobile']),
})`
  position: absolute;
  border: 1px solid ${({ theme }) => theme.colors.darkGrey};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  height: ${({ circleRadius }) => circleRadius}px;
  width: ${({ circleRadius }) => circleRadius}px;
  top: 50%;
  left: 50%;
  z-index: ${({ isFirst }) => (isFirst ? 2 : 1)};
  overflow: hidden;
  opacity: ${({ inView }) => (inView ? 1 : 0)};
  transition: transform 1s 0.15s ease, opacity 0.5s ease;
  ${({ isMobile, isFirst, inView }) => css`
    transform: translate(
      ${(!inView || isMobile) ? '-50%' : `${-50 + (100 * (radiusRatio / 2) * (isFirst ? -1 : 1))}%`},
      ${(!inView || !isMobile) ? '-50%' : `${-50 + (100 * (radiusRatio / 2) * (isFirst ? -1 : 1))}%`}
    );

    & p {
      position: absolute;
      top: ${!isMobile ? 50 : 50 + (isFirst ? -50 : 50) * radiusRatio * 0.6}%;
      left: ${isMobile ? 50 : 50 + (isFirst ? -50 : 50) * radiusRatio * 0.8}%;
      width: 80%;
      max-width: ${isMobile ? '50%' : `${100 * radiusRatio * 0.7}%`};
      text-align: center;
      opacity: ${inView ? 1 : 0};
      transition: opacity 0.5s 1s ease;
      font-weight: 500 !important;
      transform: translate(-50%, -50%);
    }
  `}

  ${({
    isMobile, isFirst, theme, inView,
  }) => isFirst && css`
    ::after {
      content: '';
      opacity: ${inView ? 1 : 0};
      transition: opacity 0.5s 1.1s ease;
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: ${theme.colors.dustyBlue};
      left: ${isMobile ? 0 : `${100 * radiusRatio}%`};
      top: ${!isMobile ? 0 : `${100 * radiusRatio}%`};
      border: 1px solid ${({ theme }) => theme.colors.darkGrey};
      border-radius: 50%;
    }
  `}
`;

function LargeDiagram({
  diagram_outer_text_1,
  diagram_stat,
  diagram_stat_eyebrow,
  diagram_outer_text_2,
  inView,
  ...rest
}) {
  const isMobile = useMatchMedia(lessThan('md'));
  const [circleRadius, setCircleRadius] = useState(0);
  const containerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      setCircleRadius(isMobile
        ? window.innerWidth - 46
        : containerRef.current.getBoundingClientRect().height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  return (
    <Box
      position="relative"
      ref={containerRef}
      {...rest}
    >
      <DiagramCircle
        inView={inView}
        circleRadius={circleRadius}
        isMobile={isMobile}
        isFirst
      >
        <Text typeStyle="subhead" color="nightshade">{diagram_outer_text_1}</Text>
      </DiagramCircle>
      <DiagramCircle
        inView={inView}
        circleRadius={circleRadius}
        isMobile={isMobile}
      >
        <Text typeStyle="subhead" color="nightshade">{diagram_outer_text_2}</Text>
      </DiagramCircle>
      <Flex
        flexDirection="column"
        alignItems="center"
        position="absolute"
        top="50%"
        left="50%"
        textAlign="center"
        style={{ transform: 'translate(-50%, -50%)', transition: 'opacity 0.5s 1.1s ease' }}
        opacity={inView ? 1 : 0}
        color="nightshade"
        zIndex="2"
      >
        <Box width={['140px',, '160px']}>
          <Logo theme="dark" fullWidth />
        </Box>
        <Text
          typeStyle={isMobile ? 'p6' : 'p5'}
          textTransform="uppercase"
          mt="2"
          fontWeight="500 !important"
        >
          {diagram_stat_eyebrow}
        </Text>
      </Flex>
    </Box>
  );
}

LargeDiagram.propTypes = {
  diagram_outer_text_1: RichTextType,
  diagram_stat: RichTextType,
  diagram_stat_eyebrow: RichTextType,
  diagram_outer_text_2: RichTextType,
  inView: PropTypes.bool,
};

export default LargeDiagram;
