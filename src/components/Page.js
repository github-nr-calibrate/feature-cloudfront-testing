/* eslint no-console: ["error", { allow: ["log"] }] */
// for debugging Segment analytics (see routeChangeComplete handler)

import React, { useEffect } from 'react';
import PropTypes from 'types';
import { useGlobalState } from 'client/state';
import { useRouter } from 'next/router';
import { Button, TARGETBUTTON } from 'components/Button';
import { parseSliceName } from 'client/prismic';
import styled from 'styled-components';
import { Header } from './Header';
import { Footer } from './Footer';
import Preview from './Preview';
import { MetaData } from './MetaData';

function useRouteChange() {
  const [{ navOpen, prevRoute }, { setNavOpen, setPrevRoute }] = useGlobalState();
  const router = useRouter();

  useEffect(() => {
    const onRouteChangeComplete = (url) => {
      // Track page view on route change
      if (prevRoute !== url) {
        if (window.dataLayer && window.dataLayer.push) {
          console.log('SEGMENT: Page Change');
          window.dataLayer.push({
            event: 'pageview_change',
          });
        }
      }

      if (window.analytics && window.analytics.page) {
        console.log('SEGMENT: Page Route (SKIPPED)');
      }

      // Close the nav if it was open
      if (navOpen) {
        setNavOpen(false);
      }
    };

    const onRouteChangeStart = () => {
      setPrevRoute(router.asPath);
    };

    router.events.on('routeChangeComplete', onRouteChangeComplete);
    router.events.on('routeChangeStart', onRouteChangeStart);
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
      router.events.off('routeChangeStart', onRouteChangeStart);
    };
  });
}

const SkipToMainButtonContainer = styled(Button)`
  position: absolute;
  top: 9px;
  left: 9px;
  z-index: 100;
  :not(:focus) {
    transform: translateX(-999px);
  }
`;

const skipToMainButton = (
  <SkipToMainButtonContainer
    variant="primary"
    type={TARGETBUTTON}
    href={`#${parseSliceName('main')}`}
  >
    Skip To Main
  </SkipToMainButtonContainer>
);

function Announcement({ title }) {
  return (
    <div className="visually-hidden" aria-live="assertive">
      {`Navigated to ${title}`}
    </div>
  );
}

function hasBorderTop(children) {
  if (children.props.data.body) {
    const lastItem = children.props.data.body.slice(-1);
    const colorTheme = lastItem[0]?.primary?.color_theme;
    if (colorTheme === undefined) {
      return true;
    }
    if (colorTheme !== 'light') {
      return false;
    }
  }
  return true;
}

function Page({
  children, data, meta, preview,
}) {
  useRouteChange();

  return (
    <>
      <Announcement title={data.title} />
      <MetaData data={data} meta={meta} />
      {preview && <Preview page={data.title} />}
      {skipToMainButton}
      <Header
        meta={meta}
        mapToNavItem={data.map_to_nav_item}
        themeDark={data.dark_theme ? data.dark_theme : false}
      />
      {children}
      <Footer meta={meta} showFooterCTA title={data.title} hasBorderTop={hasBorderTop(children)} />
    </>
  );
}

export function FooterlessPage({
  children, data, meta, preview,
}) {
  useRouteChange();

  return (
    <>
      <Announcement title={data.title} />
      <MetaData data={data} meta={meta} />
      {preview && <Preview page={data.title} />}
      {skipToMainButton}
      <Header
        meta={meta}
        mapToNavItem={data.map_to_nav_item}
        themeDark={data.dark_theme ? data.dark_theme : false}
      />
      {children}
    </>
  );
}

function FooterCTAlessPage({
  children, data, meta, preview,
}) {
  useRouteChange();

  return (
    <>
      <Announcement title={data.title} />
      <MetaData data={data} meta={meta} />
      {preview && <Preview page={data.title} />}
      {skipToMainButton}
      <Header
        meta={meta}
        mapToNavItem={data.map_to_nav_item}
        themeDark={data.dark_theme ? data.dark_theme : false}
      />
      {children}
      <Footer meta={meta} hasBorderTop={hasBorderTop(children)} />
    </>
  );
}

export function BasicPage({
  children, data, meta, preview,
}) {
  useRouteChange();

  return (
    <>
      <Announcement title={data.title} />
      <MetaData data={data} meta={meta} />
      {preview && <Preview page={data.title} />}
      {children}
    </>
  );
}

export function FooterDemoCTAPage({
  children, data, meta, preview,
}) {
  useRouteChange();

  return (
    <>
      <Announcement title={data.title} />
      <MetaData data={data} meta={meta} />
      {preview && <Preview page={data.title} />}
      {skipToMainButton}
      <Header
        meta={meta}
        mapToNavItem={data.map_to_nav_item}
        themeDark={data.dark_theme ? data.dark_theme : false}
      />
      {children}
      <Footer meta={meta} demo hasBorderTop={hasBorderTop(children)} />
    </>
  );
}

const props = {
  children: PropTypes.any,
  data: PropTypes.object,
  meta: PropTypes.object,
  preview: PropTypes.bool,
};

Announcement.propTypes = {
  title: PropTypes.string,
};

Page.propTypes = props;
FooterlessPage.propTypes = props;
FooterCTAlessPage.propTypes = props;
FooterDemoCTAPage.propTypes = props;
BasicPage.propTypes = props;

export const layouts = {
  Page,
  'Page without footer': FooterlessPage,
  'Page without footers CTA': FooterCTAlessPage,
  'Page with footer demo CTA': FooterDemoCTAPage,
  'Basic page': BasicPage,
};

export default Page;
