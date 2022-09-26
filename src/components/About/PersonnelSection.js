import React, { useState, useEffect } from 'react';
import PropTypes, { RichText as RichTextType, PrismicLink, PrismicImage } from 'types';
import styled from 'styled-components';
import { Box, Container } from 'components/Layout';
import { Text } from 'components/Text';
import { ThemeBlock } from 'components/ThemeBlock';
import { Animation } from 'components/Animation';
import { MQAbove, MQBelow } from 'styles/mediaQueries';
import { Modal } from 'components/Modal';
import { hasText } from 'utils';
import ResponsiveImage from 'components/ResponsiveImage';
import PersonnelPreview from './PersonnelPreview';

function PersonnelSection({ primary, items }) {
  const {
    team_name: heading,
    team_description: subheading,
    color_theme,
  } = primary;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState();

  const [activeItem, setActiveItem] = useState(0);
  const [firstItem] = useState(0);
  const [lastItem] = useState(items.length - 1);
  const [prevItem, setPrevItem] = useState();
  const [nextItem, setNextItem] = useState();

  useEffect(() => {
    setPrevItem(activeItem === 0 ? lastItem : activeItem - 1);
    setNextItem(activeItem === lastItem ? firstItem : activeItem + 1);
  }, [activeItem, firstItem, lastItem]);

  const setContent = (item) => {
    setActiveItem(item);
    setModalContent(items[item]);
  };

  return (
    <ThemeBlock theme={color_theme} paddingBottom="0" paddingTop={['5rem',, '6.5rem']}>
      {(hasText(heading) || hasText(subheading)) && (
        <Container>
          <Animation name="fadeIn">
            <Header paddingBottom={['2.5rem', '3.5rem', '4.5rem']}>
              {hasText(heading) && (
                <Box>
                  <Text typeStyle="h2" marginBottom="1rem">{heading}</Text>
                </Box>
              )}
              {hasText(subheading) && (
                <Box>
                  <Text typeStyle="bodyL">{subheading}</Text>
                </Box>
              )}
            </Header>
          </Animation>
        </Container>
      )}
      <PersonnelGridSection>
        <Container>
          <ItemsFlex>
            {items.map((item, index) => {
              // Prismic data
              const {
                headshot,
                position,
                name,
              } = item;

              return (
                <PersonnelItem
                  key={name}
                  tabIndex="0"
                  onClick={() => {
                    setModalContent(item);
                    setActiveItem(index);
                    setIsModalOpen(true);
                  }}
                  onKeyDown={e => {
                    e.key === 'Enter' && (
                      setModalContent(item),
                      setActiveItem(index),
                      setIsModalOpen(true)
                    );
                  }}
                >
                  <PersonnelImage
                    marginBottom={['0.5rem',, '0.75rem']}
                  >
                    <ResponsiveImage
                      src={headshot}
                      ratio={1}
                    />
                  </PersonnelImage>
                  <Box>
                    <PersonnelHeading typeStyle="h7">{name}</PersonnelHeading>
                    <Text typeStyle="bodyS" color="textMediumLight">{position}</Text>
                  </Box>
                </PersonnelItem>
              );
            })}
          </ItemsFlex>
        </Container>
      </PersonnelGridSection>
      { modalContent && (
        <Modal
          open={isModalOpen}
          close={() => {
            setModalContent();
            setIsModalOpen(false);
          }}
          resetStyles
        >
          <PersonnelPreview
            item={modalContent}
            prevItem={prevItem}
            nextItem={nextItem}
            setContent={setContent}
            items={items}
          />
        </Modal>
      )}
    </ThemeBlock>
  );
}

const Header = styled(Box)`
  display: grid;

  ${MQAbove.md`
    grid-template-columns: 7fr 5.5fr;
    grid-column-gap: 5.5rem;
  `}
`;

const PersonnelGridSection = styled(Box)`
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
`;

const ItemsFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: -1px;
  position: relative;

  & > div {
    flex-basis: 50%;
    border: 1px solid var(--border-color);
    margin: -1px -1px 0 0;
  }

  ${MQAbove.md`
    & > div {
      flex-basis: 25%;
    }
  `}
`;

const PersonnelItem = styled.div`
  padding: 1rem 1rem 0.75rem 1rem;
  position: relative;

  ${MQAbove.md`
    overflow: hidden;
    padding: 1.5rem 1.5rem 1rem 1.5rem;
    cursor: pointer;

    &:hover,
    &:focus-visible {
      img {
        transform: scale(1.1);
      }
    }
  `}
`;

const PersonnelImage = styled(Box)`
  overflow: hidden;
  
  .ResponsiveImage img{
    transition: transform .16s ease-out;
  }
`;

const PersonnelHeading = styled(Text)`
  ${MQBelow.md`
    font-size: 0.75rem;
  `}
`;

PersonnelSection.propTypes = {
  primary: PropTypes.shape({
    color_theme: PropTypes.string,
    team_name: PropTypes.string,
    team_description: PropTypes.string,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    headshot: PrismicImage,
    position: PropTypes.string,
    name: PropTypes.string,
    biography: RichTextType,
    quote: PropTypes.string,
    link: PrismicLink,
  })),
};

export default PersonnelSection;
