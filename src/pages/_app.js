import React, { useEffect } from 'react';
import PropTypes from 'types';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from 'styles/global';
import { Theme } from 'styles/theme';
import { GlobalStateProvider } from 'client/state';
import { layouts } from 'components/Page';
import {
  GTAG_SCRIPT, SEGMENT_SCRIPT, COOKIESAVER_SCRIPT, ADBLOCK_TRACKING_SCRIPT,
} from 'client/scripts';
import Script from 'next/script';
import 'lazysizes';
import Head from 'next/head';

const theme = new Theme();

function App({ Component, pageProps }) {
  const { data } = pageProps;
  if (!pageProps.preview) delete pageProps.preview;

  // Export pages with the layout prop to customize page wrapper or use Prismic for it
  const PrismicLayout = layouts?.[data?.custom_layout];
  const Layout = PrismicLayout || Component.layout || 'main';

  const createDataLayer = () => ({
    __html: 'window.dataLayer = window.dataLayer || []',
  });

  // Accessibility helper functions to add a class to the body tag
  const handleKeydown = event => {
    if (event.keyCode === 9 || event.keyCode === 13) {
      document.body.classList.add('user-is-tabbing');
    }
  };

  const handleClick = event => {
    if (event.detail === 1) {
      document.body.classList.remove('user-is-tabbing');
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  });

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });

  // Don't load original image if VWO is enabled
  useEffect(() => {
    const lazyLoadedElements = document.querySelectorAll('.lazyload');
    lazyLoadedElements.forEach(element => {
      if (element.classList.contains('vwo_loaded')) {
        element.classList.remove('lazyload');
      }
    });
  }, []);

  const createOrganizationSchema = () => ({
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Corporation',
      name: 'Calibrate',
      alternateName: 'Calibrate weight loss',
      url: 'https://www.joincalibrate.com/',
      logo: 'https://images.prismic.io/calibrate/9d966d27-a8a4-4ef9-b6b6-35383dec94e2_calibrate-favicon.png?auto=compress,format&rect=0,0,256,256&w=256&h=256',
    }),
  });

  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{ __html: COOKIESAVER_SCRIPT }}
          id="script-cookie-saver"
        />
        <script
          dangerouslySetInnerHTML={createDataLayer()}
          id="script-gtm-dataLayer"
        />
      </Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={createOrganizationSchema()}
      />
      <Script
        dangerouslySetInnerHTML={{ __html: GTAG_SCRIPT }}
        strategy="afterInteractive"
        id="script-gtm-script"
      />
      <Script
        dangerouslySetInnerHTML={{ __html: SEGMENT_SCRIPT }}
        strategy="afterInteractive"
        id="script-segment-script"
      />
      <Script
        dangerouslySetInnerHTML={{ __html: ADBLOCK_TRACKING_SCRIPT }}
        strategy="afterInteractive"
        id="adblock-tracking-script"
      />
      <GlobalStateProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </GlobalStateProvider>
    </>
  );
}

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

export default App;
