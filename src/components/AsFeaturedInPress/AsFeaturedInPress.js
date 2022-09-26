import React, { useState, useRef } from 'react';
import { Container, Flex } from 'components/Layout';
import { Text, TextField } from 'components/Text';
import PropTypes, { RichText as RichTextType } from 'types';
import styled from 'styled-components';
import { useMatchMedia } from 'utils/hooks';
import { lessThan } from 'styles/media';
import { Animation } from 'components/Animation';
import { MQAbove } from 'styles/mediaQueries';
import VisibilitySensor from 'react-visibility-sensor';
import { ThemeBlock } from 'components/ThemeBlock';

function AsFeaturedInPress({ meta, primary }) {
  // Shared component leverages "meta" for universal data storage
  // It is filtered and mapped for easy reference on render
  const data = meta.body.filter(({ slice_type }) => slice_type === 'as_featured_in')
    .map(({ primary }) => primary);

  const {
    color_theme,
  } = primary;

  const isMobile = useMatchMedia(lessThan('lg'));

  const [indexVisible, setVisible] = useState(0);
  const [slidesLength] = useState(data.length);
  const slider = useRef(null);

  function handleClick(direction) {
    if (direction === 'next') {
      slider.current.scrollLeft = (slider.current.scrollWidth / slidesLength) * (indexVisible + 1);
    } else {
      slider.current.scrollLeft = (slider.current.scrollWidth / slidesLength) * (indexVisible - 1);
    }
  }

  const handlePaginationClick = (index) => {
    if (index === indexVisible) return;
    if (index > indexVisible) {
      handleClick('next');
    }
    if (index < indexVisible) {
      handleClick('prev');
    }
    setVisible(index);
  };

  return (
    <ThemeBlock theme={color_theme} paddingTop="0" paddingBottom="0">
      <Flex flexDirection="column">
        <StyledContainer textAlign="center" ref={slider}>
          {meta.show_afip_title && <TextField>{meta.as_featured_in_press_title}</TextField>}
          { data.map(({ link, logo, quote }, key) => (
            <VisibilitySensor
              onChange={isVisible => isVisible && setVisible(key)}
              key={key}
            >
              <PressItem
                href={link.url}
                target={link.target}
                aria-hidden={isMobile && indexVisible !== key && true}
                color={color_theme}
              >
                <Animation name="fadeIn">
                  <div id={key}>
                    <img className="lazyload" data-src={logo.url} alt={logo.alt} />
                    <Text typeStyle="bodyL">{quote}</Text>
                  </div>
                </Animation>
              </PressItem>
            </VisibilitySensor>
        )) }
        </StyledContainer>
        {isMobile && (
        <Controls>
          <button
            onClick={() => handleClick('prev')}
            onKeyUp={(e) => e.key === 'Enter' && handleClick('prev')}
            aria-label={indexVisible + 1 > 1 ? `Go to previous slide ${indexVisible} of ${slidesLength}` : 'The first slide reached'}
            tabIndex="0"
          >
            <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m2.9 8.5 4.6 4.6c.3.3.7.3.9 0 .3-.3.3-.7 0-.9L4.9 8.7h7.8c.3 0 .6-.3.6-.7 0-.4-.3-.7-.6-.7H5l3.5-3.5c.3-.3.3-.7 0-.9-.1-.1-.3-.2-.5-.2s-.3.1-.5.2L2.8 7.6c-.1.1-.2.3-.2.5s.1.2.3.4Z" fill="currentColor" /></svg>
          </button>

          <Pagination>
            {data.map((item, index) => (
              <button
                key={index}
                className={index === indexVisible && 'active'}
                onClick={() => handlePaginationClick(index)}
                onKeyUp={(e) => e.key === 'Enter' && handlePaginationClick(index)}
              />
              ))}
          </Pagination>

          <button
            onClick={() => handleClick('next')}
            onKeyUp={(e) => e.key === 'Enter' && handleClick('next')}
            aria-label={indexVisible + 1 < slidesLength ? `Go to next slide ${indexVisible + 2} of ${slidesLength}` : 'The last slide reached'}
            tabIndex="0"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.1 7.5 8.5 2.9c-.3-.3-.7-.3-.9 0-.3.3-.3.7 0 .9l3.5 3.5H3.3c-.3 0-.6.3-.6.7s.3.7.6.7H11l-3.5 3.5c-.3.3-.3.7 0 .9.1.1.3.2.5.2s.3-.1.5-.2l4.7-4.7c.1-.1.2-.3.2-.5s-.1-.2-.3-.4z" />
            </svg>
          </button>
        </Controls>
        )}
      </Flex>
    </ThemeBlock>
  );
}

const StyledContainer = styled(Container)`
  color: inherit;
  padding: 0;
  max-width: unset;
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  position: relative;
  z-index: 1;

  &::-webkit-scrollbar {
    display: none;
  }

  ${MQAbove.lg`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  `}
`;

const PressItem = styled.a`
  padding: 4rem 2rem 3rem 2rem;
  opacity: 1; 
  transition: background-color .3s ease;
  scroll-snap-align: start;
  flex: 0 0 100%;
  color: inherit;
  position: relative;
  z-index: 1;

  ${MQAbove.md`
    padding: 6.5rem 2rem;
  `}
  
  &:hover { 
    background-color: rgba(255,255,255,0.05);
  }

  :not(:last-child) {
    ${MQAbove.lg`
       border-right: 1px solid var(--border-color);
    `}
  }

  p {
    max-width: 320px;
    margin: 0 auto;
    color: inherit;

    .theme--dark & {
      color: #BDBADE;
    }
  }

  img {
    margin: 0 0 20px 0;
    height: 30px; 
    width: auto; 
    filter: ${({ color }) => color === 'dark' ? 'invert(100%)' : 'invert(0%)'};

    ${MQAbove.md`
      height: 30px;
    `}

    ${MQAbove.lg`
      height: 40px;
    `}
  }
`;

const Pagination = styled.div`
  bottom: 3rem;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 1rem;
  z-index: 2;

  & > button {
    padding: 0;
    flex: 0 0 8px;
    width: 8px;
    height: 8px;
    border-radius: 8px;
    background: var(--text-color);
    opacity: 0.4;

    &.active {
      opacity: 1;
    }
  }
`;

const Controls = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.25rem 1.25rem 1.25rem;

  & > button {
    width: 40px;
    height: 40px;
    pointer-events: all;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity .3s ease;
    border: 1px solid var(--border-color);
    border-radius: 50%;

    &:hover {
      background: var(--color__lavender);
      color: white;
    }
  }
`;

AsFeaturedInPress.propTypes = {
  meta: PropTypes.shape({
    body: PropTypes.array,
    show_afip_title: PropTypes.bool,
    as_featured_in_press_title: RichTextType,
  }),
  primary: PropTypes.shape({
    background_color: PropTypes.string,
    text_color: PropTypes.string,
    color_theme: PropTypes.string,
  }),
};

export default AsFeaturedInPress;
