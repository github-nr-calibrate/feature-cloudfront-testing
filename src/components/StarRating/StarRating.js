import React from 'react';
import PropTypes from 'types';
import styled from 'styled-components';
import { Text } from 'components/Text';
import { Link } from 'components/Link';
import { Flex } from 'components/Layout';
import { MQAbove } from 'styles/mediaQueries';

function StarRating({
  average_rating = 4.8, // TODO: Get from global meta field
  align = 'center',
  mt = '1.875rem',
  ...rest
}) {
  return (
    <StarContainer $align={align} $mt={mt} {...rest}>
      {average_rating && (
        <Link href="/reviews">
          <Stars rating={average_rating} />
          <Text
            typeStyle="labelsM"
          >
            {`${average_rating} Average Rating`}
          </Text>
        </Link>
      )}
    </StarContainer>
  );
}

const StarContainer = styled(Flex)`
  text-align: ${({ $align }) => ($align === 'center' ? 'center' : 'left')};;
  align-items: center;
  justify-content: ${({ $align }) => ($align === 'center' ? 'center' : 'flex-start')};
  margin: ${({ $align, $mt }) => ($align === 'center' ? `${$mt} auto 0` : `${$mt} 0 0 0`)};

  a {
    transition: opacity 0.2s ease-in-out;
    text-decoration: none !important;

    &:hover {
      opacity: 0.8;
    }
  }
  
  p {
    font-weight: 600;
    margin-top: 0.5rem;
    text-transform: uppercase;
    font-size: 0.75rem;

    ${MQAbove.md`
      font-size: 0.875rem;
    `}
  }
`;

const Stars = styled.div`
  font-size: 1.75rem;
  font-family: "SF Pro", Times;
  line-height: 1;
  letter-spacing: 5px;

  &::before {
    content: '★★★★★';
    background: linear-gradient(
      90deg,
      var(--color__yellow) ${props => props.rating / 5 * 100}%,
      rgba(0, 0, 0, 0.8) ${props => props.rating / 5 * 100}%
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: block;
  }
`;

StarRating.propTypes = {
  average_rating: PropTypes.number,
  align: PropTypes.string,
  mt: PropTypes.string,
};

export default StarRating;
