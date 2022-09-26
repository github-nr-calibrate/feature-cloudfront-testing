import React from 'react';
import styled, { css } from 'styled-components';
import {
  Container, Box,
} from 'components/Layout';
import PropTypes, {
 RichText as PrismicText, PrismicImage, PrismicLink,
} from 'types';
import { MQAbove, MQBelow } from 'styles/mediaQueries';
import { PointColumn } from 'components/PointColumn';

const TextGridSection = styled(Box)`
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  
  ${({ $fullWidth }) => $fullWidth === false && css`
    ${MQAbove.lg`
      border-top: 0;
      border-bottom: 0;
    `}
  `}
`;

const Items = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(95%, 1fr));
  text-align: left;
  position: relative;

  ${({ $fullWidth }) => $fullWidth === false ? css`
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    
    ${MQBelow.lg`
        border-left: 1px solid var(--border-color);
        border-right: 1px solid var(--border-color);

        &:last-child {
          border-bottom: none;
        }

        &:first-child {
          border-top: none;
        }
    `}
  ` : css`
      border-left: 1px solid var(--border-color);
      border-right: 1px solid var(--border-color);
    `
  }
  
  &:before,
  &:after {
    content: '';
    position: absolute;
  }

  & > div:not(:first-child) {
      border-top: 1px solid var(--border-color);
  }

  ${MQAbove.lg`
    &:before,
    &:after {
      display: none;
    }

    & > div:not(:first-child) {
      border-top: none;
    }

    ${({ $grid2x2Layout }) => $grid2x2Layout === true ? css`
      grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));

      & > div {
        padding: 4.25rem;
      }

      & > div:not(:nth-of-type(2n+1)) {
        border-left: 1px solid var(--border-color);
      }
      & > div:nth-of-type(n+3) {
        border-top: 1px solid var(--border-color);
      }
    ` : css`
      grid-template-columns: ${({ $fourColumns }) => $fourColumns ? 'repeat(auto-fit, minmax(25%, 1fr))' : 'repeat(auto-fit, minmax(33.33%, 1fr))'};

      ${({ $fourColumns }) => $fourColumns && css`
        & > div:not(:nth-of-type(4n+1)) {
          border-left: 1px solid var(--border-color);
        }
        & > div:nth-of-type(n+5) {
          border-top: 1px solid var(--border-color);
        }
      `}
    `}

    ${({ $fourColumns }) => !$fourColumns && css`
      & > div:not(:nth-of-type(3n+1)) {
        border-left: 1px solid var(--border-color);
      }

      & > div:nth-of-type(n+4) {
        border-top: 1px solid var(--border-color);
      }
    `}
  `}
`;

function TextGrid({
  grid2x2Layout,
  items,
  marginTop = ['1.25rem', , 'var(--spacing__md)'],
  alignItems = 'center',
  fullWidth = true,
}) {
  const isDivisibleByFour = items.length % 4 === 0;

  return (
    <TextGridSection
      marginTop={marginTop}
      $fullWidth={fullWidth}
    >
      <Container>
        <Items
          $fourColumns={isDivisibleByFour}
          $grid2x2Layout={grid2x2Layout}
          $fullWidth={fullWidth}
        >
          {items.map((item, index) => (
            <PointColumn
              index={index}
              item={item}
              key={`VideoSection-slice-${index}`}
              alignItems={alignItems}
            />
            ))}
        </Items>
      </Container>
    </TextGridSection>
  );
}

TextGrid.propTypes = {
  grid2x2Layout: PropTypes.bool,
  marginTop: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  alignItems: PropTypes.string,
  fullWidth: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.shape({
    icon: PrismicImage,
    heading: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    content: PrismicText,
    cta_label: PrismicText,
    cta_link: PrismicLink,
  })),
};

export default TextGrid;
