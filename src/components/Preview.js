import React from 'react';
import PropTypes from 'types';
import styled from 'styled-components';

const PreviewContainer = styled('div')`
  font-size: 13px;
  position: fixed;
  z-index: 10000;
  bottom: 2rem;
  left: 2rem;
  overflow: hidden;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.yellow};

  span, a {
    display: inline-block;
    padding: 0.75rem 0.75rem;
  }

  a {
    background: rgba(255,255,255,.15);
    :hover { background: rgba(0,0,0,.1); }
  }
`;

function Preview({ page }) {
  return (
    <PreviewContainer>
      <span>
        You are viewing a draft
        {page ? `${`of page "${page}"`}` : 'document'}
        .
      </span>
      {' '}
      <a href="/api/exit-preview">Exit</a>
    </PreviewContainer>
  );
}

Preview.propTypes = {
  page: PropTypes.string,
};

export default Preview;
