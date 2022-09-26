import React from 'react';
import PropTypes, { PrismicImage } from 'types';
import { Box } from 'components/Layout';
import { parseDDTextColor } from 'client/prismic';
import styled, { css } from 'styled-components';
import ResponsiveImage from 'components/ResponsiveImage';
import { MQAbove } from 'styles/mediaQueries';
import { isEmpty } from 'utils';

const ImageBox = styled.section`
  width: 100%;
  height: 12.5rem;

  ${MQAbove.md`
      height: 31.25rem;
  `}
`;

function Divider({ primary }) {
  const {
    color,
    color_theme,
    image,
  } = primary || {};
  // Some old pages don't have this data so we provide an empty object for destructuring to work

  const colorOrFallback = color && !isEmpty(color) ? color : 'Medium Light';

  if (image?.url) {
    return (
      <ImageBox>
        <ResponsiveImage src={image} />
      </ImageBox>
    );
  }

  return <StyledDivider as="section" bg={color_theme ? 'var(--border-color)' : parseDDTextColor(colorOrFallback)} width="100%" height="1px" theme={color_theme} />;
}

const StyledDivider = styled(Box)`
  ${({ theme }) => theme === 'dark' && css`
      --border-color: var(--color__eggplant);
  `}

  ${({ theme }) => theme === 'light' && css`
      --border-color: var(--color__mauve);
  `}

  ${({ theme }) => theme === 'grey' && css`
      --border-color: var(--color__mauve);
  `}
`;

Divider.propTypes = {
  primary: PropTypes.shape({
    color: PropTypes.string,
    color_theme: PropTypes.string,
    image: PrismicImage,
  }),
};

export default Divider;
