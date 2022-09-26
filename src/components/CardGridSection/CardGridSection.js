import React from 'react';
import PropTypes, {
  PrismicBoolean,
  PrismicImage,
  PrismicLink,
  RichText as PrismicText,
} from 'types';
import {
  Box, Row, Col, Flex,
} from 'components/Layout';
import { RichText } from 'components/Text';
import styled from 'styled-components';
import ResponsiveImage from 'components/ResponsiveImage';
import { ParentBlock } from 'components/ParentBlock';
import { MQAbove } from 'styles/mediaQueries';
import { Link } from 'components/Link';

function CardGridSection({ primary, items }) {
  // Primsic data
  const {
    dark_mode,
    large_cards,
  } = primary;

  // Support for legacy dark mode
  if (dark_mode) {
    primary.background_color = 'nightshade';
    primary.text_color = 'white';
  }

  function itemsEmpty(item) {
    return (
      item[0].body_copy
      || item[0].heading
      || item[0].icon_image
      || item[0].link
    ).length === 0;
  }

  return (
    <ParentBlock primary={primary}>
      <GridSection>
        {!itemsEmpty(items) && items.map(({
          icon_image,
          heading: item_heading,
          body_copy: item_body,
          link,
          link_copy,
        }, index) => (
          <Col
            key={`list_item_${item_heading}_${index}`}
          >
            <Cards
              alignItems="center"
              isLarge={large_cards}
              flexDirection="column"
            >
              {icon_image.url
               && (
               <>
                 <Box
                   mb="1.5rem"
                   width="5rem"
                   height="5rem"
                 >
                   {icon_image?.url && (
                   <ResponsiveImage src={icon_image} />
                    )}
                 </Box>
               </>
               )}
              <Wrapper isLarge={large_cards}>
                <RichText
                  px={['3rem', 0]}
                  typeStyle="bodyM"
                  color={dark_mode ? 'yellow' : 'greenLight'}
                  fontWeight="500 !important"
                  pb={[0,, 3]}
                  textAlign="center"
                  minHeight={large_cards ? 'none' : ['2rem',, '5rem']}
                >
                  {item_heading}
                </RichText>
              </Wrapper>
              <CardCopy
                isLarge={large_cards}
                color={dark_mode ? 'white' : 'inherit'}
                textAlign="center"
                typeStyle="bodyM"
              >
                {item_body}
              </CardCopy>
              { (link.url || link.id)
                  && (
                  <Link
                    doc={link}
                    style={{
                      textDecoration: 'underline',
                      marginTop: '1rem',
                    }}
                  >
                    {link_copy[0].text || link.url}
                  </Link>
                  )}
            </Cards>
          </Col>
        ))}
      </GridSection>
    </ParentBlock>
  );
}

// Styles
const Wrapper = styled(Box)`
  &>* {
    display: flex;
    flex-direction: column;
    justify-content: ${({ isLarge }) => isLarge ? 'flex-start' : 'center'};
  }
`;

const GridSection = styled(Row)`
  flex-direction: column;
  flex-wrap: nowrap;
  ${MQAbove.md`
    flex-direction: row;
  `}
`;

const cards = {
  large: `
    min-height: 15em;
    margin-bottom: 4em;
    @media screen and (min-width: 52em) {
      min-height: 20em;
    }
  `,
  small: `
    margin-bottom: 2em;
  `,
};

const Cards = styled(Flex)`
  ${({ isLarge }) => isLarge ? cards.large : cards.small}
`;

const CardCopy = styled(RichText)`
  width: ${({ isLarge }) => isLarge && '70%'};
  ${MQAbove.md`
    width: ${({ isLarge }) => isLarge && '100%'};
  `}
  flex-grow: ${({ isLarge }) => isLarge ? '1' : 'auto'}
`;

CardGridSection.propTypes = {
  primary: PropTypes.shape({
    body_copy: PrismicText,
    button_label: PrismicText,
    button_link: PrismicLink,
    cta_copy: PrismicText,
    dark_mode: PropTypes.boolean,
    background_color: PropTypes.string,
    text_color: PropTypes.string,
    heading: PrismicText,
    strong_heading_color: PropTypes.string,
    sign_up_cta: PrismicBoolean,
    subheading: PropTypes.arrayOf(PropTypes.shape({
      spans: PropTypes.array,
      text: PropTypes.string,
      type: PropTypes.string,
    })),
    large_cards: PrismicBoolean,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    icon_image: PrismicImage,
    heading: PrismicText,
    body_copy: PrismicText,
  })),
};

export default CardGridSection;
