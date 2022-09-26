import React from 'react';
import PropTypes, { RichText as PrismicText, PrismicDoc } from 'types';
import {
  Box, Container, Flex,
} from 'components/Layout';
import styled, { useTheme, css } from 'styled-components';
import { hasText, deProp } from 'utils';
import { MQAbove } from 'styles/mediaQueries';
import { Text } from 'components/Text';
import { Animation } from 'components/Animation';
import { SectionHeader } from 'components/SectionHeader';
import { useCta, useMatchMedia } from 'utils/hooks';
import { lessThan } from 'styles/media';
import StyledButton from 'components/Button/StyledButton';
import { BarChart } from 'components/BarChartSection';
import { ThemeBlock } from 'components/ThemeBlock';

function BarChartSection({ primary, items }) {
  const {
    color_theme,
    heading,
    subheading,
    heading_centered,
    bar_chart_heading,
    bar_chart_subheading,
    bar_chart_heading_centered,
    section_caption,
    layout,
  } = primary;

  const isMobile = useMatchMedia(lessThan('md'));
  const cta = useCta(primary);
  const theme = useTheme();

  return (
    <ThemeBlock theme={color_theme}>
      <Container>
        <Box paddingBottom={['3.5rem',, '4.5rem']}>
          <Animation name="fadeIn">
            <Header centeredContent={heading_centered}>
              {hasText(heading) && (
              <Box>
                <SectionHeader
                  heading={heading}
                  textAlign={isMobile || heading_centered ? 'center' : 'left'}
                  marginBottom={(isMobile && hasText(subheading)) || (heading_centered && hasText(subheading)) ? '1rem' : '0'}
                  maxWidth={heading_centered && '50rem'}
                />
              </Box>
              )}
              {hasText(subheading) && (
              <Box>
                <SectionHeader
                  subheading={subheading}
                  textAlign={isMobile || heading_centered ? 'center' : 'left'}
                  marginBottom="0"
                  maxWidth={heading_centered && '50rem'}
                >
                  {cta && (
                  <StyledButton
                    data={cta}
                    mt="2rem"
                    center={heading_centered}
                  />
                  )}
                </SectionHeader>
              </Box>
              )}
            </Header>
          </Animation>
        </Box>
        <FlexSection borderColor={theme.mode[color_theme].borderColor}>
          <ChartBox flex={['0 0 100%', , '0 0 50%']} layout={layout}>
            {items.map((item, index) => (
              <BarChart index={index} key={`chart${index}`} chart={item} layout={layout} />
            ))}
          </ChartBox>
          <TextBox
            flex={['0 0 100%',, '0 0 50%']}
            centeredContent={bar_chart_heading_centered}
            borderColor={theme.mode[color_theme].borderColor}
          >
            <IconBox>
              {IconArrow(
                theme.mode[color_theme].backgroundColor,
                theme.mode[color_theme].borderColor,
              )}
            </IconBox>
            <Animation name="fadeIn">
              <Box>
                <SectionHeader
                  heading={bar_chart_heading}
                  textAlign={isMobile || bar_chart_heading_centered ? 'center' : 'left'}
                  typeStyle={bar_chart_heading_centered ? 'h4' : 'h2_barChart'}
                  marginBottom={isMobile ? '0.5rem' : '1rem'}
                />
                <Text
                  typeStyle={bar_chart_heading_centered ? 'p3' : 'p2'}
                  textAlign={isMobile || bar_chart_heading_centered ? 'center' : 'left'}
                  fontWeight={!bar_chart_heading_centered && '500 !important'}
                >
                  {bar_chart_subheading}
                </Text>
              </Box>
            </Animation>
          </TextBox>
        </FlexSection>
        {hasText(section_caption) && (
        <Flex justifyContent="center" pt={['1.5rem',, '3.5rem']}>
          <Text typeStyle="bodyS" textAlign="center" maxWidth="56rem" color={theme.colors.textMediumLight}>
            {section_caption}
          </Text>
        </Flex>
        )}
      </Container>
    </ThemeBlock>
  );
}

const Header = styled.div.withConfig({
  shouldForwardProp: deProp(['centeredContent']),
})`
  display: grid;

  ${({ centeredContent }) => centeredContent && css`
    text-align: center;
  `}

  ${MQAbove.md`
    ${({ centeredContent }) => !centeredContent && css`
      grid-template-columns: 7fr 5fr;
      grid-column-gap: 7.5rem;
    `}
  `}
`;

const FlexSection = styled(Flex).withConfig({
  shouldForwardProp: deProp(['borderColor']),
})`
  flex-direction: column;

  ${MQAbove.md`
    flex-direction: row;
    border-top: 1px solid ${({ borderColor }) => borderColor};
  `}
`;

const ChartBox = styled(Flex)`
  padding: 3rem 0 0;
  order: 2;
  overflow-x: auto;
  justify-content: flex-start;
  gap: 15px;
  flex-direction: row;

  ${MQAbove.md`
    padding: 3rem 2rem 2rem;
    order: 1;
    justify-content: space-around;
    gap: ${({ layout }) => layout === 'vertical' ? '0' : '15px'};
    flex-direction: ${({ layout }) => layout === 'vertical' ? 'column' : 'row'};
  `}

  ${MQAbove.lg`
    padding: 4.5rem 2.5rem 2.5rem;
  `}
`;

const TextBox = styled(Flex).withConfig({
  shouldForwardProp: deProp(['centeredContent', 'borderColor']),
})`
  padding: 0 0 3rem;
  position: relative;
  order: 1;
  border-bottom: 1px solid ${({ borderColor }) => borderColor};
  justify-content: center;
  align-items: center;
  text-align: center;

  ${MQAbove.md`
    order: 2;
    padding: ${({ centeredContent }) => centeredContent ? '4rem 2rem 4rem 3rem' : '4rem'};
    border-bottom: unset;
    border-left: 1px solid ${({ borderColor }) => borderColor};
    justify-content: flex-start;
    text-align: left;
  `}

  ${MQAbove.lg`
    padding: ${({ centeredContent }) => centeredContent ? '7.5rem 2.5rem 7.5rem 3.5rem' : '7.5rem'};
  `}
`;

const IconBox = styled.div`
  position: absolute;
  height: 46px;
  bottom: -17px;
  left: calc(50% - 13px);

  svg {
    height: 100%;
    transform: rotate(-90deg);
  }

  ${MQAbove.md`
    left: -2px;
    top: calc(50% - 23px);
    bottom: unset;

    svg {
      transform: rotate(0);
    }
  `}
`;

const IconArrow = (backgroundColor, borderColor) => {
  const svgIcon = (
    <svg svg width="17" height="43" viewBox="0 0 17 43" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 20.7433L1 1V42.1352L16 20.7433Z" fill={backgroundColor} />
      <path d="M1 1L16 20.7433L1 42.1352" stroke={borderColor} />
    </svg>
  );

  return svgIcon;
};

BarChartSection.propTypes = {
  primary: PropTypes.shape({
    color_theme: PropTypes.string,
    heading: PrismicText,
    subheading: PrismicText,
    heading_centered: PropTypes.boolean,
    cta_label: PropTypes.string,
    cta_url: PrismicDoc,
    bar_chart_heading: PrismicText,
    bar_chart_subheading: PrismicText,
    bar_chart_heading_centered: PropTypes.boolean,
    section_caption: PrismicText,
    layout: PropTypes.string,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    value_label: PropTypes.string,
    heading: PropTypes.string,
    bar_fill: PropTypes.number,
  })),
};

export default BarChartSection;
