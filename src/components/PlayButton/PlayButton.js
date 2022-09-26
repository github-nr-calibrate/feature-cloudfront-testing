import React from 'react';
import PropTypes from 'types';
import styled, { css } from 'styled-components';
import {
  space, layout, variant, compose, border, color, typography, shadow,
} from 'styled-system';
import { Box } from 'components/Layout';

// NOTE: PlayButton can be used *within* a button element, and doesn't have to be an actual button

const buttonBase = css`
  transition: all 0.3s ease-in-out;
  padding: 0.625rem;
  height: 2.5rem;
  width: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 3px solid transparent;

  svg {
    width: 100%;
    height: 100%;
    transform: translateX(10%);
  }
`;

const buttonVariants = variant({
  prop: 'variant',
  variants: {
    primary: {
      bg: 'white',
      color: 'lavender',
      borderColor: 'currentColor',
    },
    secondary: {
      bg: 'white',
      color: 'lavender',
      borderColor: 'white',
    },
    tertiary: {
      bg: 'transparent',
      color: 'white',
      borderColor: 'currentColor',
    },
  },
});

const buttonComposition = compose(space, layout, border, color, typography, shadow);

const StyledPlayButton = styled(Box)(
  buttonBase,
  buttonVariants,
  buttonComposition,
);

function PlayButton({
  top = '',
  right = '',
  bottom = '',
  left = '',
  shadow = false,
  ...rest
}) {
  return (
    <StyledPlayButton
      boxShadow={shadow && '0 0.625rem 1.25rem rgba(0, 0, 0, 0.04), 0 0.125rem 0.375rem rgba(0, 0, 0, 0.2), 0 0 0.0625rem rgba(0, 0, 0, 0.04)'}
      position={(top || right || bottom || left) && 'absolute'}
      top={top}
      right={right}
      bottom={bottom}
      left={left}
      className="PlayButton"
      {...rest}
    >
      <svg viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0L13 8L0 16V0Z" fill="currentcolor" />
      </svg>
    </StyledPlayButton>
  );
}

PlayButton.propTypes = {
  shadow: PropTypes.bool,
  top: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string,
  left: PropTypes.string,
};

export default PlayButton;
