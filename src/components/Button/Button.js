import React from 'react';
import PropTypes, { PrismicDoc } from 'types';
import styled, { css } from 'styled-components';
import {
  space, layout, variant, compose, border, color, typography,
} from 'styled-system';
import { Link } from 'components/Link';
import { Text } from 'components/Text';
import { TARGETBUTTON } from './index';

const buttonBase = css`
  appearance: none;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 3px;
  color: inherit;
  cursor: pointer;
  display: inline-flex;
  font-size: 0.9375rem;
  line-height: 1;
  padding: 1em;
  position: relative;
  text-decoration: none;
  touch-action: manipulation;
  justify-content: center;
  text-align: center;
  align-items: center;
  transition: box-shadow 0.4s ease;

  :hover {
    box-shadow:
      0px 1.23656px 2.43877px rgba(33, 30, 63, 0.0217013),
      0px 3.12736px 6.16784px rgba(33, 30, 63, 0.0310596),
      0px 6.37951px 12.5818px rgba(33, 30, 63, 0.0389404),
      0px 13.1406px 25.9162px rgba(33, 30, 63, 0.0482987),
      0px 26px 51px rgba(33, 30, 63, 0.07);
  }
`;

const buttonVariants = variant({
  prop: 'variant',
  scale: 'buttons',
  variants: {
    primary: {
      bg: 'lavender',
      color: 'white !important',
    },
    secondary: {
      bg: 'nightshade',
      color: 'white !important',
    },
    tertiary: {
      bg: 'transparent',
      color: 'nightshade !important',
      border: '1px solid',
      borderColor: 'nightshade',
    },
    quaternary: {
      bg: 'white',
      color: 'black !important',
    },
  },
});

const buttonComposition = compose(space, layout, border, color, typography);

const StyledTargetButtonLink = styled.a(
  buttonBase,
  buttonVariants,
  buttonComposition,
);

const StyledButton = styled.button(
  buttonBase,
  buttonVariants,
  buttonComposition,
);

const StyledButtonLink = styled(Link)(
  buttonBase,
  buttonVariants,
  buttonComposition,
);

// eslint-disable-next-line react/display-name
const Button = React.forwardRef(({
  children, href, doc, size, type, ...rest
}, ref) => {
  const typeStyle = size === 'LARGE' ? 'button_large' : 'button';
  const renderText = <Text as="span" typeStyle={typeStyle}>{children}</Text>;

  // If the target is a popup_form add the correct class
  if (doc && doc.type === 'popup_form') {
    return (
      <StyledButton ref={ref} {...rest} className={doc.uid}>
        {renderText}
      </StyledButton>
    );
  }

  if (type === TARGETBUTTON) {
    return (
      <StyledTargetButtonLink href={href} {...rest}>
        {renderText}
      </StyledTargetButtonLink>
    );
  }
  return (href || doc) ? (
    <StyledButtonLink ref={ref} href={href} doc={doc} {...rest}>
      {renderText}
    </StyledButtonLink>
  ) : (
    <StyledButton ref={ref} {...rest}>
      {renderText}
    </StyledButton>
  );
});

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.any,
  href: PropTypes.string,
  doc: PrismicDoc,
  size: PropTypes.string,
};

export default Button;
