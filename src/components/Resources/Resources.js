import React from 'react';
import PropTypes, { RichText as PrismicText, PrismicImage, PrismicDoc } from 'types';
import { Box, Container } from 'components/Layout';
import styled, { useTheme } from 'styled-components';
import { Link } from 'components/Link';
import { RichText } from 'components/Text';
import { MQAbove, MQBelow } from 'styles/mediaQueries';
import ResponsiveImage from 'components/ResponsiveImage';

const ResourceItem = styled.div`
    display: flex;
    flex-direction: column;
    color: var(--color__nightshadeLight);
    height: 100%;
`;

const ResourcesGrid = styled.div`
  ${MQBelow.md`
    width: 100vw;
    margin-left: -1.5rem;
    padding: 0 1.5rem 1.5rem 1.5rem;
    overflow-x: auto;
    scroll-padding: 0 50%;
    scroll-snap-type: x mandatory;
    display: flex;
    gap: 1rem;
  `}

    ${MQAbove.md`
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
      padding: 0 0 1.5rem 0;
      gap: 1.875rem;
    `}

    .ResourceItem {
      background: white;
      padding: 1.875rem;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 0px 2px rgba(0, 0, 0, 0.06), 0px 0px 1px rgba(0, 0, 0, 0.04);
      border-radius: 5px;
      transition: box-shadow 0.2s ease-in-out;
      scroll-snap-align: center;
      width: 75vw;
      min-width: 75vw;

      ${MQAbove.md`
          width: auto;
          min-width: auto;
      `}
    }

    .ResourceItem:focus,
    .ResourceItem:hover {
      box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.06), 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04);
    }
`;

const Logo = styled.div`
    max-width: 15.625rem;
    margin-bottom: 1rem;
`;

function Resources({ primary, items }) {
  const {
    heading,
    background_color,
  } = primary;
  const theme = useTheme();
  const background = theme.colors[background_color] || theme.colors.white;

  return (
    <Box background={background} as="section" borderTop="1px solid rgba(0,0,0,0.1)">
      <Container
        pt={[4, 5]}
        pb={[4, 5]}
      >
        <RichText
          fontSize={[2, 3]}
          fontWeight="bold"
          textAlign="center"
          mb="1.875rem"
        >
          {heading}
        </RichText>
        <ResourcesGrid>
          {
            items.map(({
              resource_link, headline, logo, publication_name,
            }) => (
              <Link doc={resource_link} className="ResourceItem">
                <ResourceItem>
                  {logo && logo.url && (
                  <Logo>
                    <ResponsiveImage src={logo} fluid />
                  </Logo>
                  )}
                  {publication_name && !logo.url && (
                    <RichText
                      fontSize={[2, 3]}
                      fontWeight="bold"
                      mb="1.875rem"
                    >
                      {publication_name}
                    </RichText>
                  )}
                  <RichText
                    typeStyle="bodyM"
                  >
                    {headline}
                  </RichText>
                </ResourceItem>
              </Link>
            ))
        }
        </ResourcesGrid>
      </Container>
    </Box>
  );
}

Resources.propTypes = {
  primary: PropTypes.shape({
    heading: PrismicText,
    background_color: PropTypes.string,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    resource_link: PrismicDoc,
    headline: PrismicText,
    logo: PrismicImage,
  })),
};

export default Resources;
