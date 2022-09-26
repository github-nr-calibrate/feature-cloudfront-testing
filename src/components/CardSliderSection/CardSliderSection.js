import React from 'react';
import PropTypes, { RichText as PrismicText, PrismicImage } from 'types';
import { Container, Box } from 'components/Layout';
import { SectionHeader } from 'components/SectionHeader';
import { ThemeBlock } from 'components/ThemeBlock';
import { hasText, isEmpty } from 'utils';
import { Animation } from 'components/Animation';
import { TextGrid } from 'components/TextGrid';

const CardSlider = ({ primary, items }) => {
  const {
    heading,
    color_theme = 'light',
  } = primary || {};

  return (
    <ThemeBlock theme={color_theme}>
      {hasText(heading) && (
        <Box paddingBottom={['0.5rem',, '2rem']}>
          <Container>
            <Animation name="fadeIn">
              <Box>
                <SectionHeader
                  heading={heading}
                  marginBottom="0"
                />
              </Box>
            </Animation>
          </Container>
        </Box>
      )}
      {!isEmpty(items) && (
        <TextGrid items={items} grid2x2Layout />
      )}
    </ThemeBlock>
  );
};

CardSlider.propTypes = {
  primary: PropTypes.shape({
    heading: PrismicText,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    card_icon_image: PrismicImage,
    card_text: PrismicText,
  })),
};

export default CardSlider;
