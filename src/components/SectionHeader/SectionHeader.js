import React from 'react';
import styled from 'styled-components';
import { RichText, TextFieldStyle } from 'components/Text';
import PropTypes, { RichText as PrismicText } from 'types';
import { Box } from 'components/Layout';
import { hasText, generateId } from 'utils';
import { useMatchMedia } from 'utils/hooks';
import { lessThan } from 'styles/media';
import { Animation } from 'components/Animation';
import { MQAbove } from 'styles/mediaQueries';

const Header = styled(Box)`
    text-align: ${({ textAlign }) => textAlign};
    max-width: ${({ maxWidth }) => maxWidth};
    margin: ${({ margin }) => margin};
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: inherit;

    
    &.SectionHeader--split {
      display: grid;
      grid-template-columns: 2fr 1fr;
      max-width: none;

      header {
        max-width: 44.5rem;

        ${MQAbove.md`
          padding-right: var(--spacing__md);
        `}
      }
    }

    p {
      strong {
        color: inherit;
      }

      strong,
      a {
        font-weight: 500;
      }
    }

    a:not(.button) {
      text-decoration: underline;
      transition: opacity 0.2s ease-in-out;

      &:hover {
        opacity: 0.7;
      }
    }

    header {
      h1, h2, h3, h4, h5, h6 {
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
      }

      p + p {
        margin-top: 0;
      }

      + p {
        padding-top: 0;
      }

      strong {
        color: var(--emphasis-color);

        em {
          color: inherit;
        }
      }
    }
`;

const TextContent = styled(Box)`
   ul, ol {
    text-align: left;
   }
`;

function SectionHeader({
  heading,
  subheading,
  subheadingLarge,
  textAlign = 'center',
  typeStyle = 'h2',
  marginBottom = '1.875rem',
  splitHeading = false,
  children,
  maxWidth = '53.75rem',
  center = false,
  breakpoint = 'md',
}) {
  const calculatedMargin = (center || textAlign === 'center') ? `0 auto ${marginBottom} auto` : `0 0 ${marginBottom} 0`;
  const isMobile = useMatchMedia(lessThan(breakpoint));

  if (!hasText(heading) && !hasText(subheading)) {
    return null;
  }

  return (
    <Header
      textAlign={textAlign}
      margin={calculatedMargin}
      as="div"
      className={(splitHeading && !isMobile) ? 'SectionHeader--split' : null}
      maxWidth={maxWidth}
    >
      {hasText(heading) && (
        <Animation name="reveal">
          <header id={generateId(heading)}>
            <Box as={typeStyle}>
              <RichText
                typeStyle={typeStyle}
                raw
              >
                {heading}
              </RichText>
            </Box>
          </header>
        </Animation>
      )}
      {(hasText(subheading) || children) && (
      <TextContent
        margin={!isMobile && textAlign === 'center' && 'auto'}
        maxWidth={subheadingLarge ? '51rem' : '37.5rem'}
      >
        {hasText(subheading) && (
        <Animation name="fadeIn">
          <Box as="div">
            <TextFieldStyle>
              <RichText
                typeStyle={typeStyle === 'h1' || subheadingLarge ? 'subhead' : 'bodyL'}
              >
                {subheading}
              </RichText>
            </TextFieldStyle>
          </Box>
        </Animation>
      )}
        {children && (
        <Animation name="fadeIn">
          <div>
            {children}
          </div>
        </Animation>
        )}
      </TextContent>
      )}
    </Header>
  );
}

SectionHeader.propTypes = {
  heading: PrismicText,
  subheading: PrismicText,
  subheadingLarge: PropTypes.bool,
  textAlign: PropTypes.string,
  typeStyle: PropTypes.string,
  marginBottom: PropTypes.string,
  splitHeading: PropTypes.bool,
  children: PropTypes.node,
  maxWidth: PropTypes.string,
  center: PropTypes.bool,
  breakpoint: PropTypes.string,
};

export default SectionHeader;
