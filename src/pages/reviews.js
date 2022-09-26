/* eslint-disable react/prop-types */
import React from 'react';
import { fetchSingle } from 'client/prismic';
import Page from 'components/Page';
import { SliceZone } from 'components/SliceZone';

function Reviews({ data }) {
  return (
    <SliceZone slices={data.body} />
  );
}

export async function getStaticProps({ preview = false, previewData }) {
  const page = await fetchSingle('reviews_page', { ...previewData });

  // pathname of the page for canonical tag
  page.meta.pathname = 'reviews';

  return {
    props: {
      ...page,
      preview,
    },
  };
}

Reviews.layout = Page;

export default Reviews;
