import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes, { PrismicDoc } from 'types';
import { Link } from 'components/Link';
import { Text } from 'components/Text';
import { slugify } from 'utils';
import { Indicator, IndicatorButton } from 'components/Accordion/Accordion';

function FAQLink({ doc, ...rest }) {
  if (doc && doc.isBroken) return null;
  const title = doc.title || doc.data.title;

  return (
    <LinkWrapper isLink {...rest}>
      <Link doc={doc} display="block">
        <Text typeStyle="h5" fontWeight="500 !important" lineHeight="1.5" id={slugify(title)}>{title}</Text>
      </Link>
    </LinkWrapper>
  );
}

export function FAQHeader({ doc, $isOpen, ...rest }) {
  const title = doc.title || doc.data.title;
  return (
    <LinkWrapper isOpen={$isOpen} {...rest}>
      <Text typeStyle="h5" id={slugify(title)}>{title}</Text>
      <Indicator>
        <IndicatorButton $active={$isOpen} />
      </Indicator>
    </LinkWrapper>
  );
}

const LinkWrapper = styled.button`
  background: transparent;
  position: relative;
  cursor: pointer;
  width: 100%;
  white-space: normal;
  text-align: left;
  padding: 2rem 0;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.625rem;

  &:first-of-type {
    a,
    & > div {
      padding-top: 0;
    }
  }

  a {
    position: relative;
    z-index: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  p {
    transition: opacity 0.2s ease-in-out;
  }

  ${Indicator} {
    transition: transform 0.2s ease-in-out;
  }

  ${({ isLink }) => isLink && css`
    a::after {
      content: '';
      background-image: url('/icons/chevron-right.svg');
      background-size: contain;
      background-repeat: no-repeat;
      height: 30px;
      flex: 0 0 30px;
      object-fit: contain;
      transition: transform 300ms ease;
      display: inline-flex;
      margin-left: 1.25rem;
    }

    &:hover a::after {
      transform: scale(1.2);
    }
  `};

  :hover {
    p {
      opacity: 0.7;
    }

    ${Indicator},
    &::after {
      transform: scale(1.2);
    }
  }
`;

FAQLink.propTypes = {
  doc: PrismicDoc,
};

FAQHeader.propTypes = {
  doc: PrismicDoc,
  $isOpen: PropTypes.bool,
};

export default FAQLink;
