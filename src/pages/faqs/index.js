import React from 'react';
import PropTypes from 'types';
import { fetchSingle } from 'client/prismic';
import Page from 'components/Page';
import { SliceZone } from 'components/SliceZone';
import { FAQSection } from 'components/FAQs';

function FAQs({ data }) {
  const customSlices = [{
    type: 'faq_section',
    Component: FAQSection,
  }];

  return <SliceZone slices={data.body} custom={customSlices} />;
}

FAQs.propTypes = {
  data: PropTypes.any,
};

export async function getStaticProps({ preview = false, previewData }) {
  const page = await fetchSingle('faqs_page', {
    fetchLinks: ['faq.title'],
    ...previewData,
  });

  // pathname of the page for canonical tag
  page.meta.pathname = 'faqs';

  return {
    props: {
      ...page,
      preview,
    },
  };
}

FAQs.layout = Page;

export default FAQs;
