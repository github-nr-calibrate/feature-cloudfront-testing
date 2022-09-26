import React from 'react';
import styled, { css } from 'styled-components';
import {
  Container, Box, Flex,
} from 'components/Layout';
import PropTypes, { RichText as PrismicText, PrismicImage, PrismicDoc } from 'types';
import { MQAbove, MQBelow } from 'styles/mediaQueries';
import { SectionHeader } from 'components/SectionHeader';
import { Text } from 'components/Text';
import { Animation } from 'components/Animation';
import { Stat } from 'components/Stat';
import ResponsiveImage from 'components/ResponsiveImage';
import { hasText } from 'utils';
import { useCta } from 'utils/hooks';
import StyledButton from 'components/Button/StyledButton';
import { ThemeBlock } from 'components/ThemeBlock';

const StatsGridSection = styled(Box)`
  border-top: 1px solid var(--border-color);
  &:first-of-type {
    border-top: none;
  }
  &:last-of-type {
    border-top: 1px solid var(--border-color);

    ${MQAbove.lg`
      border-bottom: 1px solid var(--border-color);
    `}
  }
`;

const StatsGridContainer = styled(Container)`
  && {
    ${MQBelow.lg`
      padding-left: 0;
      padding-right: 0;
    `}
  }
`;

const PrimaryImage = styled.div`
  position: relative;
`;

const Caption = styled(Box)`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  padding: 1rem 1.5rem;
  background: linear-gradient(180deg, rgba(33, 30, 63, 0) 68.75%, rgba(33, 30, 63, 0.46) 100%);
  color: white;
  display: flex;
  align-items: end;
  justify-content: end;
`;

const StatItems = styled.div`
  display: grid;
  grid-template-columns: ${({ $fourColumns }) => $fourColumns ? 'repeat(auto-fit, minmax(50%, 1fr))' : '1fr'};
  position: relative;

  ${MQBelow.lg`
    text-align: ${({ $fourColumns }) => $fourColumns ? 'left' : 'center'};
  `}
  
  ${MQAbove.lg`
    border-left: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
  `}
  
  ${MQAbove.lg`
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    & > div:not(:first-child) {
      border-left: 1px solid var(--border-color);
    }
  `}
`;

const StatItemInner = styled.div`
  padding: 1.5rem;

  ${MQAbove.xl`
    padding: 1.5rem 3rem;
  `}

  ${({ $fourColumns }) => !$fourColumns && css`
      margin: 0 1.5rem;

      ${MQAbove.lg`
        padding: 1.5rem 3.5rem 2rem;
      `}

      ${MQBelow.lg`
        padding: 2.5rem 4rem;
        border-left: 1px solid var(--border-color);
        border-right: 1px solid var(--border-color);
      `}
  `}
`;

const StatItemBox = styled(Flex)`
  ${MQBelow.lg`
    align-items: ${({ $fourColumns }) => $fourColumns ? 'flex-start' : 'center'};
  `}
`;

const StatItem = styled.div`
  ${MQBelow.lg`
    border-bottom: 1px solid var(--border-color);
  `}


 ${({ $fourColumns }) => !$fourColumns && css`
    ${MQBelow.md`
      border-right: 1px solid var(--border-color);
      border-left: 1px solid var(--border-color);
    `}
  `}

  ${({ $fourColumns }) => $fourColumns && css`
    ${MQBelow.lg`
      &:nth-child(2n) {
        border-left: 1px solid var(--border-color);
      }
    `}
  `}
`;

const StatIconBox = styled.div`
    margin-bottom: var(--spacing__sm);
    & > img {
      width: 32px;
    }
    ${MQAbove.md`
      & > img {
        width: 40px;
      }
    `}
`;

const StatNumberBox = styled.div`
    margin-bottom: var(--spacing__xs);

    ${({ $fourColumns }) => !$fourColumns && css`
      p {
        font-size: 5rem;
      }
    `}
`;

const StatHeadline = styled.div`  
    p {
      text-transform: uppercase;
      font-weight: 600;
      line-height: 1.1rem;
    }

    &.theme--dark {
      color: #BDBADE;
    }
    
    &.theme--light,
    &.theme--grey {
      color: var(--color__dustyPurple);
    }
`;

function StatsGrid({ items, primary }) {
  const {
    heading,
    subheading,
    image,
    image_caption,
    color_theme,
  } = primary;

  const cta = useCta(primary);
  const isDivisibleByFour = items.length % 4 === 0;

  return (
    <ThemeBlock theme={color_theme}>
      {hasText(heading) && (
      <StatsGridSection paddingBottom={['var(--spacing__md)', 'var(--spacing__lg)', 'var(--spacing__xl)']}>
        <Container>
          {(hasText(heading) || hasText(subheading)) && (
            <SectionHeader
              heading={heading}
              subheading={subheading}
              textAlign={image.url ? 'left' : 'center'}
              textColor="white"
              splitHeading={image.url && true}
              marginBottom="0"
            >
              {cta && (
                <StyledButton
                  data={cta}
                  mt="2rem"
                />
              )}
            </SectionHeader>
         )}
        </Container>
      </StatsGridSection>
      )}
      {image?.url && (
      <StatsGridSection paddingTop={hasText(heading) && 'var(--spacing__sm)'} paddingBottom="var(--spacing__sm)">
        <Container>
          <Box>
            <Animation name="fadeIn">
              {image.url && (
                <PrimaryImage>
                  {image?.url && (
                  <ResponsiveImage src={image} ratio={[0.73, 0.48, 0.48]} />
                )}
                  {image_caption && (
                  <Caption>
                    <Text typeStyle="bodyM">{image_caption}</Text>
                  </Caption>
                )}
                </PrimaryImage>
              )}
            </Animation>
          </Box>
        </Container>
      </StatsGridSection>
      )}
      {items.length > 0 && (
      <StatsGridSection>
        <StatsGridContainer>
          <StatItems $fourColumns={isDivisibleByFour}>
            {items.map(({
              image, headline, stat, stat_prefix, stat_suffix,
            }, index) => (
              <StatItem className={`StatItem StatItem${index + 1}`} key={`StatItem${index}`} $fourColumns={isDivisibleByFour}>
                <StatItemInner $fourColumns={isDivisibleByFour}>
                  <Animation name="fadeIn">
                    <StatItemBox flexDirection="column" $fourColumns={isDivisibleByFour}>
                      <StatIconBox $fourColumns={isDivisibleByFour}>
                        {image?.url && (<img src={image.url} alt={image.alt ? image.alt : ''} className="lazyload" />)}
                      </StatIconBox>
                      <StatNumberBox $fourColumns={isDivisibleByFour}>
                        <Stat
                          number={stat}
                          prefix={stat_prefix}
                          suffix={stat_suffix}
                        />
                      </StatNumberBox>
                      <StatHeadline className={`theme--${color_theme}`}>
                        <Text typeStyle="labelsS">{headline}</Text>
                      </StatHeadline>
                    </StatItemBox>
                  </Animation>
                </StatItemInner>
              </StatItem>
            ))}
          </StatItems>
        </StatsGridContainer>
      </StatsGridSection>
      )}
    </ThemeBlock>
  );
}

StatsGrid.propTypes = {
  primary: PropTypes.shape({
    emphasis_color: PropTypes.string,
    text_color: PropTypes.string,
    background_color: PropTypes.string,
    background_image: PrismicImage,
    background_position: PropTypes.string,
    background_image_size: PropTypes.string,
    heading: PrismicText,
    subheading: PrismicText,
    image: PrismicImage,
    image_caption: PrismicText,
    cta_text: PropTypes.string,
    cta_color: PropTypes.string,
    cta_url: PrismicDoc,
    disclaimer: PrismicText,
    color_theme: PropTypes.string,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    image: PrismicImage,
    headline: PropTypes.string,
    background_color: PropTypes.string,
    stat: PropTypes.number,
    stat_prefix: PropTypes.string,
    stat_suffix: PropTypes.string,
  })),
};

export default StatsGrid;
