import React from 'react';
import PropTypes, { PrismicImage } from 'types';
import Head from 'next/head';

const MetaData = ({ data, meta }) => {
  const {
    title: page_title, seo_description: page_description, hide_from_search, load_vwo,
  } = data;
  const {
    seo_title, seo_tagline, share_image, pathname, seo_description, site_url, favicon,
  } = meta;

  const pageTitle = (name = '', tag, title) => {
    const seperator = ' | ';
    const isHome = page_title?.includes('Home');
    let pageTitle = '';

    if (isHome) pageTitle = pageTitle.concat(tag, seperator);
    if (title && !isHome) pageTitle = pageTitle.concat(title, seperator);

    return pageTitle.concat(name);
  };

  // inputTitle handles in order: Title, Key Text, and falls back to empty string
  const inputTitle = data && page_title && page_title[0] && page_title[0].text || data && page_title || '';
  const title = pageTitle(seo_title, seo_tagline, inputTitle);

  const inputSEODescription = data && page_description || seo_description;
  const seoDescription = pathname === '' ? seo_description : inputSEODescription;

  const canonicalURL = `${site_url}/${pathname}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width" key="meta-viewport" />
      <meta charSet="utf-8" key="meta-charset" />
      <meta name="description" content={seoDescription} key="meta-description" />
      <meta property="og:type" content="website" key="meta-ogType" />
      <meta property="og:title" content={title} key="meta-ogTitle" />
      <meta property="og:description" content={seoDescription} key="meta-ogDescription" />
      <meta property="og:url" content={canonicalURL} key="meta-ogUrl" />
      <link rel="canonical" href={canonicalURL} key="meta-canonical" />
      <meta property="og:image" content={share_image?.url} key="meta-ogImage" />
      <meta name="twitter:card" content="summary_large_image" key="meta-twitterCard" />
      {hide_from_search
        ? <meta name="robots" content="noindex" key="meta-noIndex" />
        : <meta name="robots" content="index, follow" key="meta-index" />}
      <link rel="icon" type="image/png" href={favicon.url} key="meta-icon" />
      {load_vwo
        && <script src="https://dev.visualwebsiteoptimizer.com/lib/569201.js" />}
    </Head>
  );
};

MetaData.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    seo_description: PropTypes.string,
    hide_from_search: PropTypes.bool,
    load_vwo: PropTypes.bool,
  }),
  meta: PropTypes.shape({
    seo_title: PropTypes.string,
    seo_tagline: PropTypes.string,
    seo_description: PropTypes.string,
    share_image: PrismicImage,
    pathname: PropTypes.string,
    site_url: PropTypes.string,
    favicon: PrismicImage,
  }),
};

export default MetaData;
