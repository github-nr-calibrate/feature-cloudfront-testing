import React from 'react';
import PropTypes, { RichText as PrismicText } from 'types';
import { Container, Flex, Box } from 'components/Layout';
import { RichText } from 'components/Text';
import { SectionHeader } from 'components/SectionHeader';
import { useTheme } from 'styled-components';

function IterableForm({ primary }) {
  const {
    form_id,
    heading,
    body_copy,
    bottom_body_copy,
    text_color,
    emphasis_color,
    background_color,
  } = primary;

  const theme = useTheme();
  const background = theme.colors[background_color] || theme.colors.white;

  return (
    <Box background={background} as="section">
      <Container pt={[4, 5]} pb={[4, 5]} textAlign="center">
        <SectionHeader
          heading={heading}
          subheading={body_copy}
          emphasisColor={emphasis_color}
          textColor={text_color}
        />
        <Flex
          alignItems="center"
          justifyContent="center"
        >
          {form_id && (
            <div className={form_id} />
          )}
        </Flex>
        {bottom_body_copy && (
          <RichText typeStyle="bodyS" pt="1rem">
            {bottom_body_copy}
          </RichText>
        )}
      </Container>
    </Box>
  );
}

IterableForm.propTypes = {
  primary: PropTypes.shape({
    form_id: PropTypes.string,
    heading: PrismicText,
    body_copy: PrismicText,
    bottom_body_copy: PrismicText,
    text_color: PropTypes.string,
    emphasis_color: PropTypes.string,
    background_color: PropTypes.string,
  }),
};

export default IterableForm;
