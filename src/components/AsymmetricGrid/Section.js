import React from 'react';
import PropTypes, {
  RichText as PrismicText,
  PrismicLink,
  PrismicMediaLink,
  PrismicImage,
} from 'types';
import styled from 'styled-components';
import { Animation } from 'components/Animation';
import { useCta, useMatchMedia } from 'utils/hooks';
import StyledButton from 'components/Button/StyledButton';
import { lessThan } from 'styles/media';
import { MQAbove } from 'styles/mediaQueries';
import { RichText } from 'components/Text';
import { SectionHeader } from 'components/SectionHeader';
import { hasText } from 'utils';
import { Box } from 'components/Layout';
import VariableBox from './VariableBox';

const SectionContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: auto;
  text-align: center;
  grid-row: ${({ reverse }) => (reverse ? '1' : 'auto')};
  justify-content: center;

  ${MQAbove.md`
    flex-direction: row;
  `}

  h3 {
    font-family: 'Caslon Doric Condensed', sans-serif;
    letter-spacing: -0.01rem;
    text-transform: uppercase;
    font-size: 2.8125rem;
    font-weight: 400;
    margin-bottom: 1.25rem;

    strong {
      font-weight: 800;
      color: var(--divided-section-theme-color);
    }
  }

  .button {
    margin-left: ${props => (props.textAlign === 'center' ? 'auto' : '0')};
    margin-right: ${props => (props.textAlign === 'center' ? 'auto' : '0')};
  }
`;

const TextBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 0 1rem;

  ${MQAbove.md`
    padding: 3rem;
  `}

  ${MQAbove.lg`
    padding: 4rem;
  `}
`;

function Section({
  item, index, reverse, text_color,
}) {
  const {
    heading,
    subheading,
    text_align,
    content,
    image,
    text_emphasis_color,
  } = item;
  const cta = useCta(item);

  const isMobile = useMatchMedia(lessThan('md'));

  return (
    <Animation name="fadeIn">
      <SectionContainer
        key={`DividedSection${index}`}
        textAlign={text_align}
        reverse={reverse && index === 1}
      >

        {!isMobile && (
          <VariableBox
            item={item}
            key={`imageBox-${index}`}
            flex={['0 0 100%',, '0 0 40%']}
          />
        )}

        <TextBox flex={['0 0 100%',, '0 0 60%']}>
          {(hasText(heading) || hasText(subheading)) && (
            <SectionHeader
              heading={heading}
              subheading={subheading}
              emphasisColor={text_emphasis_color}
              textColor={text_color}
              textAlign={text_align}
              marginBottom="0.625rem"
            />
          )}

          {hasText(content) && <RichText typeStyle="bodyM" emphasisColor={text_emphasis_color}>{content}</RichText>}

          {cta && (
          <StyledButton
            data={cta}
            mt={(hasText(heading) || hasText(subheading) || hasText(content) || image.url) ? '1.875rem' : '0'}
          />
          )}
        </TextBox>

      </SectionContainer>
    </Animation>
  );
}

Section.propTypes = {
  item: PropTypes.shape({
    heading: PrismicText,
    subheading: PrismicText,
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
    text_emphasis_color: PropTypes.string,
  }),
  index: PropTypes.number,
  reverse: PropTypes.bool,
  text_color: PropTypes.string,
};

export default Section;
