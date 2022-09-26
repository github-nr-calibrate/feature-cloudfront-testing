import PropTypes from 'types';
import {
  fetchAllByDocType, fetchByUID, mapStaticPaths, fetchFAQs,
} from 'client/prismic';
import React from 'react';
import Page from 'components/Page';
import { SliceZone } from 'components/SliceZone';
import { PricingFAQs } from 'components/Pricing';

function FocusedPage({ data, meta }) {
  const customSlices = [
    {
      type: 'pricing_faqs',
      Component: PricingFAQs,
    },
  ];
  return (
    <SliceZone slices={data.body} meta={meta} custom={customSlices} />
  );
}

FocusedPage.propTypes = {
  data: PropTypes.any,
  meta: PropTypes.any,
};

// This function gets called at build time
export async function getStaticPaths() {
  // Call Prismic API endpoint to get all App documents
  const { results } = await fetchAllByDocType('focused_type');
  const paths = mapStaticPaths(results, 'uid');

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return {
    paths,
    fallback: false,
  };
}

// This also gets called at build time
export async function getStaticProps({ params, preview = false, previewData }) {
  // params contains the documents 'uid'.
  // If the route is like /pages/what-is-calibrate, then params.uid = 'what-is-calibrate'
  const page = await fetchByUID('focused_type', params.uid, {
    fetchLinks: ['focused_type.title'],
    ...previewData,
  });

  const slicesWithFAQData = await fetchFAQs(page.data.body);

  page.data.body = await slicesWithFAQData;

  // pathname of the page for canonical tag
  page.meta.pathname = `pages/${params.uid}`;

  return {
    props: {
      ...page,
      preview,
    },
  };
}

FocusedPage.layout = Page;
export default FocusedPage;
