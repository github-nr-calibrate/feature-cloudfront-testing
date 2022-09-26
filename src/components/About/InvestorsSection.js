import React from 'react';
import PropTypes, { PrismicImage, PrismicLink } from 'types';
import { Box, Container } from 'components/Layout';
import { Text } from 'components/Text';
import styled from 'styled-components';
import { hasText } from 'utils';
import { Link } from 'components/Link';
import { MQAbove } from 'styles/mediaQueries';
import { Animation } from 'components/Animation';
import { ThemeBlock } from 'components/ThemeBlock';

function InvestorsSection({ primary, items }) {
  const {
    heading,
    body_copy,
    color_theme,
  } = primary;

  return (
    <ThemeBlock theme={color_theme} paddingBottom={['4rem', '6rem', '10rem']}>
      <Container>
        {(hasText(heading) || hasText(body_copy)) && (
          <Animation name="fadeIn">
            <Box textAlign="center" mb={['2.5rem',, '5.5rem']}>
              {hasText(heading) && (
                <Text typeStyle="h2" mb="1rem">{heading}</Text>
              )}
              {hasText(body_copy) && (
                <Text typeStyle="subhead">{body_copy}</Text>
              )}
            </Box>
          </Animation>
        )}
        <Animation name="fadeIn">
          <LogosGrid>
            {items.map((item) => (
              <Box key={item.logo.url}>
                {item.link ? (
                  <Link doc={item.link}>
                    <img data-src={item.logo.url} alt={item.logo.alt || 'Investor logo'} className="lazyload" />
                  </Link>
                ) : (
                  <img data-src={item.logo.url} alt={item.logo.alt || 'Investor logo'} className="lazyload" />
                )}
              </Box>
            ))}
          </LogosGrid>
        </Animation>
      </Container>
    </ThemeBlock>
  );
}

const LogosGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
  max-width: 60rem;
  margin: 0 auto;

  ${MQAbove.md`
    gap: 2.875rem 2.5rem;
  `}

  img {
    height: 2.4rem;

    ${MQAbove.md`
      height: 4.25rem;
    `}
  }
`;

InvestorsSection.propTypes = {
  primary: PropTypes.shape({
    heading: PropTypes.string,
    body_copy: PropTypes.string,
    color_theme: PropTypes.string,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    logo: PrismicImage,
    link: PrismicLink,
  })),
};

export default InvestorsSection;
