/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from 'react';
import PropTypes, { ReactChild } from 'types';
import { Box, Flex } from 'components/Layout';
import { mod } from 'utils';
import ola from 'ola';
import styled from 'styled-components';
import { useRefs } from 'utils/hooks';
import { useInView } from 'react-hook-inview';
import { transparentize } from 'polished';

const SmoothCarousel = ({
  items,
  itemGap,
  enableMouseDrag,
  dragSmoothSpeed,
  autoScroll,
  scrollInertia,
  autoScrollSpeed,
  infinite,
  carouselMargin,
  controlsRef,
  scrollCallback,
  fadeColor,
  fadeWidth,
  ...rest
}) => {
  const [container, inView] = useInView({ unobserveOnEnter: true });
  const [maxItemHeight, setMaxItemHeight] = useState(0);
  const [maxItemWidth, setMaxItemWidth] = useState(0);
  const [hasOverflow, setHasOverflow] = useState(true);
  const scrollDataRef = useRef({
    percentVisible: 0,
    percentScrolled: 0,
  });
  const carouselMarginRef = useRef(0);
  const animRef = useRef();
  const carouselRef = useRef();
  const itemRefs = useRefs(items);
  const offset = useRef({
    ola: ola(0, dragSmoothSpeed),
    value: 0,
  });
  const fullWidth = useRef();
  const dragData = useRef({
    origin: { x: 0, y: 0 },
    dx: 0,
    dragging: false,
  });

  const updateCarousel = () => {
    if (carouselRef.current) {
      const carouselBounds = carouselRef.current.getBoundingClientRect();

      dragData.current.dx *= scrollInertia;
      if (Math.abs(dragData.current.dx) < 0.01) dragData.current.dx = 0;
      if (autoScroll && infinite && !dragData.current.dragging) {
        dragData.current.dx -= carouselBounds.width * 0.01 * autoScrollSpeed;
      }

      updateCarouselOffset(dragData.current.dx);

      let totalCurOffset = 0;
      const curOffsetValue = Math.round(offset.current.ola.value);
      itemRefs.forEach((itemRef) => {
        if (!itemRef.current) return;
        const itemBounds = itemRef.current.getBoundingClientRect();
        totalCurOffset += itemBounds.width;
        const itemOffset = totalCurOffset + curOffsetValue;

        let modOffset;
        if (infinite) modOffset = mod(itemOffset, fullWidth.current);
        else modOffset = itemOffset;
        itemRef.current.style.left = `${modOffset}px`;
      });
      const newScrollData = {
        percentVisible: carouselBounds.width / fullWidth.current,
        percentScrolled: -(curOffsetValue - carouselMarginRef.current)
          / (fullWidth.current - carouselBounds.width),
      };
      if (
        scrollCallback
        && (
          newScrollData.percentVisible !== scrollDataRef.current.percentVisible
          || newScrollData.percentScrolled !== scrollDataRef.current.percentScrolled
        )
      ) {
        scrollCallback(newScrollData);
        scrollDataRef.current = newScrollData;
      }
    }
    animRef.current = requestAnimationFrame(updateCarousel);
  };

  const updateCarouselOffset = (dOffset) => {
    const carouselBounds = carouselRef.current.getBoundingClientRect();
    const maxOffset = 0;
    const minOffset = -fullWidth.current + carouselBounds.width;
    offset.current.value += dOffset;

    if (!infinite) {
      if (fullWidth.current > carouselBounds.width) {
        if (offset.current.value > maxOffset) {
          const bdx = Math.max(0.01, Math.abs(offset.current.value - maxOffset) * scrollInertia);
          if (bdx < 0.01) offset.current.value = maxOffset;
          else offset.current.value -= bdx;
        }
        if (offset.current.value < minOffset) {
          const bdx = Math.max(0.01, Math.abs(offset.current.value - minOffset) * scrollInertia);
          if (bdx < 0.01) offset.current.value = 0;
          else offset.current.value += bdx;
        }
        setHasOverflow(true);
      } else {
        offset.current.value = (carouselBounds.width / 2) - (fullWidth.current / 2);
        setHasOverflow(false);
      }
    }
    offset?.current?.ola?.set({ value: offset.current.value + carouselMarginRef.current });
  };

  const handleWheel = (ev) => {
    if (Math.abs(ev.deltaX) > Math.abs(ev.deltaY)) ev.preventDefault();
    else return;
    const dx = -ev.deltaX;
    dragData.current.dx += dx;
  };

  const handleDragStart = (ev) => {
    dragData.current.origin.x = ev.touches ? ev.touches[0].clientX : ev.clientX;
    dragData.current.origin.y = ev.touches ? ev.touches[0].clientY : ev.clientY;
    dragData.current.dragging = true;
    if (!carouselRef.current) return;
    document.body.addEventListener('touchmove', handleDrag, { passive: false });
    document.body.addEventListener('mousemove', handleDrag);
  };

  const handleDragEnd = () => {
    dragData.current.dragging = false;
    if (!carouselRef.current) return;
    document.body.removeEventListener('touchmove', handleDrag);
    document.body.removeEventListener('mousemove', handleDrag);
  };

  const handleDrag = (ev) => {
    const newX = ev.changedTouches ? ev.changedTouches[0].clientX : ev.clientX;
    const newY = ev.changedTouches ? ev.changedTouches[0].clientY : ev.clientY;
    const dx = newX - dragData.current.origin.x;
    const dy = newY - dragData.current.origin.y;
    if (Math.abs(dx) > Math.abs(dy)) {
      dragData.current.dx += dx;
      if (ev.changedTouches) ev.preventDefault();
    }
    dragData.current.origin.x = newX;
    dragData.current.origin.y = newY;
  };

  const handleResize = () => {
    setMaxItemHeight(0);
    setMaxItemWidth(0);
    requestAnimationFrame(() => {
      fullWidth.current = carouselMarginRef.current * 2;
      let maxHeight = 0;
      let maxWidth = 0;
      itemRefs.forEach((itemRef) => {
        if (!itemRef.current) return;
        const itemBounds = itemRef.current.getBoundingClientRect();
        fullWidth.current += itemBounds.width;
        maxHeight = Math.max(itemBounds.height, maxHeight);
        maxWidth = Math.max(itemBounds.width, maxWidth);
      });
      setMaxItemHeight(maxHeight);
      setMaxItemWidth(maxWidth);
    });
  };

  useEffect(handleResize, [inView]);

  useEffect(() => {
    if (controlsRef) {
      controlsRef.current = {
        slideRight: () => updateCarouselOffset(-maxItemWidth),
        slideLeft: () => updateCarouselOffset(maxItemWidth),
      };
    }
  }, [maxItemWidth]);

  useEffect(() => {
    carouselMarginRef.current = carouselMargin;
    handleResize();
    const timeout = setTimeout(handleResize, 500);
    return () => clearTimeout(timeout);
  }, [carouselMargin]);

  useEffect(() => {
    handleResize();
    animRef.current = requestAnimationFrame(updateCarousel);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [items]);

  useEffect(() => {
    document.body.addEventListener('mouseleave', handleDragEnd);
    carouselRef.current.addEventListener('wheel', handleWheel, { passive: false });
    if (enableMouseDrag) {
      carouselRef.current.addEventListener('mousedown', handleDragStart);
      document.body.addEventListener('mouseup', handleDragEnd);
    }
    carouselRef.current.addEventListener('touchstart', handleDragStart);
    document.body.addEventListener('touchend', handleDragEnd);
    window.addEventListener('resize', handleResize);
    return () => {
      if (carouselRef.current) {
        window.removeEventListener('resize', handleResize);
        document.body.removeEventListener('mouseleave', handleDragEnd);
        carouselRef.current.removeEventListener('wheel', handleWheel);
        carouselRef.current.removeEventListener('mousedown', handleDragStart);
        document.body.removeEventListener('mouseup', handleDragEnd);
        carouselRef.current.removeEventListener('touchstart', handleDragStart);
        document.body.removeEventListener('touchend', handleDragEnd);
        document.body.removeEventListener('touchmove', handleDrag);
        document.body.removeEventListener('mousemove', handleDrag);
      }
    };
  }, []);

  return (
    <Box
      position="relative"
      height={`${maxItemHeight}px`}
      ref={carouselRef}
      {...rest}
    >
      {!!fadeColor && (
        <>
          <Box
            zIndex="5"
            position="absolute"
            height="100%"
            width={fadeWidth || '10vw'}
            minWidth={fadeWidth || '20px'}
            left="0"
            top="0"
            background={`linear-gradient(-90deg, ${transparentize(1, fadeColor)} 0%, ${transparentize(0.15, fadeColor)} 100%)`}
            style={{ pointerEvents: 'none' }}
          />
          <Box
            zIndex="5"
            position="absolute"
            height="100%"
            width={fadeWidth || '10vw'}
            minWidth={fadeWidth || '20px'}
            right="0"
            top="0"
            background={`linear-gradient(90deg, ${transparentize(1, fadeColor)} 0%, ${transparentize(0.15, fadeColor)} 100%)`}
            style={{ pointerEvents: 'none' }}
          />
        </>
      )}
      <StyledBox
        isGrabbing={enableMouseDrag && hasOverflow}
        width={`calc(100vw + ${maxItemWidth * 2}px)`}
        height={`${maxItemHeight}px`}
        position="relative"
        mx={`-${maxItemWidth}px`}
        ref={container}
      >
        {items.map((item, index) => (
          <Flex
            key={`carouselitem_${index}`}
            ref={itemRefs[index]}
            position="absolute"
            minHeight={`${maxItemHeight}px`}
            style={{ willChange: 'left' }}
            px={
              Array.isArray(itemGap)
                ? itemGap.map((gap) => `calc(${Number.isNaN(gap) ? gap : `${gap}px`} / 2)`)
                : `calc(${Number.isNaN(itemGap) ? itemGap : `${itemGap}px`} / 2)`
            }
          >
            {item}
          </Flex>
        ))}
      </StyledBox>
    </Box>
  );
};

const StyledBox = styled(Box)`
  ${({ isGrabbing }) => isGrabbing && `
    cursor: grabbing;
    user-select: none;
    :active { cursor: grabbing; }
  `}
`;

SmoothCarousel.propTypes = {
  items: PropTypes.arrayOf(ReactChild),
  dragSmoothSpeed: PropTypes.number,
  itemGap: PropTypes.oneOfType([
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  ]),
  autoScroll: PropTypes.bool,
  autoScrollSpeed: PropTypes.number,
  enableMouseDrag: PropTypes.bool,
  infinite: PropTypes.bool,
  scrollInertia: PropTypes.number,
  carouselMargin: PropTypes.number,
  controlsRef: PropTypes.object,
  scrollCallback: PropTypes.func,
  fadeColor: PropTypes.string,
  fadeWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SmoothCarousel.defaultProps = {
  dragSmoothSpeed: 300,
  itemGap: 20,
  autoScroll: true,
  autoScrollSpeed: 0.05,
  enableMouseDrag: true,
  infinite: true,
  scrollInertia: 0.65,
  carouselMargin: 0,
};

export default SmoothCarousel;
