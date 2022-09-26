import React from 'react';
import { RichText } from 'components/Text';
import PropTypes, { RichText as PrismicText, PrismicImage } from 'types';
import { Box } from 'components/Layout';
import ResponsiveImage from 'components/ResponsiveImage';
import styled from 'styled-components';

const SectionHero = ({ primary, _printable }) => {
  const {
    title,
    subtitle,
    image,
  } = primary;

  return (
    <Box textAlign="center" padding="40px 0" className={_printable ? 'can-print' : 'no-print'}>
      <SectionHeroImage>
        <ResponsiveImage src={image} />
      </SectionHeroImage>
      {title && (
      <RichText margin="1.25rem 0 0 0">
        {title}
      </RichText>
      )}
      {subtitle && (
      <RichText margin="1.25rem 0 2.5rem 0">
        {subtitle}
      </RichText>
      )}
    </Box>
  );
};

const SectionHeroImage = styled.div`
  width: 100%;
  height: 33.75rem;
  margin: 0 0 1.25rem;
`;

SectionHero.propTypes = {
  primary: PropTypes.shape({
    title: PrismicText,
    subtitle: PrismicText,
    image: PrismicImage,
  }),
  _printable: PropTypes.bool,
};

export default SectionHero;
