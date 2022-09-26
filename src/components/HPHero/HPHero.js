import React from 'react';
import PropTypes, {
  RichText as PrismicText, PrismicImage,
} from 'types';
import { RichText } from 'components/Text';
import styled from 'styled-components';
import { Container } from 'components/Layout';
import { Animation } from 'components/Animation';
import { useCta } from 'utils/hooks';
import StyledButton from 'components/Button/StyledButton';
import { VariableMedia } from 'components/VariableMedia';
import { Badge } from 'components/Badge';
import { ThemeBlock } from 'components/ThemeBlock';
import { MQAbove } from 'styles/mediaQueries';

function HPHero({ primary }) {
  const {
    heading,
    subheading,
    color_theme,
    image,
  } = primary;

  const cta = useCta(primary);

  return (
    <ThemeBlock theme={color_theme} paddingTop="0" paddingBottom={['1.75rem', , '3.125rem']}>
      <HeroDiv>
        {image.url && (
        <Animation name="fadeIn">
          <MediaArea>
            <VariableMedia src={primary} imgSrc={image} fluid />
          </MediaArea>
        </Animation>
        )}

        <TextArea $heroWithImage={image.url && true}>
          <Animation name="reveal">
            <RichText as="h1" typeStyle="h1">
              {heading}
            </RichText>
            {subheading && (
              <RichText pt={20} typeStyle="bodyM">
                {subheading}
              </RichText>
            )}
          </Animation>
          {cta && (
            <StyledButton
              data={cta}
              mt="1.25rem"
              center
            />
          )}
        </TextArea>
        <HeroBadge>
          <Badge center large />
        </HeroBadge>
      </HeroDiv>
    </ThemeBlock>
  );
}

const HeroDiv = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: 1fr; 
    grid-template-rows: 1fr; 
    gap: 1.75rem; 
    grid-template-areas: 
    "heroMain"
    "heroBadge";

    ${MQAbove.md`
      grid-template-rows: 1.5fr 8rem;
      gap: 3.125rem;
    `}

    ${MQAbove.xl`
      gap: 0;
    `}
`;

const TextArea = styled(Container)`
    grid-area: heroMain;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    z-index: 1;
    padding-top: ${({ $heroWithImage }) => $heroWithImage ? '9.5rem' : '2.5rem'};

    ${MQAbove.md`
      padding-top: ${({ $heroWithImage }) => $heroWithImage ? '15rem' : '3.5rem'};
    `}

    ${MQAbove.navigation`
      padding-top: ${({ $heroWithImage }) => $heroWithImage ? '6vh' : '4.5rem'};
    `}

    h1 {
      font-weight: 600;
      letter-spacing: 3px;
      margin-top: 3px; // Offset for reveal effect
    }
`;

const MediaArea = styled.div`
    grid-area: heroMain;
    width: clamp(17rem, 48%, 48%);
    margin: 0 auto;
    position: relative;
    max-height: 100%;

    > div {
      height: auto;
    }

   .ResponsiveImage {
      width: auto;
      margin: auto;
      right: 0;

      &:after {
          content: '';
          background: linear-gradient(to bottom right, #5E68A4, #A0ADD0);
          width: 60%;
          height: 80%;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
      }
   }

    img {
        position: relative;
        z-index: 1;
    }
`;

const HeroBadge = styled.div`
  grid-area: heroBadge;
`;

HPHero.propTypes = {
  primary: PropTypes.shape({
    heading: PrismicText,
    subheading: PrismicText,
    image: PrismicImage,
    color_theme: PropTypes.string,
  }),
};

export default HPHero;
