import React from 'react';
import PropTypes, { PrismicMediaLink, PrismicImage, RichText as RichTextType } from 'types';
import { ParentBlock } from 'components/ParentBlock';
import { lessThan } from 'styles/media';
import { useMatchMedia } from 'utils/hooks';
import { VariableMedia } from 'components/VariableMedia';

function SplitSection({ primary }) {
  // Prismic data
  const { image_side } = primary;

  const isMobile = useMatchMedia(lessThan('md'));

  return (
    <ParentBlock
      primary={primary}
      columns
      reverse={isMobile ? true : !image_side}
      edgeToEdge
      px="0"
      breakpoint="md"
    >
      <VariableMedia src={primary} ratio={['16:9', '16:9', '16:9', 'auto']} />
    </ParentBlock>
  );
}

SplitSection.propTypes = {
  primary: PropTypes.shape({
    heading: RichTextType,
    body_copy: RichTextType,
    image: PrismicImage,
    background_color: PropTypes.string,
    image_side: PropTypes.bool,
    video: PrismicMediaLink,
    webm_video: PrismicMediaLink,
    video_mobile: PrismicMediaLink,
    webm_video_mobile: PrismicMediaLink,
    video_poster: PrismicImage,
    has_desktop_video: PropTypes.bool,
    has_mobile_video: PropTypes.bool,
  }),
};

export default SplitSection;
