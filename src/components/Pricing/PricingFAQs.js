import React, { useState } from 'react';
import PropTypes, { PrismicDoc, RichText as PrismicText } from 'types';
import { Box, Container } from 'components/Layout';
import { FAQHeader } from 'components/FAQs';
import { TextField, TextFieldStyle } from 'components/Text';
import { SectionHeader } from 'components/SectionHeader';
import styled from 'styled-components';
import { useCta, useMatchMedia } from 'utils/hooks';
import StyledButton from 'components/Button/StyledButton';
import { MQAbove } from 'styles/mediaQueries';
import { lessThan } from 'styles/media';
import { hasText, slugify } from 'utils';
import { ThemeBlock } from 'components/ThemeBlock';

function PricingFAQs({ primary, items }) {
  const {
    faqs_title,
    other_header_style,
    subheading,
    color_theme = 'light',
  } = primary;

  const cta = useCta(primary);
  const isMobile = useMatchMedia(lessThan('md'));

  const headerStyle = other_header_style ? 'bodyL' : 'h2';

  return (
    <ThemeBlock theme={color_theme}>
      <Container>
        <GridRow>
          <Box>
            {(hasText(faqs_title) || hasText(subheading)) && (
              <SectionHeader
                heading={faqs_title}
                subheading={subheading}
                typeStyle={headerStyle}
                textAlign={isMobile ? 'center' : 'left'}
                marginBottom="3.5rem"
              >
                {cta && (
                  <StyledButton
                    data={cta}
                    mt={['1rem', '1.5rem']}
                  />
                )}
              </SectionHeader>
            )}
          </Box>
          <FAQItems>
            {items.map((item) => (
              item && (
                <ExpandableFAQ
                  key={slugify(item.title)}
                  item={item}
                />
              )
            ))}
          </FAQItems>
        </GridRow>
      </Container>
    </ThemeBlock>
  );
}

function ExpandableFAQ({ item }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <FAQHeader
        doc={item}
        borderColor="borderDark"
        onClick={toggleOpen}
        $isOpen={isOpen}
        aria-expanded={isOpen}
        aria-controls={`faq-content-${slugify(item.title)}`}
        id={`faq-control-${slugify(item.title)}`}
      />
      <FAQBox
        py="1.5rem"
        mb="0.5rem"
        $isOpen={isOpen}
        aria-hidden={!isOpen}
        id={`faq-content-${slugify(item.title)}`}
      >
        <TextFieldStyle>
          <TextField>{item.body}</TextField>
        </TextFieldStyle>
      </FAQBox>
    </>
  );
}

const FAQItems = styled(Box)`
  button:first-of-type {
    padding-top: 0;
  }
`;

const FAQBox = styled(Box)`
  display: ${props => (props.$isOpen ? 'block' : 'none')};

  a {
    color: currentColor;
    text-decoration: underline;
    transition: opacity 0.25s ease-in;
  }

  a:hover {
    opacity: 0.8;
  }
`;

const GridRow = styled.div`
  display: grid;

  ${MQAbove.md`
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  `}

  ${MQAbove.lg`
    grid-template-columns: 4fr 6fr;
    column-gap: 5rem;
  `}
`;

PricingFAQs.propTypes = {
  items: PropTypes.arrayOf(PrismicDoc),
  primary: PropTypes.shape({
    faqs_title: PrismicText,
    other_header_style: PropTypes.bool,
    color_theme: PropTypes.string,
    subheading: PrismicText,
  }),
};

ExpandableFAQ.propTypes = {
  item: PrismicDoc,
};

export default PricingFAQs;
