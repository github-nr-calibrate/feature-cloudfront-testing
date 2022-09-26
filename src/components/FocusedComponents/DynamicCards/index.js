import React from 'react';
import PropTypes, { PrismicImage, PrismicLink, RichText as PrismicText } from 'types';
import { ParentBlock } from 'components/FocusedComponents';
import ItemsDynamicCards from './ItemsDynamicCards';

const DynamicCards = ({ primary, items }) => (
  <ParentBlock
    Component={<ItemsDynamicCards items={items} primary={primary} />}
    primary={primary}
  />
);

DynamicCards.propTypes = {
  primary: PropTypes.shape({
    heading: PrismicText,
    body_copy: PrismicText,
    cta_button_label: PrismicText,
    cta_button_link: PrismicLink,
    background_color: PropTypes.string,
    affirm_price: PropTypes.number,
    link: PrismicLink,
    link_label: PrismicText,
    button_type: PropTypes.string,
    is_mobile_fixed_cards: PropTypes.bool,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    icon_image: PrismicImage,
    item_body_copy: PrismicText,
    item_link: PrismicLink,
    item_link_label: PrismicText,
  })),
};

export default DynamicCards;
