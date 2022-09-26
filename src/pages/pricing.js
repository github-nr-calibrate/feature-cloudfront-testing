/* eslint-disable react/prop-types */
import React from 'react';
import { fetchSingle, fetchFAQs } from 'client/prismic';
import Page from 'components/Page';
import { SliceZone } from 'components/SliceZone';
import { PlanSlice, PricingFAQs } from 'components/Pricing';

function Pricing({ data }) {
  const customSlices = [
    {
      type: 'price_plans',
      Component: PlanSlice,
    },
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
  const page = await fetchSingle('pricing_page', {
    ...previewData,
  });

  const slicesWithFAQData = await fetchFAQs(page.data.body);

  page.data.body = slicesWithFAQData;

  // pathname of the page for canonical tag
  page.meta.pathname = 'pricing';

  return {
    props: {
      ...page,
      preview,
    },
  };
}

Pricing.layout = Page;

export default Pricing;
