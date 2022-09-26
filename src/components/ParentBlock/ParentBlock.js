import React from 'react';
import { Box, Container } from 'components/Layout';
import PropTypes, { PrismicLink, RichText as PrismicText, PrismicImage } from 'types';
import { SectionHeader } from 'components/SectionHeader';
import { hasText } from 'utils';
import { useCta, useMatchMedia } from 'utils/hooks';
import StyledButton from 'components/Button/StyledButton';
import { lessThan } from 'styles/media';
import styled from 'styled-components';
import { Link } from 'components/Link';
import { RichText } from 'components/Text';

const StyledContainer = styled(Container)`
    padding: 0;
`;

const ParentBlock = ({
  primary,
  columns, // Divides into 2 columns
  reverse, // Reverse the order of the columns
  breakpoint = 'md',
  edgeToEdge, // Edge to edge media
  splitHeading, // Split heading into 2 columns
  basic, // Just a box for background color & image
  alignItems = 'center',
  containerPX,
  minHeight,
  children,
  headerMaxWidth,
  headerMarginBottom,
  headerCenter,
  subheadingLarge,
  paddingTop,
  paddingBottom,
}) => {
  const {
    heading,
    subheading,
    body_copy,
    align_text,
    align_text_mobile,
    link,
    link_label,
  } = primary;

  const cta = useCta(primary);
  const bodyCopy = subheading || body_copy;
  const isMobile = useMatchMedia(lessThan(breakpoint));

  if (basic) {
    return (
      <StyledContainer
        zIndex="1"
        position="relative"
        px={containerPX || ['1.5rem', , '3rem']}
        paddingTop={paddingTop}
        paddingBottom={paddingBottom}
      >
        {children}
      </StyledContainer>
    );
  }

  return (
    <Container
      zIndex="1"
      position="relative"
      paddingX={containerPX}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
    >
      {/* Breakup the layout into two columns if the columns prop is set to true */}
      {columns ? (
        <Box
          gridTemplateColumns={isMobile ? 'minmax(0, 1fr)' : 'repeat(2, minmax(0, 1fr))'}
          gridGap={edgeToEdge ? ['1.25rem', '1.875rem', '10rem', '15rem'] : ['1.25rem', '1.875rem', '5rem']}
          alignItems={alignItems}
          display="grid"
          minHeight={minHeight || null}
        >
          <Box
            width="100%"
            height="100%"
            order={reverse ? '2' : null}
            alignItems={alignItems}
            display="flex"
          >
            {hasText(heading) || hasText(bodyCopy) ? (
              <SectionHeader
                heading={heading}
                subheading={bodyCopy}
                subheadingLarge={subheadingLarge}
                textAlign="left"
                marginBottom="0"
                splitHeading={splitHeading}
                maxWidth={headerMaxWidth}
                center={headerCenter}
                breakpoint={breakpoint}
              >
                {(link && link_label) && (
                <Link
                  doc={link}
                >
                  <RichText typeStyle="bodyL">{link_label}</RichText>
                </Link>
                  )}
                {cta && (
                  <StyledButton
                    data={cta}
                    mt="2rem"
                  />
                  )}
              </SectionHeader>
              ) : null}
          </Box>

          {/* For the edge to edge media on mobile, place it in the layout and adjust
            the box to make it edge to edge */}
          {edgeToEdge && isMobile && (
          <Box
            width="100vw"
            height="100%"
            ml={['-1.5rem',, '-2rem']}
          >
            {children}
          </Box>
            )}

          {/* For edge to edge media on desktop, place and empty box to
            keep the two column layout */}
          {edgeToEdge && !isMobile && (
            <Box />
            )}

          {/* Otherwise place the children in the second column */}
          {!edgeToEdge && (
            <Box
              width="100%"
              height="100%"
              alignItems={alignItems}
              display="flex"
            >
              {children}
            </Box>
            )}
        </Box>
        ) : (
          <>
            {hasText(heading) || hasText(bodyCopy) ? (
              <SectionHeader
                heading={heading}
                subheading={bodyCopy}
                subheadingLarge={subheadingLarge}
                splitHeading={splitHeading}
                textAlign={(isMobile && align_text_mobile ? align_text_mobile : align_text) || (splitHeading ? 'left' : 'center')}
                maxWidth={headerMaxWidth}
                marginBottom={headerMarginBottom}
                center={headerCenter}
                breakpoint={breakpoint}
              >
                {(link && link_label) && (
                  <Link
                    doc={link}
                  >
                    <RichText typeStyle="bodyL">{link_label}</RichText>
                  </Link>
                )}
                {cta && (
                  <StyledButton
                    data={cta}
                    mt="2rem"
                    center={!splitHeading}
                  />
                )}
              </SectionHeader>
            ) : null}
            {children}
          </>
        )}
    </Container>
  );
};

ParentBlock.propTypes = {
  primary: PropTypes.shape({
    heading: PrismicText,
    subheading: PrismicText,
    emphasis_color: PropTypes.string,
    body_copy: PrismicText,
    cta_button_label: PrismicText,
    cta_button_link: PrismicLink,
    background_color: PropTypes.string,
    new_background_color: PropTypes.string,
    background_image: PrismicImage,
    background_position: PropTypes.string,
    background_image_size: PropTypes.string,
    affirm_price: PropTypes.number,
    link: PrismicLink,
    link_label: PrismicText,
    button_type: PropTypes.string,
    align_text: PropTypes.string,
    align_text_mobile: PropTypes.string,
    text_color: PropTypes.string,
    bold_text_color: PropTypes.string,
    other_header_style: PropTypes.bool,
    copy_width: PropTypes.string,
  }),
  children: PropTypes.node,
  columns: PropTypes.bool,
  reverse: PropTypes.bool,
  breakpoint: PropTypes.string,
  edgeToEdge: PropTypes.bool,
  splitHeading: PropTypes.bool,
  basic: PropTypes.bool,
  alignItems: PropTypes.string,
  minHeight: PropTypes.string,
  headerMaxWidth: PropTypes.string,
  headerMarginBottom: PropTypes.string,
  headerCenter: PropTypes.bool,
  subheadingLarge: PropTypes.bool,
  containerPX: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  paddingTop: PropTypes.string,
  paddingBottom: PropTypes.string,
};

export default ParentBlock;
