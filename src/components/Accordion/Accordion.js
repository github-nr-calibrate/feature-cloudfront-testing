import React, { useState, useEffect } from 'react';
import PropTypes, { RichText as PrismicText, PrismicImage } from 'types';
import { RichText, Text } from 'components/Text';
import styled from 'styled-components';
import { MQAbove } from 'styles/mediaQueries';
import { slugify, smoothScrollIntoView } from 'utils';
import ResponsiveImage from 'components/ResponsiveImage';
import { Animation } from 'components/Animation';
import { ParentBlock } from 'components/ParentBlock';
import { useRouter } from 'next/router';
import { ThemeBlock } from 'components/ThemeBlock';

function Accordion({ items, primary }) {
  const { color_theme = 'light' } = primary || {};

  const [activeIndexes, setActiveIndexes] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const indexes = urlParams.get('indexes');
    const step = urlParams.get('step');
    if (step && indexes) {
      const indexArray = indexes.split(',').map(index => parseInt(index, 10));
      if (step || indexArray.length > 0) {
        setActiveIndexes((indexes) => [...indexes, ...indexArray]);
        setActiveId(step);
        // timeout before scroll for expanding active steps and getting the correct step location
        setTimeout(() => { smoothScrollIntoView(null, step); }, 150);
      }
    }
  }, []);

  const addTabIndex = (index, id) => {
    const isActive = activeIndexes.includes(index);
    if (isActive) {
      setActiveIndexes(activeIndexes.filter(item => item !== index));
    } else {
      setActiveIndexes(indexes => [...indexes, index]);
      setActiveId(id);
    }
  };

  const router = useRouter();

  useEffect(() => {
    const { uid } = router.query;
    if (activeIndexes.length > 0) {
      const indexString = activeIndexes.toString();
      router.replace(
        {
          pathname: router.pathname,
          query: {
            indexes: indexString,
            step: activeId,
            uid,
          },
        },
        undefined,
        { shallow: true },
      );
    } else {
      const newurl = `${window.location.protocol }//${ window.location.host }${window.location.pathname }`;
      window.history.pushState({ path: newurl }, '', newurl);
    }
  }, [activeIndexes, activeId]); // eslint-disable-line react-hooks/exhaustive-deps

  const isActive = (index) => {
    const activeState = activeIndexes.includes(index);
    return activeState;
  };

  return (
    <ThemeBlock theme={color_theme}>
      <ParentBlock primary={primary} subheadingLarge>
        <ItemsList>
          {items.map(({
            headline,
            deck,
            description,
            testimonial_image,
          }, index) => {
          const uniqueId = headline || `accordion_${new Date().getTime()}`;

            return (
              <AccordionItem
                key={`accordion_${slugify(uniqueId)}_${index}`}
                $active={isActive(index)}
              >
                <Animation name="fadeIn">
                  <Button
                    aria-controls={`${slugify(uniqueId)}-accordion-content-${index}`}
                    aria-expanded={isActive(index)}
                    id={`${slugify(uniqueId)}`}
                    className="accordion__button"
                    tabIndex="0"
                    onClick={() => addTabIndex(index, `${slugify(uniqueId)}`)}
                  >
                    <Header>
                      <Dot>
                        <DotInner $active={isActive(index)} />
                      </Dot>
                      <HeaderText>
                        {deck && (
                          <Deck>
                            <Text typeStyle="labelsM">{deck}</Text>
                          </Deck>
                        )}
                        {headline && (
                          <Text typeStyle="h4" as="h3">{headline}</Text>
                          )}
                      </HeaderText>
                    </Header>
                    <Indicator>
                      <IndicatorButton $active={isActive(index)} />
                    </Indicator>
                  </Button>
                </Animation>
                <Panel
                  aria-hidden={!isActive(index)}
                  id={`${slugify(uniqueId)}-accordion-content-${index}`}
                  $active={isActive(index)}
                >
                  <PanelContent $active={isActive(index)}>
                    {testimonial_image?.url && (
                      <Animation name="fadeIn">
                        <ResponsiveImage src={testimonial_image} ratio={0.79} />
                      </Animation>
                    )}

                    {description && (
                      <Animation name="fadeIn">
                        <div>
                          <Description
                            typeStyle="h5"
                          >
                            {description}
                          </Description>
                        </div>
                      </Animation>
                    )}

                  </PanelContent>
                </Panel>
              </AccordionItem>
            );
          })}
        </ItemsList>
      </ParentBlock>
    </ThemeBlock>
  );
}

const ItemsList = styled.div`
  --accordion-item-padding: 4rem;
  position: relative;

  ${MQAbove.md`
      --accordion-item-padding: 10rem;
  `}

    &:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        width: 1px;
        height: calc(100% - var(--accordion-item-padding));
        transform: translateY(-50%);
        background: var(--border-color);
        z-index: -3;
    }

    
`;

const AccordionItem = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    position: relative;
`;

const Button = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 0;
    width: 100%;
    transition: box-shadow 0.25s ease-in;

    &:after {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        width: calc(100% - 40px);
        height: 1px;
        background: var(--border-color);
    }

    ${MQAbove.md`
      padding: 2.5rem 0;
    `}

    body.user-is-tabbing &&:focus {
        outline: 4px solid var(--color__lavender);
    }

    @media(hover: hover) and (pointer: fine) {
        &[aria-expanded="true"] {
            &:after {
              display: none;
            }
        }
    }
`;

const Dot = styled.div`
    position: relative;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--background-color);
    transform: translateX(-50%);
    border-radius: 100%;
`;

const DotInner = styled.div`
    width: 8px;
    height: 8px;
    background: var(--color__lavenderLight);
    border-radius: 100%;
    position: relative;
    transition: all 0.25s ease-in;
    z-index: 3;
    box-shadow: 0 0 0 0px #E9E2FF;
    box-shadow: ${({ $active }) => ($active ? '0 0 0 7px #E9E2FF' : '0 0 0 0px #E9E2FF')};
    transform: ${({ $active }) => ($active ? 'scale(1.2)' : 'none')};
    

    ${Button}:hover &,
    ${Button}:focus & {
      transform: scale(1.3);
      box-shadow: 0 0 0 7px #E9E2FF;
    }
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: opacity 0.25s ease-in;
`;

export const Indicator = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
    align-items: center;
    font-weight: 600;
    font-size: 10px;
    line-height: 1;
    text-align: center;
    text-transform: uppercase;
`;

export const IndicatorButton = styled.div`
    position: relative;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: var(--color__nightshadeLight);
    transition: transform 0.25s ease-in;
    
    ${MQAbove.md`
      width: 30px;
      height: 30px;
    `}

    &:before,
    &:after {
      content: '';
      position: absolute;
      background: white;
      height: 1px;
      left: 8px;
      top: 12px;
      width: 8px;
      transition: transform 0.25s ease;

      ${MQAbove.md`
        left: 10px;
        top: 14px;
        width: 10px;
      `}
    }
    &:after {
      transform-origin: center;
      transform: ${({ $active }) => ($active ? 'none' : 'rotate(90deg)')};
    }
    &:before {
      transform: ${({ $active }) => ($active ? 'none' : 'rotate(180deg)')};
    }

    ${Button}:hover &,
    ${Button}:focus & {
      transform: scale(1.2);
    }
`;

const HeaderText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 100%;
    white-space: pre-wrap;
    text-align: left;
    margin-left: 0;
    transition: opacity 0.25s ease-in;

    @media(hover: hover) and (pointer: fine) {
        ${Button}:hover & {
          opacity: 0.6;
        }
    }
`;

const Deck = styled.div`
    color: var(--color__slate);
`;

const Panel = styled.div`
    padding: 1.875rem 0 1.5rem;
    width: 100%;
    margin: -5px auto 0 42px;
    display: ${({ $active }) => ($active ? 'block' : 'none')};
    overflow: hidden;
    box-sizing: border-box;
    border-bottom: 1px solid var(--border-color);

    ${MQAbove.md`
      padding: 0 0 2.5rem;
    `}
`;

const PanelContent = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.875rem;
    align-items: center;
    margin: 0 auto;
    transition: opacity 0.25s ease-in;
    opacity: ${({ $active }) => ($active ? '1' : '0')};

    ${MQAbove.md`
        grid-template-columns: 1fr 1fr;
        gap: 7.5rem;
    `}

    a {
      text-decoration: underline;

      &:hover {
        opacity: 0.7;
      }
    }

    ul {
        display: flex;
        flex-direction: column;
        list-style: disc;
        list-style-position: outside;
        padding-left: 1.375rem;
        font-size: 1.125rem;
        font-weight: 400;

        li + li {
            margin-top: 1.25rem;
        }
    }
`;

const Description = styled(RichText)`
    p + p {
      font-size: 1.125rem;
      line-height: 1.6;
      font-weight: 400;
    }
`;

Accordion.propTypes = {
  primary: PropTypes.shape({
    emphasis_color: PropTypes.string,
    background_color: PropTypes.string,
    background_image: PrismicImage,
    background_position: PropTypes.string,
    background_image_size: PropTypes.string,
    text_color: PropTypes.string,
    heading: PrismicText,
    subheading: PrismicText,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    headline: PropTypes.string,
    deck: PropTypes.string,
    key_metric: PropTypes.string,
    faq_items: PrismicText,
    testimonial_deck: PropTypes.string,
    testimonial_name: PropTypes.string,
    testimonial_text: PrismicText,
    testimonial_image: PrismicImage,
  })),
};

export default Accordion;
