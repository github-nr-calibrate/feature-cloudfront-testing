/* eslint-disable react/prop-types */
import React from 'react';
import { fetchSingle, fetchFAQs } from 'client/prismic';
import Page from 'components/Page';
import { SliceZone } from 'components/SliceZone';
import { useAffirm } from 'utils/hooks';

function Home({ data, meta }) {
  useAffirm();

  return (
    <SliceZone slices={data.body} meta={meta} />
  );
}

export async function getStaticProps({ preview = false, previewData }) {
  const page = await fetchSingle('home_page', { ...previewData });

  // pathname of the page for canonical tag
  page.meta.pathname = '';

  const slicesWithFAQData = await fetchFAQs(page.data.body);

  page.data.body = slicesWithFAQData;

  return {
    props: {
      ...page,
      preview,
    },
  };
}

Home.layout = Page;

export default Home;
