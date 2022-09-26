import React from 'react';
import { Box } from 'components/Layout';
import styled, { css } from 'styled-components';
import PropTypes from 'types';

function ThemeBlock({
    theme = 'light',
    children,
    paddingTop = ['var(--spacing__md)', 'var(--spacing__lg)', 'var(--spacing__xl)'],
    paddingBottom = ['var(--spacing__md)', 'var(--spacing__lg)', 'var(--spacing__xl)'],
    zIndex,
    as = 'div',
    id,
}) {
    return (
      <StyledBox
        $theme={theme || 'light'}
        paddingTop={paddingTop}
        paddingBottom={paddingBottom}
        as={as}
        position="relative"
        zIndex={zIndex && zIndex}
        id={id}
        className={`theme--${theme || 'light'}`}
      >
        {children}
      </StyledBox>
    );
}

const StyledBox = styled(Box)`
  ${({ $theme }) => $theme === 'dark' && css`
      --border-color: var(--color__eggplant);
      --emphasis-color: var(--color__lavenderLight);
      --text-color: white;
      --text-color-accent-1: white;
      --background-color: var(--color__nightshade);
      --placeholder-color: var(--color__eggplant);
      background-color: var(--background-color);
      color: var(--text-color);
  `}

  ${({ $theme }) => $theme === 'light' && css`
      --border-color: var(--color__mauve);
      --emphasis-color: var(--color__lavender);
      --text-color: var(--color__nightshade);
      --text-color-accent-1: var(--color__slate);
      --background-color: white;
      --placeholder-color: var(--color__grey);
      background-color: var(--background-color);
      color: var(--text-color);
  `}

  ${({ $theme }) => $theme === 'grey' && css`
      --border-color: var(--color__mauve);
      --emphasis-color: var(--color__lavender);
      --text-color: var(--color__nightshade);
      --text-color-accent-1: var(--color__slate);
      --background-color: var(--color__grey);
      --placeholder-color: var(--color__mauve);
      background-color: var(--color__grey);
      color: var(--text-color);
  `}
`;

ThemeBlock.propTypes = {
    children: PropTypes.node,
    theme: PropTypes.string,
    paddingTop: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    paddingBottom: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    zIndex: PropTypes.number,
    as: PropTypes.string,
    id: PropTypes.string,
};

export default ThemeBlock;
