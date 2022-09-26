/* eslint-disable react/prop-types */
import React from 'react';
import { fetchSingle, fetchFAQs } from 'client/prismic';
import Page from 'components/Page';
import { SliceZone } from 'components/SliceZone';
import { PricingFAQs } from 'components/Pricing';

function HowItWorks({ data }) {
  const customSlices = [
    {
      type: 'pricing_faqs',
      Component: PricingFAQs,
    },
  ];
  return (
    <SliceZone slices={data.body} custom={customSlices} />
  );
}

export async function getStaticProps({ preview = false, previewData }) {
  const page = await fetchSingle('how_it_works_page', { ...previewData });

  // pathname of the page for canonical tag
  page.meta.pathname = 'how-it-works';

  const slicesWithFAQData = await fetchFAQs(page.data.body);

  page.data.body = slicesWithFAQData;

  return {
    props: {
      ...page,
      preview,
    },
  };
}

HowItWorks.layout = Page;

export default HowItWorks;
