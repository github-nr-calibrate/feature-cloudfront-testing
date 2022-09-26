import React from 'react';
import PropTypes, { PrismicImage, RichText as RichTextType } from 'types';
import ResponsiveImage from 'components/ResponsiveImage';
import { ParentBlock } from 'components/ParentBlock';

function SplitSection({ primary }) {
  // Primsic data
  const {
    image,
    image_side,
  } = primary;

  return (
    <ParentBlock
      primary={primary}
      edgeToEdge
      px="0"
      columns
      reverse={!image_side}
      alignItems="flex-end"
      minHeight={['none', '31.25rem']}
    >
      {image?.url && (
      <ResponsiveImage src={image} ratio="16:9" />
        )}
    </ParentBlock>
  );
}

SplitSection.propTypes = {
  primary: PropTypes.shape({
    heading: RichTextType,
    image: PrismicImage,
    new_background_color: PropTypes.string,
    text_color: PropTypes.string,
    image_side: PropTypes.bool,
  }),
};

export default SplitSection;
