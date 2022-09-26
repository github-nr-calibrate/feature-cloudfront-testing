import React from 'react';
import PropTypes, { RichText as PrismicText, PrismicLink, PrismicImage } from 'types';
import {
  Box,
} from 'components/Layout';
import { useMatchMedia } from 'utils/hooks';
import { lessThan } from 'styles/media';
import { ParentBlock } from 'components/ParentBlock';
import ChatGraphic from './ChatGraphic';

function ChatGraphicSection({ primary, items }) {
  // Primsic data
  const {
    chat_side,
  } = primary;

  const isMobile = useMatchMedia(lessThan('md'));

  return (
    <ParentBlock
      primary={primary}
      columns
      reverse={isMobile || !chat_side}
    >
      <Box
        my={['1.25rem', 0]}
      >
        <ChatGraphic height="100%" items={items} />
      </Box>

    </ParentBlock>
  );
}

ChatGraphicSection.propTypes = {
  primary: PropTypes.shape({
    heading: PrismicText,
    body_copy: PrismicText,
    button_label: PrismicText,
    button_link: PrismicLink,
    chat_side: PropTypes.bool,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    message_origin: PropTypes.bool,
    chat_text: PrismicText,
    chat_profile_image: PrismicImage,
  })),
};

export default ChatGraphicSection;
