import React from 'react';
import PropTypes, { PrismicImage, RichText as PrismicText } from 'types';
import { Box, Flex } from 'components/Layout';
import { ParentBlock } from 'components/FocusedComponents';
import { parseDDColor } from 'client/prismic';
import ItemsCopyWithList from './ItemsCopyWithList';

const CopyWithList = ({ primary, items }) => {
  const {
    text_color,
    background_color,
    padding_top,
    is_parent_on_right,
  } = primary;

  return (
    <Flex
      flexDirection={['column', is_parent_on_right ? 'row-reverse' : 'row']}
      bg={parseDDColor(background_color)}
      color={parseDDColor(text_color)}
    >
      <Box
        width={['100%', '50%']}
      >
        <ParentBlock primary={primary} />
      </Box>
      <ItemsCopyWithList
        items={items}
        paddingTop={padding_top}
        color={parseDDColor(text_color)}
      />
    </Flex>
  );
};

CopyWithList.propTypes = {
  primary: PropTypes.shape({
    background_color: PropTypes.string,
    padding_top: PropTypes.string,
    text_color: PropTypes.string,
    is_parent_on_right: PropTypes.bool,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    icon_image: PrismicImage,
    item_heading: PrismicText,
    item_body_copy: PrismicText,
  })),
};

export default CopyWithList;
