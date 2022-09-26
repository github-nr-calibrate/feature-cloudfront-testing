import React from 'react';
import PropTypes, { PrismicDoc } from 'types';
import styled from 'styled-components';
import { Link } from 'components/Link';
import {
  Flex, Box, Container, Grid,
} from 'components/Layout';
import { Text } from 'components/Text';
import { useMatchMedia } from 'utils/hooks';
import { lessThan } from 'styles/media';
import { Logo } from 'components/Logo';
import { MQBelow, MQAbove } from 'styles/mediaQueries';
import FooterCTA from './FooterCTA';

function Footer({
  meta,
  showFooterCTA,
  demo,
  hasBorderTop,
}) {
  const isMobile = useMatchMedia(lessThan('md'));
  const year = new Date().getFullYear();

  return (
    <footer>
      {(showFooterCTA || demo) && <FooterCTA meta={meta} demo={demo} hasBorderTop={hasBorderTop} />}

      <Box bg="white" color="textMediumDark" as="section">
        <Container>
          <Flex
            gridGap={isMobile ? 0 : '5.5rem'}
            alignItems="flex-start"
            py={isMobile ? 0 : '4rem'}
            borderBottom={!isMobile && '1px solid var(--color__mauve)'}
          >
            {!isMobile && (
              <Flex flex="20%">
                <LogoLink href="/" aria-label="Navigate to homepage">
                  <Logo theme="dark" />
                </LogoLink>
              </Flex>
            )}
            <FooterNav
              as="nav"
              gridTemplateColumns={`repeat(${isMobile ? '2' : '4'}, 1fr)`}
              gridTemplateRows={`repeat(${isMobile ? '6' : '3'}, auto)`}
              gridAutoFlow="column"
              gridColumnGap={isMobile ? 0 : '1rem'}
              aria-label="Footer Navigation"
              flex="80%"
              py={isMobile && '1rem'}
              borderBottom={isMobile && '1px solid var(--color__mauve)'}
              mt={isMobile ? 0 : '-0.5rem'}
            >
              {meta.footer_links?.map(({ label, link }) => (
                <FooterLink key={label} label={label} link={link} />
              ))}
            </FooterNav>
          </Flex>

          <Flex
            flexDirection={['column-reverse',, 'row']}
            justifyContent="space-between"
            alignItems="center"
            gridGap="1.5rem"
            mt={isMobile ? '2rem' : '1rem'}
            pb={['2.5rem',, '2rem']}
          >
            <Flex>
              <Box>
                <Flex
                  justifyContent={isMobile ? 'center' : 'flex-start'}
                  alignItems="center"
                  flexWrap="wrap"
                  gridColumnGap={isMobile ? '0.75rem' : '2rem'}
                  gridRowGap={isMobile ? '0.125rem' : '0.5rem'}
                >
                  {meta.footer_links_extra?.map(({ link, label }) => (
                    <LegalLink key={label} doc={link}>
                      <Text as="span" typeStyle="bodyS">{label}</Text>
                    </LegalLink>
                  ))}
                </Flex>
                <Text as="p" typeStyle="bodyS" textAlign={isMobile ? 'center' : 'left'} mt="0.5rem">
                  {`© ${year} Calibrate Health. All rights reserved.`}
                </Text>
              </Box>
            </Flex>

            <Flex gridGap={isMobile ? '2rem' : '2.5rem'} flexDirection={isMobile ? 'column' : 'row'} alignItems="center">
              <Flex
                alignItems="center"
                gridColumnGap="1.5rem"
              >
                <SocialLink doc={meta.instagram_link}>
                  <img data-src="/icons/instagram-black.svg" alt="Instagram" className="lazyload" />
                </SocialLink>
                <SocialLink doc={meta.twitter_link}>
                  <img data-src="/icons/twitter-black.svg" alt="Twitter" className="lazyload" />
                </SocialLink>
                <SocialLink doc={meta.facebook_link}>
                  <img data-src="/icons/facebook-black.svg" alt="Facebook" className="lazyload" />
                </SocialLink>
                <SocialLink doc={meta.pinterest_link}>
                  <img data-src="/icons/pinterest-black.svg" alt="Pinterest" className="lazyload" />
                </SocialLink>
              </Flex>
              <a
                href="https://www.legitscript.com/websites/?checker_keywords=joincalibrate.com"
                rel="noreferrer"
                target="_blank"
                title="Verify LegitScript Approval"
              >
                <img
                  data-src="https://static.legitscript.com/seals/6468398.png"
                  alt="LegitScript approved"
                  width="100"
                  height="80"
                  border="0"
                  className="lazyload"
                />
              </a>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </footer>
  );
}

function FooterLink({ label, link }) {
  const isMobile = useMatchMedia(lessThan('md'));

  return (
    <StyledLink
      doc={link}
      my={['0.5rem',, '0.35rem']}
      textAlign={isMobile && 'center'}
    >
      <Text typeStyle="bodyM" fontWeight="500 !important">
        {label}
      </Text>
    </StyledLink>
  );
}

const FooterNav = styled(Grid)`
  // Simpler logic for center border effect in mobile sizes
  ${MQBelow.md`
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      height: 100%;
      left: 50%;
      border-right: 1px solid var(--color__mauve);
    }
  `}

  ${MQAbove.lg`
    padding-right: 3rem;
  `}
`;

const StyledLink = styled(Link)`
  display: block;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--color__lavender);
  }
`;

export const LegalLink = styled(Link)`
  text-align: center;
  white-space: nowrap;
  text-decoration: underline;
  
  & > span {
    font-weight: 500;
  }

  &:hover {
    color: var(--color__lavender);
  }
`;

export const SocialLink = styled(Link)`
  display: flex;
  transition: opacity 0.3s ease;

  & > img {
    width: 32px;
    height: 32px;

    ${MQAbove.md`
      width: 24px;
      height: 24px;
    `}
  }


  &:hover {
    opacity: 0.6;
  }
`;

export const LogoLink = styled(Link)`
  display: inline-block;
  width: 153px;
  transition: all 0.3s ease-out;

  svg {
    width: 100%;
    height: auto;
  }
`;

Footer.propTypes = {
  meta: PropTypes.object,
  showFooterCTA: PropTypes.bool,
  demo: PropTypes.bool,
  hasBorderTop: PropTypes.bool,
};

FooterLink.propTypes = {
  label: PropTypes.string,
  link: PrismicDoc,
};

export default React.memo(Footer);
