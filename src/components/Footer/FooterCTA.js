import React from 'react';
import PropTypes, { PrismicLink, RichText as RichTextType, PrismicImage } from 'types';
import {
  Container, Box, Flex,
} from 'components/Layout';
import { AffirmPrice } from 'components/AffirmPrice';
import StyledButton from 'components/Button/StyledButton';
import { SectionHeader } from 'components/SectionHeader';
import ResponsiveImage from 'components/ResponsiveImage';
import { useMatchMedia, useCta } from 'utils/hooks';
import { lessThan } from 'styles/media';
import { ThemeBlock } from 'components/ThemeBlock';
import { Animation } from 'components/Animation';

function FooterCTA({ meta, demo, hasBorderTop }) {
  const {
    footer_cta_body,
    footer_cta_button_link,
    footer_cta_button_label,
    footer_cta_image,
    footer_demo_cta_body,
    footer_demo_cta_button_link,
    footer_demo_cta_button_label,
    affirm_cta_price,
    display_affirm_text_in_footer,
  } = meta;

  const ctaData = {
    cta_label: demo ? footer_demo_cta_button_label : footer_cta_button_label,
    cta_link: demo ? footer_demo_cta_button_link : footer_cta_button_link,
    cta_style: 'inverse',
  };

  const cta = useCta(ctaData);

  const isMobile = useMatchMedia(lessThan('md'));

  return (
    <ThemeBlock paddingTop="0" paddingBottom="0">
      <Box bg="white" position="relative" overflow="hidden" color="textDark" as="section">
        <Container zIndex="1" position="relative">
          <Flex
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            pb={4}
            pt={4}
            borderBottom="1px solid"
            borderTop={hasBorderTop && '1px solid'}
            borderColor="border"
            id="footer-cta"
          >
            <Box flex={['0 0 100%',, '0 0 50%']} pt={!isMobile && 5} pb={!isMobile && 5}>
              <SectionHeader
                heading={demo ? footer_demo_cta_body : footer_cta_body}
                textAlign="center"
                marginBottom="1.25rem"
                typeStyle="h3"
                emphasisColor="lavender"
              >
                {!!affirm_cta_price && display_affirm_text_in_footer && !demo
                && (
                  <AffirmPrice amount={affirm_cta_price} priceStyle="largeText" pt="0" />
                )}
                <StyledButton data={cta} mt={demo ? '0.625rem' : ['1.625rem',, '2.25rem']} center />
              </SectionHeader>
            </Box>
            {footer_cta_image && (
              <Animation name="revealLeft">
                <Box flex={['0 0 100%',, '0 0 40%']}>
                  <ResponsiveImage src={footer_cta_image} ratio={0.66} />
                </Box>
              </Animation>
            )}
          </Flex>
        </Container>
      </Box>
    </ThemeBlock>
  );
}

FooterCTA.propTypes = {
  demo: PropTypes.bool,
  hasBorderTop: PropTypes.bool,
  meta: PropTypes.shape({
    footer_cta_body: RichTextType,
    footer_cta_button_link: PrismicLink,
    footer_cta_button_label: PropTypes.string,
    footer_cta_image: PrismicImage,
    footer_demo_cta_body: RichTextType,
    footer_demo_cta_button_label: PropTypes.string,
    footer_demo_cta_button_link: PrismicLink,
    affirm_cta_price: PropTypes.number,
    display_affirm_text_in_footer: PropTypes.bool,
  }),
};

export default React.memo(FooterCTA);
