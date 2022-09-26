import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import PropTypes, { RichText as RichTextType, PrismicLink } from 'types';
import {
  Box, Container, Flex, Row, Col,
} from 'components/Layout';
import { Button } from 'components/Button';
import { wrap } from 'utils';
import { Text, RichText } from 'components/Text';
import ola from 'ola';
import { useRefs, useMatchMedia } from 'utils/hooks';
import { lessThan } from 'styles/media';
import styled from 'styled-components';
import { MQBelow } from 'styles/mediaQueries';

const SCROLL_SPEED = 0.25;

function AnimatedCtaSection({ primary, items }) {
  const {
    heading,
    button_label,
    button_link,
  } = primary;

  const isMobile = useMatchMedia(lessThan('lg'));
  const scrollOffset = useRef(ola({ offset: 0 }));
  const [isLoaded, setLoaded] = useState(false);
  const bgContRef = useRef();
  const bgItemRefs = useRefs(items);
  const animRef = useRef();
  const autoScrollAmt = useRef(ola({ amt: 1 }));
  const autoScrollResetTimeout = useRef();
  const bgContBoundsRef = useRef();

  const handleScroll = () => {
    if (autoScrollResetTimeout.current) clearTimeout(autoScrollResetTimeout.current);
    scrollOffset.current.set({ offset: document.scrollingElement.scrollTop });
    autoScrollAmt.current.set({ amt: 0 });
    autoScrollResetTimeout.current = setTimeout(() => {
      autoScrollAmt.current.set({ amt: 1 });
    }, 50);
  };

  const updateBgItems = useCallback((t = 0) => {
    if (!bgContRef.current) return;
    if (!bgContBoundsRef.current) handleResize();
    const bgContBounds = bgContBoundsRef.current;
    let totalOffset = 0;
    const itemHeight = bgItemRefs[0].current.getBoundingClientRect().height;
    bgItemRefs.forEach((itemRef) => {
      const offsetTop = wrap(
        t - (scrollOffset.current.offset / 3) + (totalOffset),
        0,
        itemHeight * bgItemRefs.length,
      );
      itemRef.current.style.top = `${Math.max(0, Math.min(bgContBounds.height + (itemHeight * 4), offsetTop)) - (itemHeight * 2)}px`;
      totalOffset += itemHeight;
    });
    animRef.current = requestAnimationFrame(() => updateBgItems(t
      + SCROLL_SPEED
      * autoScrollAmt.current.amt));
  }, [bgItemRefs]);

  const handleResize = () => {
    if (!bgContRef.current) return;
    bgContBoundsRef.current = bgContRef.current.getBoundingClientRect();
  };

  useEffect(() => {
    updateBgItems();
    handleScroll();
    setLoaded(true);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animRef);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [updateBgItems]);

  const mobileOpacity = isMobile ? 0.5 : 1;
  return (
    <PrimaryBox
      bg="nightshade"
      position="relative"
      overflow="hidden"
    >
      <InnerBox
        position="absolute"
        width={['100%',, '55%']}
        height="100%"
        top="0"
        left={[0,, '45%']}
        ref={bgContRef}
        opacity={isLoaded ? mobileOpacity : 0}
        color="nightshadeLight"
        zIndex="0"
      >
        {items.map(({ bg_item }, index) => (
          <Text
            position="absolute"
            left="0"
            key={`bg_anim_text_${index}`}
            ref={bgItemRefs[index]}
            typeStyle="bgList"
            py="1rem"
            my="0"
          >
            {bg_item}
          </Text>
        ))}
      </InnerBox>
      <Container zIndex="1" color="white">
        <Row>
          <Col pt={['24rem',, '12.5rem']} pb={['2.25rem',, '12.5rem']} span={[12,, 4]}>
            <Flex flexDirection="column">
              <RichText typeStyle="h2" as="h2">{heading}</RichText>
              {(button_link && button_label) && (
                <Flex width="100%" justifyContent="flex-start" pt="4">
                  <Button
                    variant="primary"
                    doc={button_link}
                    width="100%"
                    maxWidth="21.5rem"
                  >
                    {button_label}
                  </Button>
                </Flex>
              )}
            </Flex>
          </Col>
        </Row>
      </Container>
    </PrimaryBox>
  );
}

const PrimaryBox = styled(Box)`
  ::before {
    background: linear-gradient(180deg, rgba(0,0,0,.4) 0%, rgba(0,0,0,0) 60%);
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    pointer-events: none;
    top: 0;
    left: 0;
    z-index: 0;

    ${MQBelow.lg`
      background: linear-gradient(0deg, rgba(0,0,0,.4) 0%, rgba(0,0,0,0) 60%);
    }`
  }
`;

const InnerBox = styled(Box)`
  transition: opacity 0.5s ease; 
  pointer-events: none;
`;

AnimatedCtaSection.propTypes = {
  primary: PropTypes.shape({
    heading: RichTextType,
    button_label: RichTextType,
    button_link: PrismicLink,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    bg_item: RichTextType,
  })),
};

export default AnimatedCtaSection;
