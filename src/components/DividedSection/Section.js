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
import { RichText } from 'components/Text';
import { SectionHeader } from 'components/SectionHeader';
import { hasText } from 'utils';
import { VariableMedia } from 'components/VariableMedia';
import { lessThan } from 'styles/media';

const SectionContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: auto;
  text-align: ${props => props.textAlign};
  grid-row: ${({ reverse }) => (reverse ? '1' : 'auto')};

  h3 {
    font-family: 'Caslon Doric Condensed', sans-serif;
    letter-spacing: -0.01rem;
    text-transform: uppercase;
    font-size: 2.8125rem;
    font-weight: 400;
    margin-bottom: 1.25rem;

    strong {
      font-weight: 800;
    }
  }

  .button {
    margin-left: ${props => (props.textAlign === 'center' ? 'auto' : '0')};
    margin-right: ${props => (props.textAlign === 'center' ? 'auto' : '0')};
  }
`;

const Caption = styled.div`
  width: 100%;
  text-align: left;
  margin: 0.625rem auto 0 auto;

  p {
    font-weight: 500;
  }
`;

function Section({
  item, index, reverse, smallHeading,
}) {
  const {
    heading,
    subheading,
    caption,
    content,
    image,
    text_align,
  } = item;

  const cta = useCta(item);
  const isMobile = useMatchMedia(lessThan('sm'));

  return (
    <Animation name="fadeIn">
      <SectionContainer
        key={`DividedSection${index}`}
        textAlign={isMobile ? 'center' : 'left'}
        $reverse={reverse && index === 1}
      >
        {(hasText(heading) || hasText(content)) && (
          <SectionHeader
            heading={heading}
            subheading={content}
            textAlign={isMobile ? 'center' : text_align || 'left'}
            marginBottom="0.625rem"
            typeStyle={smallHeading ? 'h4' : 'h2'}
          >
            {cta && (
              <StyledButton
                data={cta}
                mt={(hasText(heading) || hasText(subheading) || hasText(content) || image.url) ? '2.5rem' : '0'}
              />
            )}
          </SectionHeader>
        )}

        {image.url && (
          <VariableMedia src={item} fluid />
        )}

        {hasText(caption) && (
          <Caption
            $index={index}
          >
            <RichText typeStyle="bodyS">{caption}</RichText>
          </Caption>
        )}
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
  smallHeading: PropTypes.bool,
};

export default Section;
