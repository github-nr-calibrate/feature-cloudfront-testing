import React from 'react';
import PropTypes, { RichText as RichTextType } from 'types';
import { Flex, Box } from 'components/Layout';
import { RichText, Text } from 'components/Text';
import { CardSlider } from 'components/CardSliderSection';
import styled, { useTheme } from 'styled-components';
import { transparentize } from 'polished';

const TimelineSection = ({ primary, items }) => {
  !primary.text_color ? primary.text_color = 'textLight' : null;
  !primary.emphasis_color ? primary.emphasis_color = 'lavender' : null;
  !primary.background_color ? primary.background_color = 'nightshade' : null;
  !primary.cta_color ? primary.cta_color = 'greenLight' : null;
  !primary.heading_color ? primary.heading_color = 'white' : null;

  const {
    background_color,
    emphasis_color,
    text_color,
    cta_color,
  } = primary;

  const theme = useTheme();

  return (
    <CardSlider
      pt="2.25rem"
      indicatorOffset={false}
      itemGap={0}
      bg={background_color}
      py="5rem"
      buttons
      invert
      themeColor
      fadeColor={theme.colors[background_color]}
      primary={primary}
      themeColorOverride={emphasis_color}
      items={items.map(({ date_text, step_title, step_details }, index) => (
        <Flex
          key={`timeline_item_${index}`}
          width="18.75rem"
          height="auto"
          minHeight="100%"
          flexDirection="column"
          position="relative"
          pr="4"
          mb="3"
          color="white"
        >
          <Text typeStyle="bodyM" color={emphasis_color} textTransform="uppercase" fontWeight="600 !important">
            {date_text}
          </Text>
          <Text
            typeStyle="bodyM"
            fontWeight="600 !important"
            mt="0"
            mb="1.125rem"
            color={text_color}
          >
            {step_title}
          </Text>
          <StepDetailsText
            color={text_color}
            typeStyle="bodyM"
            borderLeft="1px solid"
            borderColor={transparentize(0.5, theme.colors[emphasis_color])}
            pb="3.375rem"
            height="100%"
            arrowColor={cta_color}
            arrowBorderColor={background_color}
          >
            {step_details}
          </StepDetailsText>
          <Flex
            position="absolute"
            bottom="0"
            left="0"
            width="100%"
            justifyContent="space-evenly"
            borderRight={index === items.length - 1 ? '1px solid' : 'none'}
            borderColor={transparentize(0.5, theme.colors[emphasis_color])}
          >
            {[...Array(9).keys()].map((timeMarkerIndex) => (
              <Box
                key={`tm_${(index * 8) + timeMarkerIndex}`}
                height={timeMarkerIndex === 4 ? '38px' : '20px'}
                mt={timeMarkerIndex === 4 ? '0' : '18px'}
                bg={transparentize(0.5, theme.colors[emphasis_color])}
                width="1px"
              />
            ))}
          </Flex>
        </Flex>
      ))}
    />
  );
};

// Styles
const StepDetailsText = styled(RichText)`
  p {
    position: relative;
    padding-left: 1.75rem;
    margin-top: 1.375rem;
    ::before {
        content: "";
        display: block;
        box-sizing: border-box;
        position: absolute;
        width: 0;
        height: 12px;
        border-top: 12px solid transparent;
        border-bottom: 12px solid transparent;
        border-left: 14px solid;
        top: 0;
        left: -1px;
        color: ${({ arrowBorderColor }) => `var(--color__${arrowBorderColor})`};
    }
    ::after {
        content: "";
        display: block;
        box-sizing: border-box;
        position: absolute;
        width: 0;
        height: 10px;
        border-top: 7px solid transparent;
        border-bottom: 7px solid transparent;
        border-left: 10px solid;
        top: 5px;
        left: 0;
        color: ${({ arrowColor }) => `var(--color__${arrowColor})`};
    }
    :first-of-type {
      margin-top: 0;
    }
  }
`;

TimelineSection.propTypes = {
  primary: PropTypes.shape({
    heading: RichTextType,
    sub_heading: RichTextType,
    background_color: PropTypes.string,
    emphasis_color: PropTypes.string,
    text_color: PropTypes.string,
    cta_color: PropTypes.string,
    heading_color: PropTypes.string,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    date_text: RichTextType,
    step_title: RichTextType,
    step_details: RichTextType,
  })),
};

export default TimelineSection;
