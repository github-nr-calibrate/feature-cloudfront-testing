import React, {
  Children, useMemo, useEffect, useState,
} from 'react';
import PropTypes from 'types';
import styled from 'styled-components';

const Carousel = ({
  children,
  initialIndex,
  transitionDirection,
  transitionDuration = 8000,
}) => {
  const length = useMemo(() => Children.count(children), [children]);

  // initialIndex assumes zero-index, so add 1
  const [currentIndex, setCurrentIndex] = useState(initialIndex || 0);

  useEffect(() => {
    if (transitionDirection === 'prev') {
      setCurrentIndex(prevState => prevState - 1);
    } else if (transitionDirection === 'next') {
      setCurrentIndex(prevState => prevState + 1);
    }
  }, [initialIndex, transitionDirection, length]); // Listening to currentIndex causes infinite loop

  return (
    <CarouselContainer className="carousel-container">
      <div className="carousel-wrapper">
        <div className="carousel-content-wrapper">
          <div
            className="carousel-content"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: `transform ${transitionDuration}ms ease-out`,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </CarouselContainer>
  );
};

const CarouselContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .carousel-wrapper {
    position: relative;
    display: flex;
    width: 100%;
    background-color: var(--placeholder-color, var(--color__grey));
  }

  .carousel-content-wrapper {
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  .carousel-content {
    display: flex;
    height: 100%;
    -ms-overflow-style: none; /* hide scrollbar in IE and Edge */
    scrollbar-width: none; /* hide scrollbar in Firefox */
  }

  /* hide scrollbar in webkit browser */
  .carousel-content::-webkit-scrollbar, .carousel-content::-webkit-scrollbar {
    display: none;
  }

  .carousel-content > * {
    all: unset;
    width: 100%;
    flex-grow: 1;
    flex-shrink: 0;

    img {
      object-fit: cover; // Need 'fluid' on children images, but then must override 'contain' value
    }
  }
`;

Carousel.propTypes = {
  children: PropTypes.node,
  initialIndex: PropTypes.number,
  transitionDirection: PropTypes.string,
  transitionDuration: PropTypes.number,
};

export default Carousel;
