import React from 'react';
import PropTypes, { PrismicDoc } from 'types';
import { Link } from 'components/Link';
import { Text } from 'components/Text';
import { useRouter } from 'next/router';
import { linkResolver } from 'client/prismic';
import styled from 'styled-components';

function Nav({ items, mapToNavItem }) {
  const router = useRouter();

  const isActive = (nav_item, path) => {
    const basePath = path.split('?').filter(item => item !== '')[0];

    // If mapToNavItem matches the current path, return true
    if (nav_item === mapToNavItem) {
      return true;
    }
    // If the nav item is the path return true
    if (nav_item === basePath) {
      return true;
    }
    return false;
  };

  // rendering
  return items.filter(({ show_only_in_footer }) => !show_only_in_footer)
    .map(({ nav_item_label, nav_item_link }) => (
      <NavItem
        key={nav_item_link.id}
        doc={nav_item_link}
        className={isActive(linkResolver(nav_item_link), router.asPath) ? 'active' : ''}
      >
        <Text as="span" typeStyle="nav">{nav_item_label}</Text>
      </NavItem>
    ));
}

const NavItem = styled(Link)`
  padding: 1rem 0;
  display: inline-block;
  position: relative;
  :before {
    content: '';
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    position: absolute;
    pointer-events: none;
    width: 8px;
    height: 8px;
    border-radius: 8px;
    transition: opacity 0.2s 0.2s ease;
    opacity: 0;
    background-color: var(--color__lavender);
  }
  :hover,
  &.active {
    :before {
      opacity: 1;
    }
    box-shadow: none;
  }
  @media only screen and (max-width: 70rem) {
    padding: 0 .75rem;
  }
`;

Nav.propTypes = {
  mapToNavItem: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    nav_item_label: PropTypes.string,
    nav_item_link: PrismicDoc,
  })),
};

export default Nav;
