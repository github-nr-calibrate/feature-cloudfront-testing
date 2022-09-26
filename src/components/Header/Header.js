import React, { useEffect, useState, useRef } from 'react';
import { Container } from 'components/Layout';
import { Link } from 'components/Link';
import { Nav, MobileNav, MobileNavToggle } from 'components/Nav';
import { useGlobalState } from 'client/state';
import { Banner } from 'components/Banner';
import { Text } from 'components/Text';
import PropTypes, {
  RichText as RichTextType, PrismicLink, PrismicDoc, ReactChild,
} from 'types';
import styled from 'styled-components';
import { Logo } from 'components/Logo';
import { MQBelow, MQAbove } from 'styles/mediaQueries';

function Header({ meta, mapToNavItem, themeDark }) {
  // data and helpers
  const [{ navOpen }] = useGlobalState();

  const [darkNav, setDarkNav] = useState(themeDark);
  const [minimal, setMinimal] = useState(false);
  const navigation = useRef(null);

  useEffect(() => {
    const onScroll = e => {
      const scrollPosition = e.target.documentElement.scrollTop;
      if (scrollPosition > navigation.current?.clientHeight) {
        setMinimal(true);
        setDarkNav(false);
      } else {
        setMinimal(false);
        setDarkNav(themeDark);
      }
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [themeDark]);

  useEffect(() => {
      setDarkNav(themeDark);
  }, [themeDark]);

  // rendering
  return (
    <>
      <Banner
        url={meta.banner_link}
        copy={meta.banner_copy}
        show={meta.visible}
        query_string={meta.query_string}
      />
      <MainNav $themeDark={darkNav} minimal={minimal} ref={navigation}>
        <NavInner $themeDark={darkNav}>
          <NavLeftItems>
            <MobileNavToggleContainer>
              <MobileNavToggle theme={darkNav ? 'white' : 'black'} />
            </MobileNavToggleContainer>
            <LogoLink href="/" aria-label="Navigate to homepage">
              <Logo theme={darkNav ? 'light' : 'dark'} />
            </LogoLink>
          </NavLeftItems>
          <NavCenterItems>
            <Nav items={meta.nav_links} mapToNavItem={mapToNavItem} />
          </NavCenterItems>
          <NavRightItems>
            {(!!meta.sign_in_label?.length
                && meta.sign_in_link?.url) && (
                <SignIn doc={meta.sign_in_link} $themeDark={darkNav}>
                  <Text as="span" typeStyle="nav">{meta.sign_in_label}</Text>
                </SignIn>
              )}
            <NavButton doc={meta.join_now_link} $themeDark={darkNav}>
              {meta.join_now_label}
            </NavButton>
          </NavRightItems>
        </NavInner>

        <MobileNav meta={meta} open={navOpen} themeDark={darkNav} />
      </MainNav>
    </>
  );
}

// Styles

const MainNav = styled.nav`
  width: 100%;
  vertical-align: middle;
  position: sticky;
  top: 0rem;
  background-color: ${({ $themeDark }) => $themeDark ? 'var(--color__nightshade)' : 'white'};
  color: ${({ $themeDark }) => $themeDark ? 'white' : 'var(--color__nightshade)'};
  backdrop-filter: blur(10px);
  z-index: 10;
  transition: all 0.3s ease-out;
`;

const NavInner = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 1rem;
  padding: 20px;
  background-color: inherit;
  position: relative;
  z-index: 101;
`;

const LogoLink = styled(Link)`
  display: inline-block;
  width: 153px;
  transition: all 0.3s ease-out;

  @media only screen and (max-width: 31.25rem) {
    width: 7.5625rem;
  }

  svg {
    width: 100%;
    height: auto;
  }
`;

const NavLeftItems = styled.div`
  display: flex;
  align-items: center;

  ${MQAbove.navigation`
    flex: 1;
  `}
`;

const NavCenterItems = styled.div`
  display: flex;
  gap: 2rem;
  
  ${MQBelow.navigation` 
    display: none;
  `}
`;

const NavRightItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  ${MQAbove.navigation`
    flex: 1;
    justify-content: end;
  `}

  @media (max-width: 340px) {
    transform: scale(0.75);
  }
`;

const SignIn = styled(Link)`
  padding: 0 1.25rem;
  display: inline-block;
  color: inherit;
  transition: color 0.15s ease-out;

  &:hover {
    color: ${({ $themeDark }) => $themeDark ? 'var(--color__lavenderLight)' : 'var(--color__lavender)'};
  }
  
  span {
    font-size: 0.8125rem;
    font-weight: 500;
    white-space: nowrap;
  }

  ${MQBelow.navigation` 
    display: none;
  `}
`;

const MobileNavToggleContainer = styled.div`
  display: none;

  ${MQBelow.navigation` 
    display: inline;
  `}
`;

const NavButton = styled(Link)`
  background: ${({ $themeDark }) => $themeDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(189, 186, 222, 0.5)'};
  padding: 12px 24px;
  border-radius: 50px;
  text-align: center;
  font-size: 0.8125rem;
  line-height: 1rem;
  font-weight: 500;
  white-space: nowrap;
  color: ${({ $themeDark }) => $themeDark ? 'white' : 'var(--color__nightshade)'};
  transition: color 0.25s ease-out, border-color 0.25s ease-out, background-color 0.25s ease-out;

  &:hover {
    background: transparent;
    color: ${({ $themeDark }) => $themeDark ? 'var(--color__nightshade)' : 'white'};
    border-color: ${({ $themeDark }) => $themeDark ? 'white' : 'var(--color__nightshade)'};
    background: ${({ $themeDark }) => $themeDark ? 'white' : 'var(--color__nightshade)'};
  }
`;

Header.propTypes = {
  mapToNavItem: PropTypes.string,
  themeDark: PropTypes.bool,
  meta: PropTypes.shape({
    join_now_label_size: PropTypes.string,
    banner_link: PrismicLink,
    banner_copy: RichTextType,
    visible: PropTypes.bool,
    seo_title: PropTypes.string,
    query_string: PropTypes.string,
    nav_links: PropTypes.arrayOf(PropTypes.shape({
      nav_item_label: PropTypes.string,
      nav_item_link: PrismicDoc,
    })),
    sign_in_link: PrismicDoc,
    sign_in_label: PropTypes.oneOfType([ReactChild, RichTextType]),
    join_now_link: PrismicDoc,
    join_now_label: PropTypes.oneOfType([ReactChild, RichTextType]),
  }),
};

export default React.memo(Header);
