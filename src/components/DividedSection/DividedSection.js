import React from 'react';
import PropTypes, {
  RichText as PrismicText,
  PrismicLink,
  PrismicMediaLink,
  PrismicImage,
} from 'types';
import styled from 'styled-components';
import { MQAbove } from 'styles/mediaQueries';
import { ParentBlock } from 'components/ParentBlock';
import { Section } from 'components/DividedSection';
import { ThemeBlock } from 'components/ThemeBlock';
import { hasText } from 'utils';

const Sections = styled.div`
    display: grid;
    gap: 3.5rem;
    grid-template-columns: 1fr;
    align-items: center;
    margin: auto;

    ${MQAbove.md`
      grid-template-columns: 1fr minmax(0, 1fr);
      gap: 6.5rem;
    `}

  ${MQAbove.md`
    grid-template-columns: repeat( auto-fit, minmax(18.75rem, 1fr) );
    gap: 6.5rem;
    align-items: center;
    justify-content: center;
  `}

  ${MQAbove.lg`
    padding: 0 2.25rem; // Extra padding for the content according to the Figma design
  `}
`;

function DividedSection({ items, primary }) {
  const {
    heading, text_color, reverse, color_theme,
  } = primary;

    return (
      <ThemeBlock theme={color_theme}>
        <ParentBlock primary={primary}>
          <Sections>
            {items.map((item, index) => (
              <Section
                index={index}
                item={item}
                reverse={reverse}
                text_color={text_color}
                key={`DividedSection-${index}`}
                smallHeading={!!hasText(heading)}
              />
        ))}
          </Sections>
        </ParentBlock>
      </ThemeBlock>
    );
}

DividedSection.propTypes = {
  primary: PropTypes.shape({
    text_color: PropTypes.string,
    background_color: PropTypes.string,
    background_image: PrismicImage,
    background_position: PropTypes.string,
    background_image_size: PropTypes.string,
    heading: PrismicText,
    subheading: PrismicText,
    reverse: PropTypes.bool,
    color_theme: PropTypes.string,
  }),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PrismicText,
      subheading: PrismicText,
      emphasis_color: PropTypes.string,
      text_color: PropTypes.string,
      text_align: PropTypes.string,
      caption: PrismicText,
      cta_text: PropTypes.string,
      cta_color: PropTypes.string,
      cta_url: PrismicLink,
      content: PrismicText,
      image: PrismicImage,
      video: PrismicMediaLink,
      webm_video: PrismicMediaLink,
      video_mobile: PrismicMediaLink,
      webm_video_mobile: PrismicMediaLink,
      video_poster: PrismicImage,
      has_desktop_video: PropTypes.bool,
      has_mobile_video: PropTypes.bool,
    }),
  ),
};

export default DividedSection;
