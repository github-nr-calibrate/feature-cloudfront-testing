import React, { useState } from 'react';
import PropTypes from 'types';
import { Box } from 'components/Layout';
import styled, { useTheme, css } from 'styled-components';
import { deProp } from 'utils';
import { MQAbove } from 'styles/mediaQueries';
import { Animation } from 'components/Animation';
import VisibilitySensor from 'react-visibility-sensor';
import { Text } from 'components/Text';

const BarChartSection = styled.div.withConfig({
  shouldForwardProp: deProp(['barChartLayout']),
})`
  display: flex;
  flex-basis: 100%;

  ${({ barChartLayout }) => barChartLayout === 'horizontal' && css`
    justify-content: center;
    column-gap: 1rem;

    ${MQAbove.md`
      padding-top: 2rem;
    `}
  `}

  ${({ barChartLayout }) => barChartLayout === 'vertical' && css`
    ${MQAbove.md`
      flex-direction: column;

      & > div:first-child {
        & > div {
          padding-top: 1.5rem;
        }
      }

      & > div:last-child {
        & > div {
          padding-bottom: 1.5rem;
        }
      }
    `}
  `}
`;

const BarChartWrapper = styled.div.withConfig({
  shouldForwardProp: deProp(['barChartLayout']),
})`
  display: flex;
  flex-direction: column;
  flex: 1;

  ${({ barChartLayout }) => barChartLayout === 'vertical' && css`  
    ${MQAbove.md`
      display: grid;
      grid-template-columns: minmax(140px, 2fr) 5fr;
    `}
  `}
`;

const AxisCaption = styled.div.withConfig({
  shouldForwardProp: deProp(['textColor', 'barChartLayout']),
})`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-top: ${({ barChartLayout }) => barChartLayout === 'vertical' && 'var(--border__nightshade)'};
  color: inherit;
  padding-top: ${({ barChartLayout }) => barChartLayout === 'vertical' ? '0.5rem' : '1rem'};
  padding-left: ${({ barChartLayout }) => barChartLayout === 'vertical' ? '1rem' : '0'};
  padding-bottom: 0.5rem;
  padding-right: ${({ barChartLayout }) => barChartLayout === 'vertical' ? '1rem' : '0'};
  font-weight: 500;
  order: 2;

  ${({ barChartLayout }) => barChartLayout === 'vertical' && css`  
    ${MQAbove.md`
      order: 1;
      border-top: unset;
      border-right: var(--border__nightshade);
      padding: 0.5rem 1rem 0.5rem 0;
    `}
  `}
`;

const BarWrapper = styled.div.withConfig({
  shouldForwardProp: deProp(['barChartLayout']),
})`
  width: 100%;
  order: 1;
  height: ${({ barChartLayout }) => barChartLayout === 'vertical' ? '11rem' : '18rem' };
  display: flex;
  align-items: end;
  justify-content: center;

  ${({ barChartLayout }) => barChartLayout === 'vertical' && css`  
    ${MQAbove.md`
      display: unset;
      height: unset;
      order: 2;
      max-width: 16rem;
      padding: 0.5rem 0;
    `}
  `}
`;

const Bar = styled(Box).withConfig({
  shouldForwardProp: deProp(['barFill', 'barChartLayout']),
})`
  position: relative;
  height: ${({ barFill }) => barFill}%;
  width: 100%;

  ${({ barChartLayout }) => barChartLayout === 'horizontal' && css`  
    width: 100%;
    max-width: 11rem;
  `}

  ${({ barChartLayout }) => barChartLayout === 'vertical' && css`  
    ${MQAbove.md`
      height: unset;
      width: ${({ barFill }) => barFill}%;
    `}
  `}
`;

const LineCaption = styled.div.withConfig({
  shouldForwardProp: deProp(['textColor', 'chartVisible', 'aboveBar']),
})`
  position: absolute;
  width: 100%;
  height: ${({ aboveBar }) => aboveBar ? 'auto' : '100%'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 0.5rem;
  z-index: 1;
  color: ${({ textColor }) => textColor};
  transition: opacity 0.45s ease-out 0.55s;
  opacity: ${({ chartVisible }) => chartVisible ? 1 : 0};

  ${({ aboveBar, barChartLayout }) => aboveBar && barChartLayout === 'horizontal' && css`  
    top: -3.5rem;
  `}

  ${({ aboveBar, barChartLayout }) => aboveBar && barChartLayout === 'vertical' && css`
    top: -3.5rem;

    ${MQAbove.md` 
      width: 12.5rem;
      height: 100%;
      left: 100%;
      top: auto;
    `}
  `}

  ${MQAbove.md`
    transition-delay: 0.65s;
  `}
`;

const Line = styled(Box).withConfig({
  shouldForwardProp: deProp(['lineColor', 'chartVisible', 'barChartLayout']),
})`
  background: ${({ lineColor }) => lineColor};
  width: 100%;
  height: 100%;
  will-change: transform;
  transition: transform 0.55s ease-out;
  transform-origin: bottom center;
  transform: scaleY(${({ chartVisible }) => chartVisible ? 1 : 0});

  ${({ barChartLayout }) => barChartLayout === 'vertical' && css`  
    ${MQAbove.md`
      width: 100%;
      height: 152px;
      transition: transform 0.65s ease-out;
      transform-origin: left center;
      transform: scaleX(${({ chartVisible }) => chartVisible ? 1 : 0});
    `}
  `}

  ${({ barChartLayout }) => barChartLayout === 'horizontal' && css`  
    ${MQAbove.md`
      width: 100%;
    `}
  `}
`;

function BarChart({ chart, layout, index }) {
  const {
    value,
    value_label,
    heading,
    bar_fill,
  } = chart;

  const theme = useTheme();
  const [chartVisible, setVisible] = useState(false);
  const barFillMinimum = 10;

  const barColors = [
    theme.colors.darkBlue,
    theme.colors.dustyBlue,
    theme.colors.lavenderLight,
    theme.colors.lightGrey,
  ];
  const barTextColors = [
    bar_fill <= barFillMinimum ? theme.colors.nightshade : theme.colors.white,
    bar_fill <= barFillMinimum ? theme.colors.white : theme.colors.nightshade,
    bar_fill <= barFillMinimum ? theme.colors.white : theme.colors.nightshade,
    bar_fill <= barFillMinimum ? theme.colors.white : theme.colors.nightshade,
  ];

  return (
    <VisibilitySensor partialVisibility onChange={isVisible => setVisible(isVisible)}>
      <BarChartSection barChartLayout={layout}>
        <BarChartWrapper barChartLayout={layout}>
          <AxisCaption barChartLayout={layout}>
            <Animation name="fadeInBasic">
              <Box>
                {heading}
              </Box>
            </Animation>
          </AxisCaption>
          <BarWrapper barChartLayout={layout}>
            <Bar barFill={bar_fill} barChartLayout={layout}>
              <LineCaption
                chartVisible={chartVisible}
                aboveBar={bar_fill <= barFillMinimum}
                textColor={barTextColors[index]}
                barChartLayout={layout}
              >
                <Text typeStyle={layout === 'horizontal' ? 'h3_sm_barChart' : 'h3_barChart'}>
                  {value}
                </Text>
                <Text
                  typeStyle="bodyM"
                  textTransform="uppercase"
                  mt="1"
                  fontWeight="600 !important"
                >
                  {value_label}
                </Text>
              </LineCaption>
              <Line
                lineColor={barColors[index]}
                chartVisible={chartVisible}
                barChartLayout={layout}
              />
            </Bar>
          </BarWrapper>
        </BarChartWrapper>
      </BarChartSection>
    </VisibilitySensor>
  );
}

BarChart.propTypes = {
  chart: PropTypes.shape({
    value: PropTypes.string,
    value_label: PropTypes.string,
    heading: PropTypes.string,
    bar_fill: PropTypes.number,
  }),
  layout: PropTypes.string,
  index: PropTypes.number,
};

export default BarChart;
