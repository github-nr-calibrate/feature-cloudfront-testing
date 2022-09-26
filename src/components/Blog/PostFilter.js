import React from 'react';
import PropTypes from 'types';
import styled from 'styled-components';
import { MQAbove } from 'styles/mediaQueries';

function PostFilter({ category, categories, setCategory }) {
  return (
    <>
      <Category
        href="?category=all"
        onClick={(e) => setCategory(e, 'all')}
        className={category === 'all' && 'active'}
      >
        all
      </Category>
      {categories.map((option, i) => (
        <Category
          key={i}
          href={`?category=${option}`}
          onClick={(e) => setCategory(e, option)}
          className={option === category && 'active'}
        >
          { option }
        </Category>
      ))}
    </>
  );
}

// Styles
const Category = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  text-transform: capitalize;
  cursor: pointer;
  transition: all 0.3s;

  ${MQAbove.md`
    gap: 0.75rem;
    font-size: 1.125rem;
  `}

  &:before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 100%;
    border: 1px solid var(--color__lavender);

    ${MQAbove.md`
      width: 20px;
      height: 20px;
    `}
  }

  &.active {
    &:before {
      background: var(--color__lavender);
    }
  }
`;

PostFilter.propTypes = {
  category: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.string),
  setCategory: PropTypes.func,
};

export default PostFilter;
