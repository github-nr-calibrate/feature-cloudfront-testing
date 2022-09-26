import React from 'react';
import PropTypes, { PrismicImage, RichText as PrismicText } from 'types';
import { Box, Flex } from 'components/Layout';
import { parseDDColor } from 'client/prismic';
import { useMatchMedia, useCta } from 'utils/hooks';
import { RichText } from 'components/Text';
import styled, { useTheme } from 'styled-components';
import StyledButton from 'components/Button/StyledButton';
import ResponsiveImage from 'components/ResponsiveImage';
import Price from './Price';

const PDP = ({ primary }) => {
  const {
    background_color,
    background_image,
    body_copy,
    bold_text_color,
    copy_width,
    heading,
    is_full_width,
    is_parent_on_right,
    text_color,
  } = primary;

  const cta = useCta(primary);
  const theme = useTheme();
  const isIPadPro = useMatchMedia('(max-width: 64rem)');
  const hasBodyCopy = !!body_copy?.length && !!body_copy[0].text.length;
  const hasHeading = !!heading?.length && !!heading[0].text.length;
  const legitImage = (
    <a
      href="https://www.legitscript.com/websites/?checker_keywords=joincalibrate.com"
      target="_blank"
      rel="noopener noreferrer"
      title="Verify LegitScript Approval"
    >
      <img
        src="https://static.legitscript.com/seals/6468398.png"
        width="100%"
        height="100%"
        alt="LegitScript approved"
        border="0"
      />
    </a>
  );
  const desktopWidth = is_full_width ? '70%' : '50%';
  return (
    <Flex
      position="relative"
      overflow="hidden"
      flexDirection={['column', 'column', is_parent_on_right ? 'row-reverse' : 'row']}
      bg={parseDDColor(background_color)}
    >
      {is_full_width && (
        <Box
          width="100%"
          height="100%"
          position="absolute"
        >
          <ResponsiveImage src={background_image} />
        </Box>
      )}
      <Box
        width={['100%', '80%', isIPadPro ? '80%' : desktopWidth]}
        position="relative"
      >
        <StyledBox
          pt={[4, '5rem']}
          pb={[is_full_width ? '3rem' : 0, 4]}
          px={['1.5rem', '3rem', '2rem']}
          color={parseDDColor(text_color)}
          strongColor={theme.colors[parseDDColor(bold_text_color)]}
        >
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="left"
            textAlign="left"
          >
            {hasHeading && (
              <RichText
                as="h1"
                typeStyle="hero"
                width={['100%', copy_width]}
                pb={[3, 4]}
              >
                {heading}
              </RichText>
            )}
            {hasBodyCopy && (
              <RichText
                typeStyle="bodyL"
                lineHeight="none"
                width={['100%', copy_width]}
                pb={['1.5rem', 4]}
              >
                {body_copy}
              </RichText>
            )}
            <Price primary={primary} />
            {cta && (
            <StyledButton
              data={cta}
              mb={4}
            />
            )}
          </Flex>
        </StyledBox>
      </Box>
      {is_full_width ? (
        <Flex
          alignItems="end"
          justifyContent={['center', 'right', 'right']}
          position="relative"
          width={['100%', '100%', '30%']}
          mt={['-3rem', '-8.5rem', 0]}
          pb={[4, '3rem']}
          pr={[0, 5]}
        >
          <Box
            width={['105px', '140px']}
            height={['75px', '100px']}
          >
            {legitImage}
          </Box>
        </Flex>
      )
        : (
          <Box
            position="relative"
            width={['100%', '100%', '50%']}
          >
            {background_image?.url && (
              <ResponsiveImage src={background_image} ratio={['4:3', '16:9', 0]} />
            )}
            <Box
              position="absolute"
              bottom={['1rem', '2rem', '3rem']}
              right={['1rem', '2rem', '4rem']}
              width={['105px', '140px']}
              height={['75px', '100px']}
            >
              {legitImage}
            </Box>
          </Box>
        )}
    </Flex>
  );
};

const StyledBox = styled(Box)`
  strong {
    color: color: ${({ strongColor }) => strongColor ? parseDDColor(strongColor) : 'black'};
  }
`;

PDP.propTypes = {
  primary: PropTypes.shape({
    background_color: PropTypes.string,
    background_image: PrismicImage,
    body_copy: PrismicText,
    bold_text_color: PropTypes.string,
    button_type: PropTypes.string,
    copy_width: PropTypes.string,
    heading: PrismicText,
    is_full_width: PropTypes.bool,
    is_image: PropTypes.bool,
    is_parent_on_right: PropTypes.bool,
    text_color: PropTypes.string,
  }),
};

export default PDP;
