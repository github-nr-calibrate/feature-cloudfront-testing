import React, { useState, useEffect } from 'react';
import PropTypes from 'types';
import Router from 'next/router';
import Page from 'components/Page';
import { fetchSingle, fetchAllByDocType } from 'client/prismic';
import {
 Container, Flex, Box,
} from 'components/Layout';
import { PostTout, PostFilter } from 'components/Blog';
import styled from 'styled-components';
import { MQAbove } from 'styles/mediaQueries';
import { SectionHeader } from 'components/SectionHeader';
import { hasText } from 'utils';

function BlogHome({
 data, posts, categories,
}) {
  const postsPerPage = 21;
  const [totalPages, setTotalPages] = useState(Math.ceil(posts.results.length / postsPerPage));
  const [pageNumber, setPageNumber] = useState(1);
  const paginationNumbers = [...Array(totalPages).keys()].map(i => i + 1);

  const [filteredPosts, setFilteredPosts] = useState(posts.results.slice(0, postsPerPage));
  const [category, setCategory] = useState('all');
  const [hero, setHero] = useState(null);
  const { heading } = data;

  useEffect(() => {
    // Filter the posts based on the category
    const filteredPosts = posts.results.filter((post) => {
      const page_category = category;
      const post_categories = post.data.categories;

      // must be categorized and pass current filter
      return (page_category === 'all' && post_categories.find(({ category }) => category))
        || post_categories.find(({ category }) => category === page_category);
    });

    // Set the hero unit
    const categoryHero = () => {
      // If a featured post is set on the page use that
      const chosenHero = posts.results.find((post) => post.id === data[`featured_${category}_post`]?.id);
      // Otherwise use the first post in the category
      const fallbackHero = filteredPosts[0];
      return chosenHero || fallbackHero;
    };
    setHero(categoryHero);

    // Remove the hero from the list of posts
    const filteredPostsMinusHero = filteredPosts.filter((post) => post.id !== categoryHero().id);

    // Get the slice of posts to display for the current page
    const indexOfFirstPostOnCurrentPage = postsPerPage * (pageNumber - 1);
    const indexOfLastPostOnCurrentPage = postsPerPage * pageNumber;
    const postsOnCurrentPage = filteredPostsMinusHero
      .slice(indexOfFirstPostOnCurrentPage, indexOfLastPostOnCurrentPage);
    setFilteredPosts(postsOnCurrentPage);
    setTotalPages(Math.ceil(filteredPostsMinusHero.length / postsPerPage));

    // Update the query string with the current category and page number
    Router.push(`/resources?category=${category}&page=${pageNumber}`, undefined, { shallow: true });
  }, [category, posts.results, pageNumber, data.featured_post, data]);

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    const { category, page } = Object.fromEntries(new URLSearchParams(location.search));
    setCategory(category || 'all');
    setPageNumber(Number(page) || 1);
  }, []);

  const updateCategory = (e, category) => {
    e.preventDefault(); // when javascript is disabled the links will work natively
    setPageNumber(1); // Reset page number when category changes
    setCategory(category);
  };

  const updatePage = (page) => {
    document.getElementById('posts-filters').scrollIntoView();
    setPageNumber(page);
  };

  return (
    <Box
      as="section"
      position="relative"
      pb={[4, 4, 5]}
      pt={[4, 4, 5]}
    >
      <Container>
        {hasText(heading) && (
          <Box marginBottom={['2.5rem', , '5.5rem']}>
            <SectionHeader heading={heading} typeStyle="h1" />
          </Box>
        )}
        {hero && (
        <Box
          pb={['3rem', '4rem', '5.5rem']}
          borderBottom="1px solid var(--color__mauve)"
        >
          <PostTout post={hero} variant="hero" />
        </Box>
        )}
        <Filters id="posts-filters" style={{ scrollMarginTop: '80px' }}>
          <FiltersRow>
            <PostFilter category={category} categories={categories} setCategory={updateCategory} />
          </FiltersRow>
        </Filters>
        <Box pt={['2rem',, '4rem']}>
          <PostsGrid>
            {filteredPosts?.map((post, i) => (
              <article key={i}>
                <PostTout post={post} />
              </article>
            ))}
          </PostsGrid>
          {totalPages > 1 && (
          <Flex justifyContent="center" pt={[3, 5]} alignItems="center">
            <PaginationButton onClick={() => updatePage(pageNumber - 1)} disabled={pageNumber === 1} aria-label={`Navigate to page ${pageNumber - 1}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="#838198" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </PaginationButton>
            <PaginationNumbers>
              {paginationNumbers.map(page => (
                <button
                  key={page}
                  onClick={() => updatePage(page)}
                  className={page === pageNumber && 'active'}
                  aria-label={`Navigate to page ${page}`}
                >
                  { page }
                </button>
              ))}
            </PaginationNumbers>
            <PaginationButton onClick={() => updatePage(pageNumber + 1)} disabled={pageNumber === totalPages} aria-label={`Navigate to page ${pageNumber + 1}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="#211E3F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </PaginationButton>
          </Flex>
        )}
        </Box>
      </Container>
    </Box>
  );
}

export async function getStaticProps({ preview = false, previewData }) {
  // get the page data
  const [page, posts] = await Promise.all([fetchSingle('blog', { ...previewData }), fetchAllByDocType('blog_post', { fetchLinks: ['author.name'] })]);

  // Sort posts by published date
  posts.results = posts.results.sort((a, b) => {
    const aDate = new Date(a.data.date_published).getTime();
    const bDate = new Date(b.data.date_published).getTime();
    return bDate - aDate;
  });

  // Format dates
  posts.results.forEach((post) => {
    const dateFormatted = new Date(post.data.date_published).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    post.data.date_published = dateFormatted;
  });

  // Get categories
  let categories = new Set();
  posts.results.forEach((post) => {
    post.data.categories.forEach(({ category }) => {
      if (category) categories.add(category);
    });
  });
  categories = Array.from(categories);

  // Remove any posts that have hide_on_blog_index set to true
  posts.results = posts.results.filter((post) => !post.data.hide_on_blog_index);

  // pathname of the page for canonical tag
  page.meta.pathname = 'resources';

  return {
    props: {
      ...page,
      posts,
      categories,
      preview,
    },
  };
}

const PostsGrid = styled.div`
  display: grid;
  gap: 2.5rem;

  ${MQAbove.sm`
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem 2rem;
  `}

  ${MQAbove.md`
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem 2.5rem;
  `}
`;

const PaginationButton = styled.button`
  background: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.5;

    svg {
      stroke: var(--color__textMediumLight);
    }
  }
`;

const PaginationNumbers = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 0 0.5rem;

  & > button {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    font-size: 1.125rem;
    font-weight: 500;

    &.active {
      color: white;
      background: var(--color__nightshadeLight);
    }
  }
`;

const Filters = styled(Box)`
  margin: 0 -1.5rem;
  padding: 4rem 1.5rem 1rem;
  overflow-x: auto;

  ${MQAbove.md`
    margin: 0;
    padding: 6.5rem 0 0;
  `}
`;

const FiltersRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  &:after {
    // Extra space at the end of the row for horizontal scroll on mobile devices
    content: '0';
    width: 32px;
    height: 12px;
    display: block;
    opacity: 0;
  }

  ${MQAbove.md`
    gap: 1.5rem;
    justify-content: center;

    &:after {
      display: none;
    }
  `}
`;

BlogHome.layout = Page;

BlogHome.propTypes = {
  data: PropTypes.any,
  posts: PropTypes.object,
  categories: PropTypes.any,
};

export default BlogHome;
