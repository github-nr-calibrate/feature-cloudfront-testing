import React from 'react';
import PropTypes, { RichText as PrismicText, PrismicLink, PrismicImage } from 'types';
import { ParentBlock } from 'components/ParentBlock';
import { ThemeBlock } from 'components/ThemeBlock';
import styled from 'styled-components';
import { MQAbove } from 'styles/mediaQueries';

function SplitCopySection({ primary }) {
  // Primsic data
  const {
    heading_side,
    color_theme,
  } = primary;

  return (
    <ThemeBlock theme={color_theme} paddingTop={['3.5rem', , '6.25rem']} paddingBottom={['3.5rem', , '6.25rem']}>
      <StyledSplitCopySection>
        <ParentBlock
          primary={primary}
          reverse={heading_side}
          splitHeading
          alignItems="top"
          breakpoint="lg"
        />
      </StyledSplitCopySection>
    </ThemeBlock>
  );
}

const StyledSplitCopySection = styled.div`
  .SectionHeader--split {
    margin-bottom: 0;

    ${MQAbove.md`
      grid-template-columns: 7fr 5fr;
      gap: 2.8125rem;
    `}
  }
`;

SplitCopySection.propTypes = {
  primary: PropTypes.shape({
    heading_side: PropTypes.bool,
    heading: PrismicText,
    strong_heading_color: PropTypes.string,
    body_copy: PrismicText,
    cta_label: PrismicText,
    cta_label_size: PropTypes.string,
    cta_link: PrismicLink,
    padding_top: PropTypes.string,
    padding_bottom: PropTypes.string,
    new_background_color: PropTypes.string,
    text_color: PropTypes.string,
    background_image: PrismicImage,
    background_position: PropTypes.string,
    background_image_size: PropTypes.string,
    background_color: PropTypes.string,
    emphasis_color: PropTypes.string,
    color_theme: PropTypes.string,
  }),
};

export default SplitCopySection;
