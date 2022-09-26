import React from 'react';
import { Box, Flex, Container } from 'components/Layout';
import PropTypes, { PrismicLink, RichText as PrismicText, PrismicImage } from 'types';
import { RichText } from 'components/Text';
import { parseDDColor } from 'client/prismic';
import { Link } from 'components/Link';
import styled, { useTheme } from 'styled-components';
import StyledButton from 'components/Button/StyledButton';
import BackgroundImage from 'components/Layout/BackgroundImage';
import { AffirmPrice } from 'components/AffirmPrice';
import { useCta } from 'utils/hooks';

export const alignNormalization = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'center',
};

// This is Component with boiler plate code, like heading,
// body copy, cta, bg, color, paddings and etc.

const ParentBlock = ({
  primary, minHeight, mobileAlign = 'left', Component,
}) => {
  const {
    heading,
    body_copy,
    text_color,
    bold_text_color,
    background_color,
    affirm_price,
    link,
    link_label,
    align_text,
    align_text_mobile,
    padding_top,
    padding_bottom,
    other_header_style,
    copy_width = '60%',
    background_image,
    background_position,
    background_image_size,
  } = primary;

  const cta = useCta(primary);
  const theme = useTheme();
  const hasBodyCopy = !!body_copy?.length && !!body_copy[0].text.length;
  const hasHeading = !!heading?.length && !!heading[0].text.length;
  const headerStyle = other_header_style ? 'p1' : 'h2';

  return (
    <StyledBox
      pt={[5, padding_top]}
      pb={[4, padding_bottom || 4]}
      px={['1.5rem',, '5rem']}
      bg={parseDDColor(background_color)}
      color={parseDDColor(text_color)}
      strongColor={theme.colors[parseDDColor(bold_text_color)]}
      position="relative"
      minHeight={minHeight}
      height={minHeight && '100%'}
    >
      {background_image?.url && (
      <BackgroundImage
        src={background_image.url}
        bgPosition={background_position}
        bgSize={background_image_size}
      />
      )}
      <Container zIndex="1" position="relative" height={minHeight && 'inherit'}>
        <Flex
          height={minHeight && 'inherit'}
          flexDirection="column"
          justifyContent="center"
          alignItems={[align_text_mobile || mobileAlign,, alignNormalization[align_text]]}
          textAlign={[align_text_mobile || mobileAlign,, align_text === 'center' ? align_text : 'left']}
        >
          {hasHeading && (
          <RichText as={headerStyle} typeStyle={headerStyle} pb={4}>
            {heading}
          </RichText>
          )}
          {hasBodyCopy && (
          <RichText
            typeStyle="bodyL"
            lineHeight="none"
            width={['100%', copy_width]}
            pb={4}
          >
            {body_copy}
          </RichText>
          )}
          {!!Component && Component}
          {!!link && !!link_label.length && (
          <Box pb={4}>
            <Link
              doc={link}
              style={{ textDecoration: 'underline', fontSize: '20px' }}
            >
              <RichText>{link_label}</RichText>
            </Link>
          </Box>
          )}
          {cta && (
          <StyledButton
            data={cta}
            mb="1.875rem"
          />
          )}
          {!!affirm_price && (
            <AffirmPrice amount={affirm_price} pb={4} />
          )}
        </Flex>
      </Container>
    </StyledBox>
  );
};

const StyledBox = styled(Box)`
  position: relative;
  strong {
    color: color: ${({ strongColor }) => strongColor ? parseDDColor(strongColor) : 'black'};
  }
`;

ParentBlock.propTypes = {
  primary: PropTypes.shape({
    heading: PrismicText,
    body_copy: PrismicText,
    cta_button_label: PrismicText,
    cta_button_link: PrismicLink,
    background_color: PropTypes.string,
    background_image: PrismicImage,
    background_position: PropTypes.string,
    background_image_size: PropTypes.string,
    affirm_price: PropTypes.number,
    link: PrismicLink,
    link_label: PrismicText,
    button_type: PropTypes.string,
    align_text: PropTypes.string,
    align_text_mobile: PropTypes.string,
    padding_top: PropTypes.string,
    padding_bottom: PropTypes.string,
    text_color: PropTypes.string,
    bold_text_color: PropTypes.string,
    other_header_style: PropTypes.bool,
    copy_width: PropTypes.string,
  }),
  Component: PropTypes.object,
  mobileAlign: PropTypes.string,
  minHeight: PropTypes.array,
};

export default ParentBlock;
