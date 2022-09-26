import React, {
  useRef, useEffect, Fragment, useState,
} from 'react';
import PropTypes, { RichText as RichTextType } from 'types';
import styled from 'styled-components';
import { Text } from 'components/Text';

const DiagramContainer = styled.div`
  width: 100%;
  max-width: 80vw;
  position: relative;
  margin: auto;
`;

const Bubble = styled('div').attrs(({ pos, inView }) => ({
  style: {
    top: inView ? `${(pos[1] * 50)}%` : `${(1 / 5) * 100}%`,
    left: inView ? `${(pos[0] * 50)}%` : `${(1 / 5) * 100}%`,
    opacity: inView ? 1 : 0,
  },
}))`
  position: absolute;
  width: 50%;
  height: 50%;


  border-radius: 50%;
  border: 1.5px solid ${({ theme }) => theme.colors.nightshadeLight};
  z-index: 1;

  transition-property: opacity, top, left;
  transition-delay: ${({ index }) => 0.5 + index * 0.2}s;
  transition-duration: 1s;
  transition-timing-function: ease;
`;

const BubbleText = styled(Text)`
  position: absolute;
  width: calc(100% * 2 / 3);
  height: calc(100% * 2 / 3);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  opacity: ${({ inView }) => (inView ? 1 : 0)};

  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 3;

  transition-property: opacity;
  transition-delay: ${({ index }) => 0.5 + index * 0.1}s;
  transition-duration: 1s;
  transition-timing-function: ease;
`;

const LogoBubble = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10%;
  min-height: 100%;
  min-width: 100%;
  z-index: 0;

  ::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    height: 40%;
    width: 40%;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(${({ inView }) => (inView ? 1 : 0)});
    background: ${({ theme }) => `url(images/logo-white.svg), ${theme.colors.lavenderLight}`};
    background-position: center;
    background-size: 35%;
    background-repeat: no-repeat;
    opacity: ${({ inView }) => (inView ? 1 : 0)};

    transition-property: opacity, transform;
    transition-delay: 2s;
    transition-duration: 0.75s;
    transition-timing-function: ease;
  }
`;

const bubblePositions = [
  [0, 0],
  [1, 0],
  [1, 1],
  [0, 1],
];

const Diagram = ({ text }) => {
  const [isOpen, setOpen] = useState(false);
  const containerRef = useRef();
  const bubbleData = text.map((t, i) => ({ text: t, pos: bubblePositions[i] }));

  const handleResize = () => {
    const containerBounds = containerRef.current.getBoundingClientRect();
    containerRef.current.style.height = `${containerBounds.width}px`;
  };

  useEffect(() => {
    setOpen(true);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <DiagramContainer ref={containerRef}>
      {bubbleData.map((data, i) => (
        <Fragment key={`bubble_${i}`}>
          <Bubble inView={isOpen} index={i} pos={data.pos}>
            <BubbleText inView={isOpen} index={i} typeStyle="bodyM" pos={data.pos}>
              {data.text}
            </BubbleText>
          </Bubble>
        </Fragment>
      ))}
      <LogoBubble inView={isOpen} image="static/logo-symbol.svg" />
    </DiagramContainer>
  );
};

Diagram.propTypes = {
  text: PropTypes.arrayOf(RichTextType),
};

export default Diagram;
