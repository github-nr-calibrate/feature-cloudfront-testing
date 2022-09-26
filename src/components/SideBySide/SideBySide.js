import React from 'react';
import styled from 'styled-components';
import { useMatchMedia } from 'utils/hooks';
import { lessThan } from 'styles/media';
import PropTypes, {
  PrismicImage,
  PrismicLink,
  PrismicMediaLink,
  RichText as PrismicText,
} from 'types';
import { Box, Flex, Container } from 'components/Layout';
import { ParentBlock } from 'components/ParentBlock';
import { VariableMedia } from 'components/VariableMedia';
import { RichText } from 'components/Text';
import { Badge } from 'components/Badge';
import { ThemeBlock } from 'components/ThemeBlock';
import { Animation } from 'components/Animation';
import { hasText } from 'utils';
import { MQAbove } from 'styles/mediaQueries';
import ItemsSideBySide from './ItemsSideBySide';

const SideBySide = ({ primary, items }) => {
  const {
    is_parent_on_right,
    image_caption,
    quote,
    color_theme,
    is_image,
  } = primary;

  const isMobile = useMatchMedia(lessThan('md'));

  return (
    <ThemeBlock theme={color_theme}>
      <Container>
        <Flex flexDirection={['column', 'column', is_parent_on_right ? 'row-reverse' : 'row']} alignItems="stretch" gridGap={['3.5rem',, '6.5rem']}>
          <TextBox flex="55%">
            <Badge mb={isMobile ? '2.8125rem' : '3.125rem'} />
            <Box>
              <ParentBlock
                primary={primary}
                px="0"
                headerMarginBottom={quote ? '' : '-1rem'}
                containerPX="0"
              />
              {hasText(quote) && (
                <Animation name="fadeIn">
                  <Quote flexDirection="column" gridRowGap="1rem" paddingTop="2rem">
                    <IconQuote />
                    <RichText typeStyle="bodyM">{quote}</RichText>
                  </Quote>
                </Animation>
              )}
            </Box>
          </TextBox>
          {(is_image || is_image === undefined) ? (
            <Animation name="revealLeft">
              <Box flex="45%" flexDirection="column" width="100%">
                <ImageArea>
                  <VariableMedia src={primary} ratio={[1.02, 1.26, 1.26]} />
                </ImageArea>

                {hasText(image_caption) && (
                <Caption>
                  <RichText typeStyle="bodyS">{image_caption}</RichText>
                </Caption>
               )}
              </Box>
            </Animation>
            ) : (
              <ItemsSideBySide items={items} />
            )}
        </Flex>
      </Container>
    </ThemeBlock>
  );
};

const TextBox = styled(Box)`
  ${MQAbove.md`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `}
`;

const Quote = styled(Flex)`
  p {
    font-weight: 500;
  }
`;

const IconQuote = () => {
  const svgIcon = (
    <svg width="18.75" height="18" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.0897 24H24.3461V14.0513H19.7307V12.4103C19.7307 9.02564 20.4487 5.94872 24.0384 5.1282V0C17.2692 1.1282 14.0897 5.84615 14.0897 12.9231V24ZM0.653809 24H10.9102V14.0513H6.29483V12.4103C6.29483 9.02564 7.01278 5.94872 10.6025 5.1282V0C3.8333 1.1282 0.653809 5.84615 0.653809 12.9231V24Z" fill="var(--emphasis-color)" />
    </svg>
  );

  return svgIcon;
};

const ImageArea = styled.div`
  ${MQAbove.md`
      max-width: 27.5rem;
      margin: 0 0 0 auto;
  `}
`;

const Caption = styled(Box)`
  width: 100%;
  padding: 1rem 0 0;
  display: flex;

  p {
    font-weight: 500;
  }

  ${MQAbove.sm`
      width: 100%;
      max-width: 27.5rem;
      margin: 0 0 0 auto;
  `}
`;

SideBySide.propTypes = {
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
    min_height: PropTypes.string,
    padding_top: PropTypes.string,
    image: PrismicImage,
    image_caption: PrismicText,
    is_image: PropTypes.bool,
    is_parent_on_right: PropTypes.bool,
    video: PrismicMediaLink,
    webm_video: PrismicMediaLink,
    video_mobile: PrismicMediaLink,
    webm_video_mobile: PrismicMediaLink,
    video_poster: PrismicImage,
    has_desktop_video: PropTypes.bool,
    has_mobile_video: PropTypes.bool,
    text_color: PropTypes.string,
    quote: PrismicText,
    color_theme: PropTypes.string,
  }),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon_image: PrismicImage,
      item_heading: PrismicText,
      item_body_copy: PrismicText,
    }),
  ),
};

export default SideBySide;
