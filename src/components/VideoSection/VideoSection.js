import React from 'react';
import PropTypes, {
  RichText as PrismicText,
  PrismicImage,
  PrismicLink,
} from 'types';
import styled, { css } from 'styled-components';
import { hasText, isEmpty } from 'utils';
import { MQAbove } from 'styles/mediaQueries';
import { RichText } from 'components/Text';
import { VideoPlayer } from 'components/VideoPlayer';
import { Animation } from 'components/Animation';
import { Box, Flex, Container } from 'components/Layout';
import { SectionHeader } from 'components/SectionHeader';
import { ThemeBlock } from 'components/ThemeBlock';
import { TextGrid } from 'components/TextGrid';

const FlexSection = styled(Flex)`
  flex-direction: column;

  ${MQAbove.md`
    flex-direction:row;
  `}
`;

const TextBox = styled(Flex)`
  padding: 0 0 2.5rem 0;

  ${({ $videoRight }) => $videoRight && css`
    ${MQAbove.md`
      border-left: 1px solid var(--border-color);
      order: 2;
    `}
  `}

  ${({ $videoRight }) => !$videoRight && css`
    ${MQAbove.md`
      border-right: 1px solid var(--border-color);
    `}
  `}

  ${MQAbove.md`
    padding: ${({ $videoRight }) => $videoRight ? '2rem 0 2rem 2.75rem' : '2rem 2.75rem 2rem 0'};
  `}

  ${MQAbove.lg`
    padding: ${({ $videoRight }) => $videoRight ? '2rem 0 2rem 4.375rem' : '2rem 4.375rem 2rem 0'};
  `}

  ${MQAbove.md`
    align-items: center;
  `}
`;

const VideoBox = styled(Box)`
  padding: 0;

  ${MQAbove.md`
    padding: ${({ $videoRight }) => $videoRight ? '2rem 2.75rem 2rem 0' : '2rem 0 2rem 2.75rem'};
    align-self: center;
  `}

  ${MQAbove.lg`
    padding: ${({ $videoRight }) => $videoRight ? '2rem 4.375rem 2rem 0' : '2rem 0 2rem 4.375rem'};
  `}
`;

function VideoSection({ primary, items }) {
  // Primsic data
  const {
    video_side,
    video_caption,
    heading,
    body_copy,
    emphasis_color,
    text_color,
    color_theme,
  } = primary;

  return (
    <ThemeBlock theme={color_theme}>
      <Container>
        <FlexSection>
          <TextBox flex={['0 0 100%',, '0 0 40%']} $videoRight={video_side}>
            {(hasText(heading) || hasText(body_copy)) && (
              <SectionHeader
                heading={heading}
                typeStyle="h4"
                subheading={body_copy}
                emphasisColor={emphasis_color}
                textColor={text_color}
                marginBottom="0"
              />
            )}
          </TextBox>
          <VideoBox flex={['0 0 100%',, '0 0 60%']} $videoRight={video_side}>
            <Animation name="fadeIn">
              <Box width="100%" height="auto">
                <VideoPlayer {...primary} />
                {video_caption?.length > 0 && (
                  <RichText
                    typeStyle="bodyM"
                    my={4}
                  >
                    {video_caption}
                  </RichText>
                )}
              </Box>
            </Animation>
          </VideoBox>
        </FlexSection>
      </Container>
      {!isEmpty(items) && (
        <TextGrid
          items={items}
          marginTop={['var(--spacing__sm)',, '0']}
          alignItems="left"
          fullWidth={false}
        />
      )}
    </ThemeBlock>
  );
}

VideoSection.propTypes = {
  primary: PropTypes.shape({
    video_side: PropTypes.bool,
    heading: PrismicText,
    strong_heading_color: PropTypes.string,
    body_copy: PrismicText,
    emphasis_color: PropTypes.string,
    video_title: PrismicText,
    video_eyebrow: PrismicText,
    video_cover_image: PrismicImage,
    video_url: PrismicLink,
    video_caption: PrismicText,
    padding_top: PropTypes.string,
    padding_bottom: PropTypes.string,
    cta_text: PropTypes.string,
    cta_color: PropTypes.string,
    cta_url: PrismicLink,
    new_background_color: PropTypes.string,
    text_color: PropTypes.string,
    color_theme: PropTypes.string,
  }),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PrismicImage,
      heading: PrismicText,
      content: PrismicText,
      cta_label: PrismicText,
      cta_url: PrismicLink,
    }),
  ),
};

export default VideoSection;
