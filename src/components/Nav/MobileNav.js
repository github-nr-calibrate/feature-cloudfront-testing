import React from 'react';
import PropTypes, { PrismicDoc } from 'types';
import styled, { css } from 'styled-components';
import { Link } from 'components/Link';
import { Flex } from 'components/Layout';
import { useBodyLock } from 'utils/hooks';
import { Text } from 'components/Text';
import { MQAbove } from 'styles/mediaQueries';
import { useRouter } from 'next/router';
import { linkResolver } from 'client/prismic';

const NavMenu = styled.div`
  user-select: none;
  position: absolute;
  top: calc(100% - 1px);
  left: 0;
  height: calc(100vh - 100% + 1px);
  width: 100%;
  max-width: 40rem;
  z-index: 100;
  color: ${({ themeDark }) => themeDark ? 'white' : 'var(--color__nightshade)'};
  background-color: ${({ themeDark }) => themeDark ? 'var(--color__nightshade)' : 'white'};
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  transform: translateY(${({ open }) => (open ? '0%' : '-100%')});
  transition: transform 0.25s ease-in-out, visibility 0.25s ease-in-out, opacity 0.25s ease-in-out;
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  opacity: ${({ open }) => (open ? '1' : '0')};

  ${MQAbove.navigation` 
    display: none;
  `}

  ul {
    margin-bottom: 1rem;
  }
`;

const NavItem = styled(Flex)`
  font-size: ${({ $smallLink }) => ($smallLink ? '0.875rem' : '1.5rem')};
  font-weight: 500;
  flex-direction: row;
  line-height: 1;
  align-items: center;
  padding: ${({ $smallLink }) => ($smallLink ? '0.625rem 1.5rem' : '0.875rem 1.5rem')};
  opacity: 0;
  transform: translateY(20px);

  & img {
    margin-right: 0.875rem;
  }

  ${({ $active }) => $active && css`
    &:after {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 100%;
      background: var(--color__lavender);
      display: inline-block;
      margin: 3px 0 0 8px;
    }
  `}

  ${({ $open }) => $open && css`
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  `}
`;

function MobileNavItem({
 label, link, smallLink, open, index,
}) {
  const router = useRouter();

  const isActive = (link, path) => {
    const basePath = path.split('?').filter(item => item !== '')[0];

    if (link.link_type === 'Web') {
      return false;
    }

    const linkPath = linkResolver(link);

    // If the nav item is the path return true
    if (linkPath === basePath) {
      return true;
    }
    return false;
  };

  return (
    <li>
      <Link doc={link}>
        <NavItem
          $smallLink={smallLink}
          $active={isActive(link, router.asPath)}
          $open={open}
          style={{ transitionDelay: open ? `${index * 0.15}s` : '0s' }}
        >
          <Text>{label}</Text>
        </NavItem>
      </Link>
    </li>
  );
}

MobileNavItem.propTypes = {
  label: PropTypes.string,
  link: PrismicDoc,
  smallLink: PropTypes.bool,
  open: PropTypes.bool,
  index: PropTypes.number,
};

function MobileNav({ meta, open, themeDark }) {
  useBodyLock(open);
  return (
    <NavMenu
      open={open}
      themeDark={themeDark}
    >
      <ul>
        {meta.nav_links.map(({ nav_item_label, nav_item_link }, index) => (
          <MobileNavItem
            key={nav_item_link.id}
            label={nav_item_label}
            link={nav_item_link}
            open={open}
            index={index}
          />
        ))}
      </ul>
      <ul>
        {meta.nav_links_extra?.map(({ nav_item_label, nav_item_link }, index) => (
          <MobileNavItem
            key={nav_item_link.id}
            label={nav_item_label}
            link={nav_item_link}
            smallLink
            open={open}
            index={index + meta.nav_links.length}
          />
        ))}
      </ul>
    </NavMenu>
  );
}

MobileNav.propTypes = {
  meta: PropTypes.object,
  open: PropTypes.bool,
  themeDark: PropTypes.bool,
};

export default MobileNav;
