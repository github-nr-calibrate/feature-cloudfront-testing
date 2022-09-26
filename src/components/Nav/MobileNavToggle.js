import React from 'react';
import styled from 'styled-components';
import { useGlobalState } from 'client/state';
import PropTypes from 'types';

const MoblieNavButton = styled.button`
  position: relative;
  display: inline-block;
  width: 20px;
  vertical-align: top;
  cursor: pointer;
  appearance: none;
  outline: none;
  background: transparent;
  border: 0;
  padding: 0.5rem 1rem;
  box-sizing: content-box;
  margin-left: -1rem; // Offset padding to realign with site max-width

  & div {
    width: inherit;
    height: 2px;
    margin: 4px 0;
    background-color: ${({ theme }) => theme};
    opacity: ${({ navOpen }) => (navOpen ? 0 : 1)};
    transition: transform 0.3s ease, opacity 0.2s ease, width 0.3s ease;
  }

  & div {
    transform-origin: center;
    transform: ${({ navOpen }) => `rotate(${navOpen ? 45 : 0}deg)`};
  }

  & div:first-of-type {
    opacity: 1;
    transform-origin: left center;
    transform: ${({ navOpen }) => `rotate(${navOpen ? 45 : 0}deg) translateY(${navOpen ? -1.5 : 0}px)`};
  }

  & div:last-of-type {
    opacity: 1;
    transform-origin: left center;
    transform: ${({ navOpen }) => `rotate(${navOpen ? -45 : 0}deg) translateY(${navOpen ? 1.5 : 0}px)`};
    width: ${({ navOpen }) => (navOpen ? 'inherit' : '70%')};;
  }
`;

function MobileNavToggle({ theme }) {
  const [{ navOpen }, { setNavOpen }] = useGlobalState();

  return (
    <span onClick={() => setNavOpen(!navOpen)}>
      <MoblieNavButton
        navOpen={navOpen}
        aria-label="Mobile Nav Button"
        theme={theme}
      >
        <div />
        <div />
        <div />
      </MoblieNavButton>
    </span>
  );
}

MobileNavToggle.propTypes = {
  theme: PropTypes.string,
};

export default MobileNavToggle;
