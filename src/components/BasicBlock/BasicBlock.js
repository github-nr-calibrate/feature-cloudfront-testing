import React from 'react';
import PropTypes, { PrismicLink, RichText as PrismicText } from 'types';
import { ParentBlock } from 'components/ParentBlock';
import { ThemeBlock } from 'components/ThemeBlock';

function BasicBlock({ primary }) {
  const {
    color_theme,
  } = primary;

  return (
    <ThemeBlock theme={color_theme}>
      <ParentBlock primary={primary} headerMarginBottom="0" headerCenter subheadingLarge />
    </ThemeBlock>
  );
}

BasicBlock.propTypes = {
  primary: PropTypes.shape({
    heading: PrismicText,
    body_copy: PrismicText,
    cta_button_label: PrismicText,
    cta_button_link: PrismicLink,
    copy_width: PropTypes.string,
    background_color: PropTypes.string,
    affirm_price: PropTypes.number,
    link: PrismicLink,
    link_label: PrismicText,
    button_type: PropTypes.string,
    align_text: PropTypes.string,
    padding_top: PropTypes.string,
    text_color: PropTypes.string,
    bold_text_color: PropTypes.string,
    other_header_style: PropTypes.bool,
    color_theme: PropTypes.string,
  }),
};

export default BasicBlock;
