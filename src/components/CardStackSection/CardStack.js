import React, {
  useState, useRef, useEffect, useCallback,
} from 'react';
import PropTypes, { PrismicImage } from 'types';
import { Box, Flex } from 'components/Layout';
import { useCarousel, useRefs } from 'utils/hooks';
import { mod } from 'utils';
import { useInView } from 'react-hook-inview';

const CardStack = ({ items, ...rest }) => {
  const [container, inView] = useInView({ unobserveOnEnter: true });
  const numToLoad = useRef(items.length);
  const cardRefs = useRefs(items);
  const containerRef = useRef();
  const tapListenerTimeout = useRef();
  const [activeIndex, controls, prevIndex] = useCarousel(items.length, {
    interval: 10 * 1000,
  });
  const [isLoaded, setLoaded] = useState(false);
  const [allowTap, setAllowTap] = useState(true);

  const setContainerHeight = useCallback(() => {
    let maxHeight = 0;
    cardRefs.forEach((ref) => {
      const cardBounds = ref.current.getBoundingClientRect();
      maxHeight = Math.max(maxHeight, cardBounds.height);
    });
    containerRef.current.style.height = `${maxHeight}px`;
  }, [cardRefs]);

  const handleLoad = () => {
    numToLoad.current -= 1;
    if (numToLoad.current === 0) {
      setContainerHeight();
      setLoaded(true);
    }
  };

  useEffect(() => {
    if (inView) {
      cardRefs.forEach((ref) => {
        if (ref.current.complete || ref.current.naturalWidth) {
          numToLoad.current -= 1;
        }
      });
      if (numToLoad.current === 0) {
        setContainerHeight();
        setLoaded(true);
      }

      return () => {
        if (tapListenerTimeout) clearTimeout(tapListenerTimeout);
      };
    }
  }, [cardRefs, setContainerHeight, inView]);

  return (
    <Flex
      ref={container}
      flexDirection="column"
      justifyContent="center"
      opacity={isLoaded ? 1 : 0}
      {...rest}
      aria-hidden
    >
      <Box
        height="100%"
        width="100%"
        position="relative"
        ref={containerRef}
        onClick={allowTap ? (() => {
          controls.next();
          setAllowTap(false);
          tapListenerTimeout.current = setTimeout(() => setAllowTap(true), 500);
        }) : null}
        onTouchEnd={allowTap ? (() => {
          controls.next();
          setAllowTap(false);
          tapListenerTimeout.current = setTimeout(() => setAllowTap(true), 500);
        }) : null}
      >
        {inView && items.map(({ card }, index) => {
          const style = {
            cursor: 'pointer',
            objectFit: 'contain',
            objectPosition: 'center',
            transformOrigin: 'left center',
          };

          if (activeIndex === index) {
            style.transition = 'opacity 0.5s ease, transform 0.5s ease',
            style.transform = 'scale(1) translateX(-50%)';
            style.opacity = 1;
            style.zIndex = '2';
          } else if (index === prevIndex) {
            style.transition = 'opacity 0.5s 0s ease, transform 0.5s 0s ease',
            style.transform = 'scale(1) translate(-70%, 10%) rotateZ(-8deg)';
            style.opacity = 0;
            style.zIndex = '3';
          } else if (mod(index - 1, items.length) === activeIndex) {
            style.transition = 'transform 0.5s 0.15s ease',
            style.transform = 'scale(0.7) translate(-30%, 10%) rotateZ(8deg)';
            style.opacity = 0;
            style.zIndex = '0';
          } else {
            style.transition = 'transform 0.5s 0.15s ease',
            style.transform = 'scale(0.7) translateX(-50%)';
            style.opacity = 0;
            style.zIndex = '0';
          }

          return (
            <Box
              position="absolute"
              ref={cardRefs[index]}
              key={`cs_card_${index}`}
              as="img"
              src={card.url}
              width="100%"
              left="50%"
              height="100%"
              style={style}
              onLoad={handleLoad}
            />
          );
        })}
      </Box>
      <Flex justifyContent="center" pt="2rem">
        {items.map((item, index) => (
          <Box
            key={`cs_indicator_${index}`}
            width="0.625rem"
            height="0.625rem"
            borderRadius="50%"
            ml={index > 0 ? '0.625rem' : '0'}
            bg="nightshade"
            style={{
              transition: 'opacity 0.3s ease',
              opacity: activeIndex === index ? 1 : 0.2,
              ':hover': {
                opacity: '1',
                cursor: 'pointer',
              },
            }}
          />
        ))}
      </Flex>
    </Flex>
  );
};

CardStack.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    card: PrismicImage,
  })),
};

export default CardStack;
