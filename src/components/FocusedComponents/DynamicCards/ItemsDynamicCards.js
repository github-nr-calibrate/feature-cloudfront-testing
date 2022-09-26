import React from 'react';
import PropTypes, { PrismicImage, PrismicLink, RichText as PrismicText } from 'types';
import {
  Flex,
  Box,
} from 'components/Layout';
import { Card } from 'components/FocusedComponents';
import { FixedCards } from 'components/FixedCards';
import { useMatchMedia, useOneHeight } from 'utils/hooks';
import { lessThan } from 'styles/media';

const ItemsDynamicCards = ({ items, primary }) => {
  const {
    is_mobile_fixed_cards,
    background_color,
    text_color,
    ui_color,
  } = primary;

  const hasItems = (items) => !!(items?.[0]?.item_body_copy?.length
    || Object.keys(items?.[0]?.item_link || {})?.length
    || items?.[0]?.flip_label?.length
    || Object.keys(items?.[0]?.icon_image || {})?.length
    || items?.[0]?.back_body_copy?.length);

  const isMobile = useMatchMedia(lessThan('lg'));
  const isTabletOrLess = useMatchMedia(lessThan('xl'));
  const { height, refs } = useOneHeight(items);

  if (!hasItems(items)) {
    return null;
  }

  return (
    hasItems(items) && (isMobile && is_mobile_fixed_cards
      ? (
        <Box mx={['-3rem',, 0]}>
          <FixedCards
            items={items}
            primary={{
              background_color,
              text_color,
              ui_color,
            }}
            noPaddings
          />
        </Box>
      )
      : (
        <Box
          pt={[0,, '3rem']}
          pb={4}
          px={0}
          minWidth="100%"
          justifyContent="space-between"
        >
          <Flex
            flexDirection={['column', 'row', 'row']}
            flexWrap={isTabletOrLess && 'wrap' || 'nowrap'}
            justifyContent="center"
            alignItems="center"
            m="-1rem"
          >
            {items.map((item, index) => (
              <Card
                key={`card_item_${item?.item_body_copy}_${index}`}
                minWidth="250px"
                width={['none', 'calc(100% - 3rem)', `${isTabletOrLess ? 40 : 100 / items.length}%`]}
                item={item}
                ref={refs[index]}
                height={['none', `${height}px`, `${height}px`]}
                margin="1rem"
              />
            ))}
          </Flex>
        </Box>
      ))
  );
};

ItemsDynamicCards.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    icon_image: PrismicImage,
    item_body_copy: PrismicText,
    item_link: PrismicLink,
    flip_label: PrismicText,
    back_body_copy: PrismicText,
  })),
  primary: PropTypes.shape({
    is_mobile_fixed_cards: PropTypes.bool,
    background_color: PropTypes.string,
    text_color: PropTypes.string,
    ui_color: PropTypes.string,
  }),
};

export default ItemsDynamicCards;
