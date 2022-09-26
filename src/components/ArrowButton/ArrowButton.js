import React from 'react';
import PropTypes, {
    PrismicLink,
  } from 'types';
import styled from 'styled-components';
import { Link } from 'components/Link';
import { Text } from 'components/Text';

const ArrowButton = ({ cta_label, doc, ...rest }) => (
  <StyledLink doc={doc} className="ArrowButton" {...rest}>
    <Text typeStyle="h6">{ cta_label || 'See More' }</Text>
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 11.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 1.5H11V11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <defs>
        <rect width="13" height="13" fill="white" />
      </defs>
    </svg>
  </StyledLink>
);

const StyledLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;

  svg {
    margin-left: 10px;
  }

  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background: var(--color__lavender);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease-out;
  }

  &:hover {
    &:after {
      transform: scaleX(1);
    }
  }
  
  && {
    text-decoration: none;
  }
`;

ArrowButton.propTypes = {
    doc: PrismicLink,
    cta_label: PropTypes.String,
};

export default ArrowButton;
