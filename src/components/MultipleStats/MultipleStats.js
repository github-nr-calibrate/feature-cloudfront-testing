import React from 'react';
import styled from 'styled-components';
import PropTypes, { RichText as PrismicText, PrismicDoc, PrismicImage } from 'types';
import { MQAbove } from 'styles/mediaQueries';
import { Text, RichText } from 'components/Text';
import { Animation } from 'components/Animation';
import { Stat } from 'components/Stat';
import { ParentBlock } from 'components/ParentBlock';

const Disclaimer = styled.div`
    text-align: center;
    max-width: 60rem;
    margin: 1rem auto 0 auto;
    color ${({ textColor }) => textColor ? `var(--color__${textColor})` : 'black'};
`;

const StatsArea = styled.div`
    display: grid; 
    grid-template-columns: repeat(auto-fit, minmax(156px, 1fr));
    gap: 15px; 

    &.StatsArea--2 {
      grid-template-columns: repeat(2, 1fr);
    }

    &.StatsArea--3 {
      grid-template-columns: 1fr;
    
      ${MQAbove.xs`
          grid-template-columns: repeat(3, 1fr);
      `}
    }

    &.StatsArea--4 {
      grid-template-columns: repeat(2, 1fr);
    
      ${MQAbove.xs`
          grid-template-columns: repeat(2, 1fr);
      `}

      ${MQAbove.md`
          grid-template-columns: repeat(4, 1fr);
      `}
    }
`;

const StatItem = styled.div`
    text-align: center;
    max-width: 17rem;
    margin: 0 auto;

    p {
      color ${({ textColor }) => textColor ? `var(--color__${textColor})` : 'black'};
    }
`;

const StatHeadline = styled.div`
    padding: 5px 8px;
    text-align: center;
    color: white;
    width: 100%;

    ${MQAbove.md`
        padding: 10px 15px;
    `}
    
    p {
        font-weight: 600;
        line-height: 1;
    }
`;

function MultipleStats({ items, primary }) {
  const {
    text_color,
    disclaimer,
  } = primary;

  return (
    <ParentBlock
      primary={primary}
    >
      <StatsArea className={`StatsArea--${items.length}`}>
        {items.map(({
          stat_text, stat, stat_prefix, stat_suffix,
        }, index) => (
          <Animation name="fadeIn">
            <StatItem
              className={`StatItem StatItem${index + 1}`}
              key={`StatItem${index}`}
              textColor={text_color}
            >
              <Stat
                number={stat}
                prefix={stat_prefix}
                suffix={stat_suffix}
                large={items.length <= 2}
              />
              <StatHeadline>
                <Text typeStyle="bodyM">{stat_text}</Text>
              </StatHeadline>
            </StatItem>
          </Animation>
        ))}
      </StatsArea>
      {disclaimer && (
        <Disclaimer textColor={text_color}>
          <RichText typeStyle="bodyS">
            {disclaimer}
          </RichText>
        </Disclaimer>
      )}
    </ParentBlock>
  );
}

MultipleStats.propTypes = {
  primary: PropTypes.shape({
    emphasis_color: PropTypes.string,
    text_color: PropTypes.string,
    background_color: PropTypes.string,
    background_image: PrismicImage,
    background_position: PropTypes.string,
    background_image_size: PropTypes.string,
    heading: PrismicText,
    subheading: PrismicText,
    cta_text: PropTypes.string,
    cta_color: PropTypes.string,
    cta_url: PrismicDoc,
    disclaimer: PrismicText,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    stat_text: PropTypes.string,
    stat: PropTypes.integer,
    stat_prefix: PropTypes.string,
    stat_suffix: PropTypes.string,
  })),
};

export default MultipleStats;
