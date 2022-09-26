/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import PropTypes, { ReactChild, RichText as PrismicRichText } from 'types';
import styled, { css } from 'styled-components';
import * as prismicH from '@prismicio/helpers';
import {
  color,
  layout,
  space,
  typography,
  compose,
  variant,
  system,
  position,
  border,
} from 'styled-system';
import { isRichText } from './utils';

const StyledText = styled('p')(
  compose(
    color,
    layout,
    space,
    typography,
    position,
    border,
  ),
  system({
    textTransform: true,
  }),
  variant({
    prop: 'typeStyle',
    scale: 'typography',
    variants: { default: {} },
  }),
  css`
  word-break: break-word;
  p + p,
  p + ul {
    margin-top: 1.5rem;
  }
  ul {
    list-style: outside;
    padding-left: 15px;
  }
  ol {
    list-style: decimal;
    list-style-position: inside;
  }
  li, p, a, span {
    word-break: break-word;
  }
  p a,
  li a {
    text-decoration: underline;
    font-weight: 600;

    &:hover {
      opacity: 0.7;
    }
  }
  p > a {
    overflow-wrap: anywhere;
    hyphens: auto;
  }
  a {
    overflow-wrap: break-word;
  }
  `,
);

const Text = forwardRef(({ children, uppercase, ...rest }, ref) => {
  if (!children) return null;
  let renderText = children;

  if (typeof children !== 'string' && isRichText(children[0])) {
    renderText = prismicH.asText(children);
  }

  return (
    <StyledText textTransform={uppercase && 'uppercase'} ref={ref} {...rest}>{renderText}</StyledText>
  );
});

Text.propTypes = {
  children: PropTypes.oneOfType([ReactChild, PrismicRichText]),
  uppercase: PropTypes.bool,
};

export default Text;
