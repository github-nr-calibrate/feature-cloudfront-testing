import React from 'react';
import PropTypes, { RichText as PrismicText, PrismicLink, PrismicImage } from 'types';
import {
  Container, Flex, Box,
} from 'components/Layout';
import { RichText } from 'components/Text';
import styled from 'styled-components';
import { Animation } from 'components/Animation';
import ResponsiveImage from 'components/ResponsiveImage';
import { MQAbove } from 'styles/mediaQueries';
import { hasText } from 'utils';
import { useCta } from 'utils/hooks';
import StyledButton from 'components/Button/StyledButton';
import { SectionHeader } from 'components/SectionHeader';
import { ThemeBlock } from 'components/ThemeBlock';

function InlineQuoteSection({ primary }) {
  // Primsic data
  const {
    heading,
    body_copy,
    quote,
    quote_attr,
    quote_attr_image,
    profile_image,
    profile_name,
    profile_title,
    color_theme = 'grey',
  } = primary || {};

  const image = quote_attr_image || profile_image;
  const subheading = body_copy;
  const attribute = quote_attr || profile_name;

  const cta = useCta(primary);

  return (
    <ThemeBlock theme={color_theme}>
      <Container>
        {(hasText(heading) || hasText(subheading)) && (
          <Animation name="reveal">
            <Header>
              <Box>
                <SectionHeader
                  heading={heading}
                  textAlign="left"
                  textColor="white"
                  marginBottom="0"
                />
              </Box>
              {hasText(subheading) && (
                <Box>
                  <SectionHeader
                    subheading={subheading}
                    textAlign="left"
                    textColor="white"
                    marginBottom="0"
                  >
                    {cta && (
                    <StyledButton
                      data={cta}
                      mt="2rem"
                    />
                  )}
                  </SectionHeader>
                </Box>
              )}
            </Header>
          </Animation>
        )}
        <QuoteSection $hasBorderTop={(hasText(heading) || hasText(subheading))}>
          <QuoteBox flex={['0 0 100%',, '0 0 60%']}>
            <Animation name="fadeIn">
              <Box>
                <IconQuoteBox>
                  <IconQuote />
                </IconQuoteBox>
                <Quote
                  typeStyle="bodyL"
                  pb={['1.25rem',, '2.125rem']}
                >
                  {quote}
                </Quote>
              </Box>
            </Animation>
          </QuoteBox>
          <ImageBox flex={['0 0 100%',, '0 0 40%']}>
            <IconArrowBox>
              <IconArrow />
            </IconArrowBox>
            {image?.url && (
              <Animation name="revealLeft">
                <Box>
                  <ResponsiveImage src={image} ratio={0.71} />
                  {hasText(attribute) && (
                    <Attribute>
                      <RichText fontWeight={hasText(profile_title) ? '600' : undefined}>{attribute}</RichText>
                      {hasText(profile_title) && (
                        <RichText>{profile_title}</RichText>
                      )}
                    </Attribute>
                  )}
                </Box>
              </Animation>
            )}
          </ImageBox>
        </QuoteSection>
      </Container>
    </ThemeBlock>
  );
}

const Header = styled.div`
  display: grid;
  padding-bottom: 3rem;

  ${MQAbove.md`
    padding-bottom: 4rem;
    grid-template-columns: 7fr 4fr;
    grid-column-gap: 7.5rem;
  `}

  ${MQAbove.lg`
    padding-bottom: 5rem;
  `}
`;

const QuoteSection = styled(Flex)`
  flex-direction: column;
  position: relative;
  text-align: center;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -1.5rem;
      width: calc(100% + 3rem);
      height: 1px;
      border-bottom: 1px solid var(--border-color);
    }

  ${MQAbove.md`
    border-top: ${({ $hasBorderTop }) => ($hasBorderTop ? '1px solid var(--border-color)' : 'none')};
    flex-direction:row;
    text-align: left;

      &::before {
        display:none;
      }
    `}
`;

const QuoteBox = styled(Flex)`
  padding: 3rem 0 2.5rem;
  line-height: 1.5rem;

  ${MQAbove.md`
    padding: 4rem 5.25rem 4rem 0;
    align-items: center;
    text-align: center;
    line-height: 2rem;
    border-right: 1px solid var(--border-color);
  `}

  ${MQAbove.lg`
    padding: 7rem 6.25rem 7rem 0;
  `}
`;

const IconQuoteBox = styled.div`
  svg {
    width: 18px;

    ${MQAbove.md`
      width: 24px;
  `}
  }
`;

const Quote = styled(RichText)`
  p {
    font-weight: 500;
    padding: 0.5rem 0;
    line-height: 1.8;

    ${MQAbove.md`
      padding: 1rem 0 0;
    `}

    ${MQAbove.lg`
      font-size: 1.25rem; // Slightly larger
    `}
  }
`;

const ImageBox = styled(Box)`
  padding-top: 2.5rem;
  position: relative;
  border-top: 1px solid var(--border-color);

  ${MQAbove.md`
    padding: 2.5rem 2.5rem 1rem 2.5rem;
    align-self: center;
    border: none;
  `}

  ${MQAbove.lg`
    padding: 4.5rem 4.9rem 1.5rem 4.9rem;
  `}
`;

const Attribute = styled.div`
  color: var(--text-color-accent-1);
  text-align: center;
  padding-top: 1rem;

  > div {
    display: inline-block;

    + div {
      margin-left: 0.5rem;
    }
  }

  ${MQAbove.md`
    padding-top: 1.25rem;
  `}

  p {
    font-size: 0.875rem;

    ${MQAbove.md`
      font-size: 1rem;
    `}
  }
`;

const IconArrowBox = styled.div`
  position: absolute;
  height: 46px;
  top: -29px;
  left: calc(50% - 13px);

  svg {
    height: 43px;
    transform: rotate(-90deg);
  }

  ${MQAbove.md`
    left: -2px;
    top: calc(50% - 23px);

    svg {
      transform: rotate(0);
    }
  `}
`;

const IconQuote = () => (
  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.0897 24H24.3461V14.0513H19.7307V12.4103C19.7307 9.02564 20.4487 5.94872 24.0384 5.1282V0C17.2692 1.1282 14.0897 5.84615 14.0897 12.9231V24ZM0.653809 24H10.9102V14.0513H6.29483V12.4103C6.29483 9.02564 7.01278 5.94872 10.6025 5.1282V0C3.8333 1.1282 0.653809 5.84615 0.653809 12.9231V24Z" fill="var(--emphasis-color)" />
  </svg>
);

const IconArrow = () => (
  <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 8.50002L1 0.860474V17.6124L16 8.50002Z" fill="var(--background-color)" />
    <path d="M1 0.860474L16 8.50002L1 17.6124" stroke="var(--border-color)" />
  </svg>
);

InlineQuoteSection.propTypes = {
  primary: PropTypes.shape({
    quote_side: PropTypes.bool,
    body_copy: PrismicText,
    cta_label: PrismicText,
    cta_label_size: PropTypes.string,
    cta_link: PrismicLink,
    quote: PrismicText,
    quote_attr: PrismicText,
    quote_attr_image: PrismicImage,
    padding_top: PropTypes.string,
    padding_bottom: PropTypes.string,
    background_color: PropTypes.string,
    background_image: PrismicImage,
    background_position: PropTypes.string,
    background_image_size: PropTypes.string,
    text_color: PropTypes.string,
    emphasis_color: PropTypes.string,
    heading: PrismicText,
    profile_image: PrismicImage,
    profile_name: PrismicText,
    profile_title: PrismicText,
    color_theme: PropTypes.string,
  }),
};

export default InlineQuoteSection;
