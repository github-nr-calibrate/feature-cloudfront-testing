import React from 'react';
import PropTypes, {
  RichText as PrismicText,
  PrismicLink,
  PrismicMediaLink,
  PrismicImage,
} from 'types';
import styled from 'styled-components';
import { useMatchMedia } from 'utils/hooks';
import { lessThan } from 'styles/media';
import { MQAbove } from 'styles/mediaQueries';
import { ParentBlock } from 'components/ParentBlock';
import { Section, VariableBox } from 'components/AsymmetricGrid';
import { Flex } from 'components/Layout';
import { ThemeBlock } from 'components/ThemeBlock';

const Sections = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  ${MQAbove.md`
    align-items: center;
    justify-content: center;

    & > section:nth-child(odd) {
      & > *:first-child {
        border-right: 1px solid var(--border-color);
      }
    }

    & > section:nth-child(even) {
      flex-direction: row-reverse;

      & > *:first-child {
        border-left: 1px solid var(--border-color);
      }
    }

    & > *:not(:last-child) {
      border-bottom: 1px solid var(--border-color);
    }
  `}
`;

const FlexSection = styled(Flex)`
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  grid-row:2;
  position:relative;

  & > *:not(:last-child) {
    border-right: 1px solid var(--border-color);
  }

  & > *:first-child {
    padding-left:0;
  }

  & > *:last-child {
    padding-right:0;
  }
`;

function AsymmetricGrid({ items, primary }) {
  const { text_color, reverse, color_theme } = primary;

  const isMobile = useMatchMedia(lessThan('md'));

  return (
    <ThemeBlock theme={color_theme} paddingTop={['2rem', '4rem', '7.5rem']} paddingBottom={['3rem', '5rem', '7.5rem']}>
      <ParentBlock primary={primary}>
        <Sections>
          {items.map((item, index) => (
            <Section
              index={index}
              item={item}
              reverse={reverse}
              text_color={text_color}
              key={`DividedSection-${index}`}
            />
        ))}
          {isMobile && (
          <FlexSection as="section">
            {items.map((item, index) => (
              <VariableBox
                item={item}
                key={`imageBox-${index}`}
                flex="1 1 0%"
              />
            ))}
          </FlexSection>
        )}
        </Sections>
      </ParentBlock>
    </ThemeBlock>
  );
}

AsymmetricGrid.propTypes = {
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

export default AsymmetricGrid;
