/* eslint-disable react/prop-types */
import React from 'react';
import { fetchSingle, fetchFAQs } from 'client/prismic';
import Page from 'components/Page';
import { SliceZone } from 'components/SliceZone';
import { PricingFAQs } from 'components/Pricing';

function Medication({ data, meta }) {
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

export async function getStaticProps({ preview = false, previewData }) {
  const page = await fetchSingle('medication', { ...previewData });

  const slicesWithFAQData = await fetchFAQs(page.data.body);

  page.data.body = slicesWithFAQData;

  // pathname of the page for canonical tag
  page.meta.pathname = 'medication';

  return {
    props: {
      ...page,
      preview,
    },
  };
}

Medication.layout = Page;

export default Medication;
