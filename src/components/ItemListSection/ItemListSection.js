import React from 'react';
import PropTypes, { RichText as PrismicText, PrismicLink, PrismicImage } from 'types';
import { Box, Container } from 'components/Layout';
import { hasText, isEmpty } from 'utils';
import { ThemeBlock } from 'components/ThemeBlock';
import { SectionHeader } from 'components/SectionHeader';
import { Animation } from 'components/Animation';
import { useCta } from 'utils/hooks';
import StyledButton from 'components/Button/StyledButton';
import { TextGrid } from 'components/TextGrid';

function ItemListSection({ primary, items }) {
  const {
    heading,
    body_copy: subheading,
    color_theme = 'light',
  } = primary;

  const cta = useCta(primary);

  return (
    <ThemeBlock theme={color_theme}>
      {hasText(heading) && (
      <Box paddingBottom={['0', , '0.875rem']}>
        <Container>
          <Animation name="fadeIn">
            {(hasText(heading) || hasText(subheading)) && (
            <Box>
              <SectionHeader
                heading={heading}
                subheading={subheading}
                textAlign="left"
                textColor="white"
                splitHeading
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
          </Animation>
        </Container>
      </Box>
      )}
      {!isEmpty(items) && (
        <TextGrid items={items} />
      )}
    </ThemeBlock>
  );
}

ItemListSection.propTypes = {
  primary: PropTypes.shape({
    heading: PrismicText,
    body_copy: PrismicText,
    button_label: PrismicText,
    button_link: PrismicLink,
    color_theme: PropTypes.string,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    icon_image: PrismicImage,
    heading: PrismicText,
    body_copy: PrismicText,
  })),
};

export default ItemListSection;
