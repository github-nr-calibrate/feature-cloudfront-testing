/* eslint-disable react/prop-types */
import React from 'react';
import { fetchSingle, fetchFAQs } from 'client/prismic';
import Page from 'components/Page';
import { SliceZone } from 'components/SliceZone';
import { PersonnelSection, InvestorsSection } from 'components/About';
import { SideBySide } from 'components/SideBySide';

function AboutUs({ data }) {
  const customSlices = [
    {
      type: 'vip_section',
      Component: SideBySide,
    },
    {
      type: 'personnel_section',
      Component: PersonnelSection,
    },
    {
      type: 'investors_section',
      Component: InvestorsSection,
    },
  ];

  return (
    <SliceZone slices={data.body} custom={customSlices} />
  );
}

export async function getStaticProps({ preview = false, previewData }) {
  const page = await fetchSingle('about_page', { ...previewData });

  const slicesWithFAQData = await fetchFAQs(page.data.body);

  page.data.body = slicesWithFAQData;

  // pathname of the page for canonical tag
  page.meta.pathname = 'about-us';

  return {
    props: {
      ...page,
      preview,
    },
  };
}

AboutUs.layout = Page;

export default AboutUs;
