import React from 'react';
import PropTypes, { PrismicImage, PrismicLink, RichText as PrismicText } from 'types';
import { ParentBlock } from 'components/ParentBlock';
import ItemsValueProps from './ItemsValueProps';

const ValueProps = ({ primary, items }) => (
  <ParentBlock primary={primary} mobileAlign="center">
    <ItemsValueProps items={items} />
  </ParentBlock>
);

ValueProps.propTypes = {
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
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    icon_image: PrismicImage,
    item_heading: PrismicText,
    item_body_copy: PrismicText,
    item_link: PrismicLink,
    item_link_label: PrismicText,
  })),
};

export default ValueProps;
