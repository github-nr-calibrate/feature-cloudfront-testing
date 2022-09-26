import React, { useState, useRef, useEffect } from 'react';
import PropTypes, { ReactChild } from 'types';
import { Box, Flex } from 'components/Layout';
import { Button } from 'components/Button';
import styled, { useTheme } from 'styled-components';
import { rgba } from 'polished';

const ContentBox = styled(Box)`
  position: relative;
  &::after {
    content: '';
    z-index: 2;
    position: absolute;
    bottom: 0;
    left: 0;
    height: ${({ expanded }) => (expanded ? 0 : 240)}px;
    width: 100%;
    background: linear-gradient(
      0deg,
      ${({ theme }) => theme.colors.background} 0%,
      ${({ theme }) => rgba(theme.colors.background, 0)} 100%
    );
    transition: height 0.5s ease;
  }
`;

const ExpandSection = ({ children, initialHeight, ...rest }) => {
  const [isOpen, setOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState(initialHeight);
  const [hasOverflow, setHasOverflow] = useState(true);

  const contentRef = useRef();
  const theme = useTheme();

  const handleResize = () => {
    const contentBounds = contentRef.current.getBoundingClientRect();
    if (contentBounds.height > initialHeight) {
      if (isOpen) setMaxHeight(contentBounds.height);
      else setMaxHeight(initialHeight);
    }
    setHasOverflow(contentBounds.height > initialHeight);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    const contentBounds = contentRef.current.getBoundingClientRect();
    if (
      !isOpen
      && contentBounds.height > initialHeight
      && contentBounds.height > window.innerHeight
    ) {
      window.scrollBy({ top: -Math.abs(contentBounds.height - initialHeight), behavior: 'smooth' });
    }
    return () => window.removeEventListener('resize', handleResize);
  });

  return (
    <Flex flexDirection="column" {...rest}>
      <ContentBox
        width="100%"
        style={{
          transition: 'max-height 0.5s ease',
        }}
        maxHeight={`${maxHeight}px`}
        overflow="hidden"
        expanded={isOpen || !hasOverflow ? 1 : 0}
      >
        <Box ref={contentRef} width="100%">{children}</Box>
      </ContentBox>
      {hasOverflow && (
        <Flex justifyContent="center" width="100%" pt="4">
          <Button
            variant="tertiary"
            borderColor={rgba(theme.colors.foreground, 0.4)}
            color={theme.colors.foreground}
            onClick={() => setOpen(!isOpen)}
          >
            See
            {' '}
            {isOpen ? 'Less' : 'More'}
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

ExpandSection.propTypes = {
  children: PropTypes.arrayOf(ReactChild),
  initialHeight: PropTypes.number,
};

ExpandSection.defaultProps = {
  initialHeight: 300,
};

export default ExpandSection;
