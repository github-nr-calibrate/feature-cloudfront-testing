import React from 'react';
import PropTypes, { RichText as PrismicText, PrismicImage } from 'types';
import { ThemeBlock } from 'components/ThemeBlock';
import { SectionHeader } from 'components/SectionHeader';
import styled from 'styled-components';
import { VariableMedia } from 'components/VariableMedia';
import { MQAbove } from 'styles/mediaQueries';
import { Container } from 'components/Layout';
import { RichText } from 'components/Text';
import { Animation } from 'components/Animation';

function ExpandablePoints({ primary, items }) {
    const {
        heading,
        subheading,
        color_theme = 'dark',
    } = primary;

    return (
      <ThemeBlock theme={color_theme} paddingBottom={['3.5rem', '4.5rem', '6.5rem']}>
        <Intro>
          <SectionHeader
            heading={heading}
            subheading={subheading}
            marginBottom="0"
          />
        </Intro>
        <Sections>
          {items.map(({ heading, description, icon }, index) => (
            <article key={`AlternatingImage_${index}`} index={index}>
              <SectionInner maxWidth="77rem">
                <Animation name="revealLeft">
                  <div>
                    <VariableMedia src={primary} imgSrc={icon} ratio={1} />
                  </div>
                </Animation>
                <Animation name="fadeIn">
                  <TextArea>
                    <RichText typeStyle="h3" textAlign="left">{heading}</RichText>
                    <Description typeStyle="bodyL" textAlign="left">{description}</Description>
                  </TextArea>
                </Animation>
              </SectionInner>
            </article>
        ))}
        </Sections>
      </ThemeBlock>
    );
}

const Intro = styled.div`
  padding: 0 1.5rem var(--spacing__md);

  ${MQAbove.md`
    padding: 0 3rem var(--spacing__xl);
  `}
`;

const SectionInner = styled(Container)`
    display: grid;
    align-items: center;
    border-left: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
    padding: 1.5rem 1.5rem 2rem 1.5rem;

     strong {
        color: var(--emphasis-color);
     }

    ${MQAbove.md`
      padding: 2.5rem;
      gap: 7.1875rem;
      grid-template-columns: 5fr 7fr;
    `}
`;

const TextArea = styled.div`
    padding-top: var(--section-padding);

    ${MQAbove.md`
      padding-top: 0;
    `}

    ${MQAbove.lg`
        max-width: 37.5rem;
        padding: 0 var(--section-padding);
    `}
`;

const Sections = styled.section`
    --section-padding: 1.5rem;

    ${MQAbove.md`
       --section-padding: 3rem;
    `}
    
    border-bottom: 1px solid var(--border-color);

    > article {
        border-top: 1px solid var(--border-color);
        padding: 0 var(--section-padding);
    }

    ${MQAbove.md`
        > article:nth-child(even) {
            ${SectionInner} {
                grid-template-columns: 7fr 5fr;
            }

            ${TextArea} {
                order: -1;
            }
        }
    `}
`;

const Description = styled(RichText)`
    margin-top: 0.5rem;
    font-weight: 400;

    ${MQAbove.md`
      margin-top: 1.25rem;
  `}
`;

ExpandablePoints.propTypes = {
    primary: PropTypes.shape({
        heading: PrismicText,
        subheading: PrismicText,
        color_theme: PropTypes.string,
    }),
    items: PropTypes.arrayOf(PropTypes.shape({
        icon: PrismicImage,
        heading: PropTypes.oneOfType([
          PropTypes.string,
          PrismicText,
        ]),
        description: PrismicText,
    })),
};

export default ExpandablePoints;
